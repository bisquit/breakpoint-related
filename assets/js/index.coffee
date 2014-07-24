$ ->
  $.breaks.below(640, ->
    $("body").css("background", "#9ce5ff")
    $("h1").text("Below 640px")
    return
  ).between(641, 767, ->
    $("body").css("background", "#4b8883")
    $("h1").text("Between 641px - 767px")
    return
  ).above(768, ->
    $("body").css("background", "#ffa740")
    $("h1").text("Above 768px")
    return
  )
  return this

#   class Breakpoint

#   constructor: ->
#     if window.matchMedia
#       @matchMedia = window.matchMedia

#   set: ->
#     (@breakpoints or @breakpoints = []).push.apply(@breakpoints, arguments)

#     @breakpoints.sort (a,b) ->
#       return a - b

#   width: (includeIE8 = false) ->

#     $window = $(window)

#     jqWidth = $window.width()

#     $("html").css
#       overflowY : "hidden"

#     cssWidth = includeIE8 and $(window).width() or window.innerWidth

#     $("html").css
#       overflowY : ""

#     if jqWidth is cssWidth
#       return cssWidth and cssWidth or 10000

# bp = new Breakpoint
# bp.set(620)