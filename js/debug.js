// Debug helper to check section positions
$(document).ready(function() {
  // Log positions of key elements
  console.log('Hero area offset top:', $('#hero-area').offset().top);
  console.log('Navigation offset top:', $('#navigation').offset().top);
  
  // Monitor scroll position
  $(window).scroll(function() {
    console.log('Scroll position:', $(window).scrollTop());
    console.log('Navigation is sticky:', $('#navigation').hasClass('is-sticky'));
  });
});
