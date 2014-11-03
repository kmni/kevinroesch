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
// force scroll and resize
//
$window.resize().scroll();

});