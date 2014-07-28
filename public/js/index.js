(function() {
  $(function() {
    var init;
    init = function() {
      return $.breaks.below(640, function() {
        $("body").css("background", "#9ce5ff");
        $("h1").text("Below 640px");
        $(".switch").switchPath("_tb", "_pc", "_sp");
      }, "sp").between(641, 767, function() {
        $("body").css("background", "#4b8883");
        $("h1").text("Between 641px - 767px");
        $(".switch").switchPath("_sp", "_pc", "_tb");
      }, "Tablet").above(768, function() {
        $("body").css("background", "#ffa740");
        $("h1").text("Above 768px");
        $(".switch").switchPath("_sp", "_tb", "_pc");
      });
    };
    $(".init").on("click", function() {
      return init();
    });
    $(".removeSP").on("click", function() {
      return $.breaks.remove("sp");
    });
    $(".removeTB").on("click", function() {
      return $.breaks.remove("Tablet");
    });
    $(".removePC").on("click", function() {
      return $.breaks.remove("above768");
    });
    $(".removeAll").on("click", function() {
      return $.breaks.remove();
    });
    return this;
  });

}).call(this);
