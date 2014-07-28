$ ->

  init = ->
    $.breaks.below(640, ->
      $("body").css("background", "#9ce5ff")
      $("h1").text("Below 640px")
      $(".switch").switchPath("_tb", "_pc", "_sp")
      return
    , "sp")
    .between(641, 767, ->
      $("body").css("background", "#4b8883")
      $("h1").text("Between 641px - 767px")
      $(".switch").switchPath("_sp", "_pc", "_tb")
      return
    , "Tablet")
    .above(768, ->
      $("body").css("background", "#ffa740")
      $("h1").text("Above 768px")
      $(".switch").switchPath("_sp", "_tb", "_pc")
      return
    )

  # set listeners
  $(".init").on("click", ->
    init()
  )

  # remove listener by custom name
  $(".removeSP").on("click", ->
    $.breaks.remove("sp")
  )
  $(".removeTB").on("click", ->
    $.breaks.remove("Tablet")
  )

  # remove listener by default name
  $(".removePC").on("click", ->
    $.breaks.remove("above768")
  )

  # remove all listeners
  $(".removeAll").on("click", ->
    $.breaks.remove()
  )

  return this
