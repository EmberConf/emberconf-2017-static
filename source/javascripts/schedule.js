

$(document).ready(function() {



  // On load, if URL has an anchor hash, scroll to the anchor.


  if(window.location.hash) {
    $(location.hash).addClass('expanded');
    $('html,body').animate({
      scrollTop: $(location.hash).offset().top - 60}
    );
  }







  // Add "expanded" class on click

  $('.accordion').on('click', function(e){
    e.preventDefault();
    var target = (this.id);
    setTimeout(function () {
      window.location.hash = target;
    }, 500);

    if(!$(this).hasClass("expanded")) {
      $(this).addClass("expanded");
      var bheight = $(window).height(); // Get Window Height
      var percent = 0.10; // Set a percentage from top
      var hpercent = bheight * percent; // Generate a variable to use below
      $('html, body').animate({scrollTop: $(this).offset().top-hpercent}, 800);
    }
    else {
      $(this).removeClass("expanded");
      // setTimeout(function () {
      //   window.location.hash = 'all';
      // }, 850);
    }

    // window.location.hash = target;
  });
  $('.accordion-content a').click(function(event){
    event.stopPropagation();
  });
  $('.session-speakers a').click(function(event){
    event.stopPropagation();
  });

  $('.accordion-content').click(function(event){
    event.stopPropagation();
  });


  // Sticky nav on scroll


  var sticky_nav_check = $('.sticky-nav');
  if (sticky_nav_check.length) {
    $(function() {



      // grab the initial top offset of the navigation
      var sticky_navigation_offset_top = sticky_nav_check.offset().top;

      // our function that decides weather the navigation bar should have "fixed" css position or not.
      var sticky_navigation = function(){
        var scroll_top = $(window).scrollTop(); // our current vertical position from the top

        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if (scroll_top > sticky_navigation_offset_top) {
          $('.sticky-nav').addClass("fixed");
          $('.day:first').addClass("stuck");
        } else {
          $('.sticky-nav').removeClass("fixed");
          $('.day:first').removeClass("stuck");
        }
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {
          $('a.anchor').each(function(i) {
            if ($(this).position().top <= windscroll + 5) {
              $('.day-nav a.active').removeClass('active');
              $('.day-nav a').eq(i).addClass('active');
            }
          });
        } else {
          $('.day-nav a.active').removeClass('active');
          $('.day-nav li:first a').addClass('active');
        }
        var anchorPoint = $("#end-sticky").offset().top + (-96);
        if (windscroll >= anchorPoint) {
          $('.sticky-nav').removeClass('fixed');
          // $('.day-nav ul').removeClass('fixed');
        }



      };



      // run our function on load
      sticky_navigation();

      // and run it again every time you scroll
      $(window).scroll(function() {
        sticky_navigation();
      });
    });

    // end of sticky nav






  }

});


// Smooth scroll anchor links

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });
});
