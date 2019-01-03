$(document).ready(function() {
  var navOffset = $('nav.nav-bar').offset().top;
  var windowHeight = $(window).height();

  $('nav.nav-bar').wrap('<div class="nav-placeholder"></div>');
  $('.nav-placeholder').height($('nav.nav-bar').outerHeight());

  /* Skills Animation part 1 */

  var aboutMeTop = $('section.about').offset().top;

  $('img.element').each(function(i) {
    var myElement = $(this);

    switch (i) {
      case 0:
        myElement.data('params', {
          top0: 60,
          x0: -100,
          top1: $(this).css('top'),
          x1: $(this).css('left')
        });
        break;
      case 1:
        myElement.data('params', {
          top0: -50,
          x0: -80,
          top1: $(this).css('top'),
          x1: $(this).css('left')
        });
        break;
      case 2:
        myElement.data('params', {
          top0: -500,
          x0: 50,
          top1: $(this).css('bottom'),
          x1: $(this).css('left')
        });
        break;
      case 3:
        myElement.data('params', {
          top0: -400,
          x0: -300,
          top1: $(this).css('bottom'),
          x1: $(this).css('left')
        });
        break;
    }
  });

  /* End of : Skills Animation part 1 */

  $(window).scroll(function() {
    var wScroll = $(this).scrollTop();

    StickyNav.init(wScroll, navOffset);

    BannerAnimation.init(wScroll, [
      { element: 'div.stars', number: 10 },
      { element: 'h1', number: 2 },
      { element: 'img', number: -20 }
    ]);

    ExperienceAnimation.init(wScroll);

    SpecializationAnimation.init(wScroll);

    /* Skills Animation part 2 */

    var s_max = windowHeight / 3 + 600;

    function move(p0, p1, s) {
      return Math.min(((-p0 + p1) / s_max) * s + p0, p1);
    }

    var scrollTop = parseInt($(window).scrollTop());

    $('img.element').each(function(i) {
      var myX = move(
          $(this).data('params').x0,
          parseInt($(this).data('params').x1),
          scrollTop
        ),
        myY = move(
          $(this).data('params').top0,
          parseInt($(this).data('params').top1),
          scrollTop
        );

      if (i < 2) {
        $(this)
          .stop()
          .css({
            left: myX + 'px',
            top: myY + 'px'
          });
      } else {
        $(this)
          .stop()
          .css({
            left: myX + 'px',
            bottom: myY + 'px'
          });
      }
    });

    /* End of Skills Animation part 2 */
  });

  /* Smooth Scrolling */

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top - 70
        },
        900,
        'swing'
      );
  });

  /* Email Form */

  var form = $('form#emailForm'),
    formMessage = $('div#form-message'),
    spinner = $('div#form-message img#spinner'),
    url = '../php/mail.php';

  spinner.hide();

  $(form).on('submit', function(e) {
    e.preventDefault();

    var data = $(form).serialize();

    email.init(formMessage, spinner, data, url);
  });
});
