$(document).ready(() => {
  twttr.ready((twttr) => {
    twttr.events.bind(
      'rendered',
      (event) => {
        // HACK: $.fn.triggerOnceWhenVisible() will not work here bc it will have already fired
        // once, this is the workaround
        if ($(".callout").isInViewport()) {
          $(".twitter-timeline-wrapper").removeClass("opacity-zero")
            .addClass("animated zoomInUp slower")
          return
        }

        $(window).one("callout-visible", () => {
          $(".twitter-timeline-wrapper").removeClass("opacity-zero")
            .addClass("animated zoomInUp slower")
        })
      }
    );
  })
})
