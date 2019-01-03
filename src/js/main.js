var ExperienceAnimation = {

	init : function(wScroll){
		this.wScroll = wScroll;
		this.elements = $('section.experience div.timeline-block');

		this.show();
	},

	show : function(){
		var self = this;
		if(this.wScroll > ($('section.skills').offset().top)){
			this.elements.each(function(element){
				setTimeout(function(){
					self.elements.eq(element).addClass('show');
				}, 200 * (element + 1));
			});
		}
	}
};

var SpecializationAnimation = {
	init : function(wScroll){
		this.wScroll = wScroll;

		this.elementsArray = [
			{selector : $('section.specialization div.row div.columns img')},
			{selector : $('section.specialization div.row div.columns h5')},
			{selector : $('section.specialization div.row div.columns p')}
		];

		var self = this;

		this.elementsArray.forEach(function(element){
			self.animate(element.selector);
		});
	},

	animate : function(elements){
		if(this.wScroll > ($('section.parallax').offset().top) - 100){
			elements.each(function(element){
				elements.eq(element).addClass('show').bind(this);
			});
		}else{
			elements.each(function(element){
				elements.eq(element).removeClass('show').bind(this);
			});
		}
	}
}

var email = {
	init : function(formMessage, spinner, data, url){
		this.formMessage = formMessage;
		this.spinner = spinner;
		this.data = data;
		this.url = url;

		this.ajax(this.url, this.data);
	},

	ajax : function(url, data){
		var self = this;
		$.ajax({
			type : 'POST',
			url : url,
			data : data,
			beforeSend: function() {
                self.spinner.show();
            },
            complete: function() {
                self.spinner.hide();
            }
		}).done(function(response){
			self.formMessage.removeClass('errorMessage');
			self.formMessage.addClass('successMessage');

			self.formMessage.text(response);

			$('#formName').val('');
			$('#formEmail').val('');
			$('#formSubject').val('');
			$('#formTextarea').val('');
		}).fail(function(data){
			self.formMessage.removeClass('successMessage');
			self.formMessage.addClass('errorMessage');

			if (data.responseText !== '') {
		        self.formMessage.text(data.responseText);
		    } else {
		        self.formMessage.text('Oops! An error occured and your message could not be sent.');
		    }
		});
	}
}