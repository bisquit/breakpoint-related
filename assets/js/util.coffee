do ($=jQuery) ->

  Breaks = $.breaks = do ->

    Unset =
      list: {}
      add: (name, fn) ->
        (@list[name] or @list[name] = []).push(fn)
      trigger: (name) ->
        if @list[name]? then fn() for fn in @list[name]
      triggerAll: ->
        for name, fns of @list
          fn() for fn in fns
        return

    # オブジェクト形式のクエリを実際のメディアクエリ文字列に変換する
    # @param {object} query - メディアを指定するオブジェクト
    parseQuery = (query) ->
      _query = query.type + " and ("

      if query.min
        _query += "min-width:" + query.min + "px)"
        if query.max then _query += " and (max-width:" + query.max + "px)"
      else if query.max
        _query += "max-width:" + query.max + "px)"

      return _query

    # ブラウザにあわせてリスナーを登録する関数
    # matchMedia 系が利用できる環境ではそれらを使用し
    # Android2.3等ではjQuery::width()で判定する
    setListener = do ->

      if window.matchMedia
        _matchMedia = window.matchMedia

        return (query, fn, name) ->

          media = _matchMedia(parseQuery(query))

          mediaHandler = (media) ->
            console.log "matchMedia: media handler called"
            media.matches && fn()

          media.addListener(mediaHandler)
          mediaHandler(media)

          Unset.add(name, ->
            media.removeListener(mediaHandler)
          )

      if window.styleMedia
        _styleMedia = window.styleMedia

        return (query, fn) ->
          query = parseQuery(query)
          isMatch = _styleMedia.matchMedium(query)
          lastMatch = null
          mediaHandler = ->
            isMatch = _styleMedia.matchMedium(query)

            if isMatch and (isMatch isnt lastMatch)
              console.log("styleMedia: fn called")
              fn()

            lastMatch = isMatch

          $(window).on("resize", mediaHandler)
          $(window).on("orientationchange", mediaHandler)

          mediaHandler()

          Unset.add(name, ->
            $(window).off("resize", mediaHandler)
            $(window).off("orientationchange", mediaHandler)
          )

      if window.innerWidth

        return (query, fn) ->
          lastMatch = null
          min = if query.min then query.min else 0
          max = if query.max then query.max else 9999

          mediaHandler = ->
            $("html").css
              overflowY: "hidden"

            if (isMatch = min <= $(window).width() <= max) and isMatch isnt lastMatch
              console.log "default: fn called"
              fn()

            lastMatch = isMatch

          $(window).on("resize", mediaHandler)
          $(window).on("orientationchange", mediaHandler)

          mediaHandler()

          Unset.add(name, ->
            $(window).off("resize", mediaHandler)
            $(window).off("orientationchange", mediaHandler)
          )

    # 指定のリスナーを解除する
    # リスナー名nameを指定しなければ全てのリスナーを解除する
    removeListener = (name) ->
      if name
        Unset.trigger(name)
      else
        Unset.triggerAll()

    # ウィンドウサイズが指定幅以下のとき、関数を実行させる
    below = (width, fn, name) ->

      if !name
        name = "below" + width

      setListener(
        type: "all"
        max: width
      , fn, name)

      return this

    # ウィンドウサイズが指定幅以上のとき、関数を実行させる
    above = (width, fn, name) ->

      if !name
        name = "above" + width

      setListener(
        type: "all"
        min: width
      , fn, name)

      return this

    # ウィンドウサイズが指定幅の間にあるとき、関数を実行させる
    between = (from, to, fn, name) ->

      if !name
        name = "between" + from + "-" + to

      setListener(
        type: "all"
        min: from
        max: to
      , fn, name)

      return this

    return {
      below: below
      above: above
      between: between
      remove: removeListener
    }

  $.fn.switchPath = (froms..., to) ->
    els = this
    return els.each ->
      currentSrc = ($this = $(this)).attr("src") || ""
      for from in froms when currentSrc.indexOf(from) isnt -1
        $this.attr
          src: currentSrc.replace(from, to)

  return
