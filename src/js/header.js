module.exports = {
  BannerAnimation: {
    init: function(wScroll, options) {
      var self = this;

      this.headerBanner = $('header.workspace');
      this.wScroll = wScroll;

      options.forEach(function(option) {
        self.transform(option.element, option.number);
      });
    },

    transform: function(element, number) {
      this.headerBanner.find(element).css({
        transform: 'translate(0px, ' + this.wScroll / number + '%)'
      });
    }
  },

  StickyNav: {
    init: function(wScroll, navOffset) {
      this.navElement = $('nav.nav-bar');
      this.navOffset = navOffset;
      this.wScroll = wScroll;

      this.stickIt();
    },

    stickIt: function() {
      if (this.wScroll >= this.navOffset) {
        this.navElement.addClass('nav-bar-fixed');
      } else {
        this.navElement.removeClass('nav-bar-fixed');
      }
    }
  }
};
