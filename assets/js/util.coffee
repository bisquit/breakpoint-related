do ($=jQuery) ->

  Breaks = $.breaks = do ->

    parseQuery = (query) ->
      _query = query.type + " and ("

      if query.min
        _query += "min-width:" + query.min + "px)"
        if query.max then _query += " and (max-width:" + query.max + "px)"
      else if query.max
        _query += "max-width:" + query.max + "px)"

      return _query

    setListener = do ->

      if false and window.matchMedia
        _matchMedia = window.matchMedia

        return (query, fn) ->

          media = _matchMedia(parseQuery(query))

          mediaHandler = (media) ->
            console.log "media handler called"
            media.matches && fn()

          media.addListener(mediaHandler)
          mediaHandler(media)

      if false and window.styleMedia
        _styleMedia = window.styleMedia

        return (query, fn) ->
          query = parseQuery(query)
          isMatch = _styleMedia.matchMedium(query)
          lastMatch = null
          mediaHandler = ->
            isMatch = _styleMedia.matchMedium(query)

            if isMatch and (isMatch isnt lastMatch)
              console.log("fn called")
              fn()

            lastMatch = isMatch

          $(window).on("resize", mediaHandler)
          $(window).on("resize", mediaHandler)

          mediaHandler()

      if window.innerWidth

        return (query, fn) ->
          lastMatch = null
          min = if query.min then query.min else 0
          max = if query.max then query.max else 9999

          mediaHandler = ->
            $("html").css
              overflowY: "hidden"

            if (isMatch = min <= $(window).width() <= max) and isMatch isnt lastMatch
              console.log "fn called"
              fn()

            lastMatch = isMatch

          $(window).on("resize", mediaHandler)
          $(window).on("resize", mediaHandler)

          mediaHandler()

    below = (width, fn) ->

      setListener(
        type: "all"
        max: width
      , fn)

      return this

    above = (width, fn) ->

      setListener(
        type: "all"
        min: width
      , fn)

      return this

    between = (from, to, fn) ->

      setListener(
        type: "all"
        min: from
        max: to
      , fn)

      return this

    return {
      below: below
      above: above
      between: between
    }