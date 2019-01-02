@@include('../js/jquery-3.1.1.min.js')
@@include('../js/owl.carousel.min.js')
@@include('../js/owl.carousel2.thumbs.js')
@@include('../js/jquery-ui.js')

/* ==========================================================================*/
//    lightTabs (plugin)   
/*==========================================================================*/

(function($){               
	jQuery.fn.lightTabs = function(options){
		i = 0;
		var createTabs = function(){
			tabs = this;
			showPage = function(tabs, i, options){
				$(tabs).children('div').children('div').hide();
				$(tabs).children('div').children('div').eq(i).show();
				$(tabs).children('ul').children('li').removeClass('active');
				$(tabs).children('ul').children('li').eq(i).addClass('active');
			}
			showPage(tabs, 0);  
			$(tabs).children('ul').children('li').each(function(index, element){
				$(element).attr('data-page', i);
				i++;                        
			});
			$(tabs).children('ul').children('li').click(function(){
				showPage($(this).parent().parent(), parseInt($(this).attr('data-page')));
			});             
		};      
		return this.each(createTabs);
	};  
})(jQuery);

/* ========================================================================== */
//    //lightTabs (plugin)   
/*========================================================================== */




$(window).on({
	load: function() {

	},
	scroll: function() {

	},
	resize: function() {
	}
});



$(document).ready(function() {

	google.maps.event.addDomListener(window, 'load', maps);
	/* ========================================================================== */
	/* Tabs */
	/*========================================================================== */ 
	$('.tabs-begin').each(function(index, el) {
		$(this).lightTabs();
	});


	/* ========================================================================== */
	/* index slider */
	/*========================================================================== */ 
	$('.slider .owl-carousel').owlCarousel({
		items: 1,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		dots: true,
		nav:true,
		loop: true,
		mouseDrag: false,
		autoplay: false,
		autoplayTimeout:5000,
		autoplayHoverPause:false,
		// dotsContainer: '.custom-dots',
		smartSpeed: 450
	});


	$('.popular--tabs__slider').on('refreshed.owl.carousel', function(e){
	    idx = e.item.index;
	    var item = $('.popular--tabs__slider').find('.owl-item');
	    $('.owl-item.big').removeClass('big');
	    $('.owl-item.medium').removeClass('medium');
	    item.eq(idx).addClass('big');
	    item.eq(idx-1).addClass('medium');
	    item.eq(idx+1).addClass('medium');
	}).owlCarousel({
		items: 5,
		// animateOut: 'slideOutDown',
		// animateIn: 'flipInX',
		dots: true,
		nav:true,
		center:true,
		loop: true,
		mouseDrag: false,
		autoplay: false,
		autoplayTimeout:5000,
		autoplayHoverPause:false
		// dotsContainer: '.custom-dots',
		// smartSpeed: 450
	}).on('changed.owl.carousel', function(e){
	    idx = e.item.index;
	    var item = $('.popular--tabs__slider').find('.owl-item');
	    $('.owl-item.big').removeClass('big');
	    $('.owl-item.medium').removeClass('medium');
	    item.eq(idx).addClass('big');
	    item.eq(idx-1).addClass('medium');
	    item.eq(idx+1).addClass('medium');
	});
	
	

	

	
	$('.set-slider .owl-carousel').owlCarousel({
		items: 4,
		// animateIn: 'fadeIn',
		// animateOut: 'fadeOut',
		dots: false,
		nav:true,
		loop: true,
		mouseDrag: false,
		autoplay: false,
		autoplayTimeout:5000,
		autoplayHoverPause:false,
		// dotsContainer: '.custom-dots',
		smartSpeed: 450
	});
	
	/* ========================================================================== */
	/* product slider */
	/*========================================================================== */ 
	
	  var sync1 = $(".product-slider__slider");
	  var sync2 = $(".product-slider__thumb");
	  var slidesPerPage = 2; 
	  var syncedSecondary = false;

	  sync1.owlCarousel({
	    items : 1,
	    slideSpeed : 2000,
	    nav: true,
	    animateIn: 'fadeIn',
	    // animateOut: 'fadeOut',
	    // autoplay: true,
	    dots: false,
	    loop: true,
	    responsiveRefreshRate : 200
	  }).on('changed.owl.carousel', syncPosition);

	  sync2
	    .on('initialized.owl.carousel', function () {
	      sync2.find(".owl-item").eq(0).addClass("current");
	      // sync2.find(".owl-item").eq(3).removeClass("active");
	    })
	    .owlCarousel({
	    items : slidesPerPage,
	    dots: false,
	    nav: false,
	    smartSpeed: 200,
	    slideSpeed : 500,
	    mouseDrag: false,
	    slideBy: slidesPerPage, 
	    responsiveRefreshRate : 100
	  }).on('changed.owl.carousel', syncPosition2);

	  function syncPosition(el) {

	    var count = el.item.count-1;
	    var current = Math.round(el.item.index - (el.item.count/2) - .5);
	    
	    if(current < 0) {
	      current = count;
	    }
	    if(current > count) {
	      current = 0;
	    }
	    
	    //end block

	    sync2
	      .find(".owl-item")
	      .removeClass("current")
	      .eq(current)
	      .addClass("current");
	    var onscreen = sync2.find('.owl-item.active').length - 1;
	    var start = sync2.find('.owl-item.active').first().index();
	    var end = sync2.find('.owl-item.active').last().index();
	    
	    if (current > end) {
	      sync2.data('owl.carousel').to(current, 100, true);
	    }
	    if (current < start) {
	      sync2.data('owl.carousel').to(current - onscreen, 100, true);
	    }
	  }
	  
	  function syncPosition2(el) {
	    if(syncedSecondary) {
	      var number = el.item.index;
	      sync1.data('owl.carousel').to(number, 100, true);
	    }
	  }
	  
	  sync2.on("click", ".owl-item", function(e){
	    e.preventDefault();
	    var number = $(this).index();
	    sync1.data('owl.carousel').to(number, 300, true);
	  });


	/* ========================================================================== */
	/* Dropdown menu */
	/*========================================================================== */ 
	$('.dropdown__change').on('click', function(e) {
		e.preventDefault();
		var closestDiv = $(this).closest('.dropdown');
		$(this).stop().toggleClass('open');
		closestDiv.find('.dropdown__hidden').stop().slideToggle(250);
	});



	/* ========================================================================== */
	/* Search */
	/*========================================================================== */ 
	$('.search-form__load').on('click', function(e) {
		e.preventDefault();
		$(this).closest('form').addClass('open');
	});


	/* ========================================================================== */
	/* remove favorites item */
	/*========================================================================== */ 
	$('.favorites--item__remove').on('click', function(e) {
		e.preventDefault();
		var removeItem = $(this).closest('.favorites--item');
		removeItem.addClass('remove-favorites')
		removeItem.animate({'margin-left': '-25%'}, 200);
		setTimeout(function() {
			removeItem.remove();
		}, 500);
	});
	
	
	
	/* ========================================================================== */
	/* Catalog item toggle */
	/*========================================================================== */ 
	$('.catalog-item').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('open')) {
			$('.catalog-item').removeClass('close');
			$this.removeClass('open')
			return;
		}
		$('.catalog-item').addClass('close').removeClass('open');
		$this.removeClass('close').addClass('open');
		// $('.catalog-item--hidden').stop().slideUp(0);
		// $this.find('.catalog-item--hidden').stop().slideDown(0);


		// if ($('.catalog-item.open').length) {
		// 	$this.css('margin-bottom', '180px');
		// } else{
		// 	$this.css('margin-bottom', '0');
		// }

	});
	
	// $('.catalog-item').each(function(index, el) {
	// 	if (index % 3 === 2) {
	// 		console.log("index", index);
	// 	     $(this).after('<div class="catalog-item--hidden"></div>');
	// 	}
	// });
	
	
	
	/* ========================================================================== */
	/* "минус один товар" */
	/*========================================================================== */ 
	$('.minus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	



	/* ========================================================================== */
	/*   плюс один товар */
	/*========================================================================== */ 
	$('.plus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});	
	
	
	
	/* ========================================================================== */
	/* Filter Slider */
	/*========================================================================== */ 
	$('.range').each(function(index, el) {
		var $this = $(this);
		var slider = $this.find('.slider');
		var sliderValue = $this.find("input.sliderValue");
		var slider0 = $this.find('input.sliderValue[data-index=0]').val();
		var slider1 = $this.find('input.sliderValue[data-index=1]').val();
		slider.slider({
			range: true,
			min: 0,
			max: 100,
			step: 1,
			values: [slider0, slider1],
			slide: function(event, ui) {
				for (var i = 0; i < ui.values.length; ++i) {
					$this.find("input.sliderValue[data-index=" + i + "]").val(ui.values[i]);
				}
			}
		});

		sliderValue.change(function() {
			var $this = $(this);
			slider.slider("values", $this.data("index"), $this.val());
		});
	});
	
	
	
	$('.filter-item__name').on('click', function(e) {
		e.preventDefault();
		var item = $(this).closest('.filter-item');
		item.find('.filter-content').slideToggle(250);
		$(this).toggleClass('close');
	});
	
	
	$('.close-catalog').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.catalog-item--hidden').slideToggle(250);
	});
	
	
	
	
	// $('.catalog-list').each(function(index, el) {
	// 	var height = $(this).outerHeight();
	// 	$('.catalog-filter').css('min-height', height);
	// });
	

});





function maps() {
	var mapOptions = {

		zoom: 14,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		streetViewControl: false,
		panControl: false,
		mapTypeControl: false,
		scaleControl: false,
		styles: [{
			stylers: [
			{ invert_lightness: true },
			{ saturation: -67 },
			{ lightness: 50 },
			{ gamma: 0.34 },
			{ hue: "#0088ff" }
			]
		}],
		center: new google.maps.LatLng(53.9393879, 27.5706500)


	};

	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var image = '/img/map-point.png';
	var marker = new google.maps.Marker({
		position: { lat: 53.9393879, lng: 27.6015018 },
		map: map,
		icon: image
	});

}