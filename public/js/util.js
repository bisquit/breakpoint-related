(function() {
  (function($) {
    var Breaks;
    return Breaks = $.breaks = (function() {
      var above, below, between, parseQuery, setListener;
      parseQuery = function(query) {
        var _query;
        _query = query.type + " and (";
        if (query.min) {
          _query += "min-width:" + query.min + "px)";
          if (query.max) {
            _query += " and (max-width:" + query.max + "px)";
          }
        } else if (query.max) {
          _query += "max-width:" + query.max + "px)";
        }
        return _query;
      };
      setListener = (function() {
        var _matchMedia, _styleMedia;
        if (false && window.matchMedia) {
          _matchMedia = window.matchMedia;
          return function(query, fn) {
            var media, mediaHandler;
            media = _matchMedia(parseQuery(query));
            mediaHandler = function(media) {
              console.log("media handler called");
              return media.matches && fn();
            };
            media.addListener(mediaHandler);
            return mediaHandler(media);
          };
        }
        if (false && window.styleMedia) {
          _styleMedia = window.styleMedia;
          return function(query, fn) {
            var isMatch, lastMatch, mediaHandler;
            query = parseQuery(query);
            isMatch = _styleMedia.matchMedium(query);
            lastMatch = null;
            mediaHandler = function() {
              isMatch = _styleMedia.matchMedium(query);
              if (isMatch && (isMatch !== lastMatch)) {
                console.log("fn called");
                fn();
              }
              return lastMatch = isMatch;
            };
            $(window).on("resize", mediaHandler);
            $(window).on("resize", mediaHandler);
            return mediaHandler();
          };
        }
        if (window.innerWidth) {
          return function(query, fn) {
            var lastMatch, max, mediaHandler, min;
            lastMatch = null;
            min = query.min ? query.min : 0;
            max = query.max ? query.max : 9999;
            mediaHandler = function() {
              var isMatch, _ref;
              $("html").css({
                overflowY: "hidden"
              });
              if ((isMatch = (min <= (_ref = $(window).width()) && _ref <= max)) && isMatch !== lastMatch) {
                console.log("fn called");
                fn();
              }
              return lastMatch = isMatch;
            };
            $(window).on("resize", mediaHandler);
            $(window).on("resize", mediaHandler);
            return mediaHandler();
          };
        }
      })();
      below = function(width, fn) {
        setListener({
          type: "all",
          max: width
        }, fn);
        return this;
      };
      above = function(width, fn) {
        setListener({
          type: "all",
          min: width
        }, fn);
        return this;
      };
      between = function(from, to, fn) {
        setListener({
          type: "all",
          min: from,
          max: to
        }, fn);
        return this;
      };
      return {
        below: below,
        above: above,
        between: between
      };
    })();
  })(jQuery);

}).call(this);
