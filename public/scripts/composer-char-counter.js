$(document).ready(function() {
  
$('.new-tweet textarea').on('keyup', function (){
    const remainingChar = 140 - this.value.length;
    const counter = $('output.counter') ;
    counter.text(remainingChar);

    if (remainingChar < 0) {
      counter.addClass("negative")
    } else {
      counter.removeClass("negative")
    }
  })
});












// $("textArea").keypress(function(){
//   let counter = 140;
//   while (counter > 0) {
//     counter--
//   }
//   console.log(counter)
// });




