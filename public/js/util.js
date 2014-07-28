(function() {
  var __slice = [].slice;

  (function($) {
    var Breaks;
    Breaks = $.breaks = (function() {
      var Unset, above, below, between, parseQuery, removeListener, setListener;
      Unset = {
        list: {},
        add: function(name, fn) {
          return (this.list[name] || (this.list[name] = [])).push(fn);
        },
        trigger: function(name) {
          var fn, _i, _len, _ref, _results;
          if (this.list[name] != null) {
            _ref = this.list[name];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              fn = _ref[_i];
              _results.push(fn());
            }
            return _results;
          }
        },
        triggerAll: function() {
          var fn, fns, name, _i, _len, _ref;
          _ref = this.list;
          for (name in _ref) {
            fns = _ref[name];
            for (_i = 0, _len = fns.length; _i < _len; _i++) {
              fn = fns[_i];
              fn();
            }
          }
        }
      };
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
        if (window.matchMedia) {
          _matchMedia = window.matchMedia;
          return function(query, fn, name) {
            var media, mediaHandler;
            media = _matchMedia(parseQuery(query));
            mediaHandler = function(media) {
              console.log("matchMedia: media handler called");
              return media.matches && fn();
            };
            media.addListener(mediaHandler);
            mediaHandler(media);
            return Unset.add(name, function() {
              return media.removeListener(mediaHandler);
            });
          };
        }
        if (window.styleMedia) {
          _styleMedia = window.styleMedia;
          return function(query, fn) {
            var isMatch, lastMatch, mediaHandler;
            query = parseQuery(query);
            isMatch = _styleMedia.matchMedium(query);
            lastMatch = null;
            mediaHandler = function() {
              isMatch = _styleMedia.matchMedium(query);
              if (isMatch && (isMatch !== lastMatch)) {
                console.log("styleMedia: fn called");
                fn();
              }
              return lastMatch = isMatch;
            };
            $(window).on("resize", mediaHandler);
            $(window).on("orientationchange", mediaHandler);
            mediaHandler();
            return Unset.add(name, function() {
              $(window).off("resize", mediaHandler);
              return $(window).off("orientationchange", mediaHandler);
            });
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
                console.log("default: fn called");
                fn();
              }
              return lastMatch = isMatch;
            };
            $(window).on("resize", mediaHandler);
            $(window).on("orientationchange", mediaHandler);
            mediaHandler();
            return Unset.add(name, function() {
              $(window).off("resize", mediaHandler);
              return $(window).off("orientationchange", mediaHandler);
            });
          };
        }
      })();
      removeListener = function(name) {
        if (name) {
          return Unset.trigger(name);
        } else {
          return Unset.triggerAll();
        }
      };
      below = function(width, fn, name) {
        if (!name) {
          name = "below" + width;
        }
        setListener({
          type: "all",
          max: width
        }, fn, name);
        return this;
      };
      above = function(width, fn, name) {
        if (!name) {
          name = "above" + width;
        }
        setListener({
          type: "all",
          min: width
        }, fn, name);
        return this;
      };
      between = function(from, to, fn, name) {
        if (!name) {
          name = "between" + from + "-" + to;
        }
        setListener({
          type: "all",
          min: from,
          max: to
        }, fn, name);
        return this;
      };
      return {
        below: below,
        above: above,
        between: between,
        remove: removeListener
      };
    })();
    $.fn.switchPath = function() {
      var els, froms, to, _i;
      froms = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), to = arguments[_i++];
      els = this;
      return els.each(function() {
        var $this, currentSrc, from, _j, _len, _results;
        currentSrc = ($this = $(this)).attr("src") || "";
        _results = [];
        for (_j = 0, _len = froms.length; _j < _len; _j++) {
          from = froms[_j];
          if (currentSrc.indexOf(from) !== -1) {
            _results.push($this.attr({
              src: currentSrc.replace(from, to)
            }));
          }
        }
        return _results;
      });
    };
  })(jQuery);

}).call(this);
