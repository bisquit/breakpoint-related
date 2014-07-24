(function() {
  $(function() {
    $.breaks.below(640, function() {
      $("body").css("background", "#9ce5ff");
      $("h1").text("Below 640px");
    }).between(641, 767, function() {
      $("body").css("background", "#4b8883");
      $("h1").text("Between 641px - 767px");
    }).above(768, function() {
      $("body").css("background", "#ffa740");
      $("h1").text("Above 768px");
    });
    return this;
  });

}).call(this);
