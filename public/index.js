console.log("hello word script loaded");
$(document).ready(function() {
  renderjson.set_show_to_level(3);
});
$("#serach-form").submit(function(event) {
  event.preventDefault();
  let symbol = $("input")
    .first()
    .val();
  console.log(symbol);
  $.ajax({
    url: "/search?symbol=" + symbol,
    success: function(result) {
      $("#div1").html(renderjson(JSON.parse(result)));
    }
  });
});
