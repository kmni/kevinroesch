$(document).ready(function() {

var $doc = $(document),
	$window = $(window),
	homepage = $("body").hasClass("home"),
	mobile = false,
	ajaxSupported = false;

if ($doc.width() <= 768) {
	mobile = true;
}

if (window.XMLHttpRequest) {
	ajaxSupported = true;
} else if (window.ActiveXObject) {
	try {
		ajaxSupported = true;
	}
	catch (e) {
		try {
			ajaxSupported = true;
		}
		catch (e) { }
	}
}



//
//carousel
//
(function() {
	var moving = false;
	
	$('.jcarousel')
		.jcarousel();

	$('.jcarousel-pagination')
		.on('jcarouselpagination:active', 'span', function() {
			$(this).addClass('active');
		})
		.on('jcarouselpagination:inactive', 'span', function() {
			$(this).removeClass('active');
		})
		.jcarouselPagination({
			item: function() {
				return "<span></span>";
			}
		});
}());


//
// parallax
//
(function() {
	var windowHeight = $window.height();
	
	$(".parallax").each(function() {
		var $this = $(this),
			height = $this.height(),
			offset = $this.offset().top,
			scroll;
		
		$window.scroll(function() {
			scroll = $window.scrollTop();
			
			if (scroll > offset - windowHeight && scroll < offset + height) {
				$this.css("background-position", "50% " + ((scroll - (offset - windowHeight)) / (windowHeight + height) * 100) + "%");
			}
		});
	});
}());

//
// menu - inpage links
//
(function() {
	$("a[href^='#']").click(function(e) {
		e.preventDefault();
		
		var $this = $(this),
			target = $($this.attr("href")).offset().top - 198;
		
		$("html, body").animate({
			scrollTop: target
		}, 800);
	});
}());

//
// menu - highlight
//
var boundaries = [ ];
(function() {
	if (mobile) {
		return;
	}
	
	var scroll = 0,
		$links = $(".pageMenu a"),
		i;
	
	$links.each(function() {
		boundaries.push($($(this).attr("href")).offset().top - 199);
	});
		
	$window.scroll(function() {
		scroll = $doc.scrollTop();

		$links.removeClass("active");

		for (i = 0; i < boundaries.length; i++) {
			if (scroll < boundaries[i]) {
				break;
			}
		}

		if (i - 1 >= 0) {
			$links.eq(i - 1).addClass("active");
		}
	});
}());


//
// force scroll and resize
//
$window.resize().scroll();

});