var ExperienceAnimation = {
  init: function(wScroll) {
    this.wScroll = wScroll;
    this.elements = $('section.experience div.timeline-block');

    this.show();
  },

  show: function() {
    var self = this;
    if (this.wScroll > $('section.skills').offset().top) {
      this.elements.each(function(element) {
        setTimeout(function() {
          self.elements.eq(element).addClass('show');
        }, 100 * (element + 1));
      });
    }
  }
};

var SpecializationAnimation = {
  init: function(wScroll) {
    this.wScroll = wScroll;

    this.elementsArray = [
      { selector: $('section.specialization div.row div.columns img') },
      { selector: $('section.specialization div.row div.columns h5') },
      { selector: $('section.specialization div.row div.columns p') }
    ];

    var self = this;

    this.elementsArray.forEach(function(element) {
      self.animate(element.selector);
    });
  },

  animate: function(elements) {
    if (this.wScroll > $('section.parallax').offset().top - 100) {
      elements.each(function(element) {
        elements
          .eq(element)
          .addClass('show')
          .bind(this);
      });
    } else {
      elements.each(function(element) {
        elements
          .eq(element)
          .removeClass('show')
          .bind(this);
      });
    }
  }
};
