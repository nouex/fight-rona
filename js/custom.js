// Closes the sidebar menu
$("#menu-close").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Map scrolling behaviour
$(document).ready(function() {
  $('#map_iframe').addClass('scrolloff');
  $('#map').on('click', function () {
    $('#map_iframe').removeClass('scrolloff');
  });

  $('#map_iframe').mouseleave(function  () {
    $('#map_iframe').addClass('scrolloff');
  });
});

// custom event triggered when element enters the viewport
$.fn.isInViewport = function() {
  const elementTop = $(this).offset().top;
  const elementBottom = elementTop + $(this).outerHeight();
  const viewportTop = $(window).scrollTop();
  const viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$.fn.triggerOnceWhenVisible = function triggerOnceWhenVisible(eventName) {
  const that = this
  // shortcut to when the page loads and it's already in view
  if (this.isInViewport()) {
    setTimeout(() => { $(window).trigger({ type: eventName }) }, 0)
    return
  }

  $(window).on("resize scroll", handler)

  function handler() {
    const isVisible = that.isInViewport()

    if (isVisible) {
      $(window).trigger({
        type: eventName,
      });

      $(window).off("resize scroll", handler)
    }
  }
}

$("#map").triggerOnceWhenVisible("map-visible")
$(".callout").triggerOnceWhenVisible("callout-visible")
