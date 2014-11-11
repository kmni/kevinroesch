var boundaries = [ ];

$(document).ready(function() {

var $doc = $(document),
	$window = $(window),
	homepage = $("body").hasClass("home"),
	mobile = false,
	ajaxSupported = false;

if ($doc.width() <= 600) {
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
		.on('jcarousel:create jcarousel:reload', function() {
			var element = $(this),
				width = element.innerWidth();
			
			element.jcarousel('items').css('width', width - (element.css("border-top-width") == "1px" ? 10 : 0) + 'px');
		})
		.jcarousel()
        .jcarouselAutoscroll({
            interval: 5000,
            target: '+=1',
            autostart: true
        });

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
// news
//
(function() {
	var $news = $(".news"),
		$wrap = $(".sectionHome .inner");
	
	$window.resize(function() {
		$wrap.css("min-height", $news.outerHeight(true));
	});
}());

//
// parallax
//
(function() {
	//apparently IE11 & fixed background are not friends
	//ipad has also troubles
	if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
			|| navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {
		$(".parallax").css({
			backgroundAttachment: "scroll",
			backgroundSize: "cover"
		});
		return;
	}
	
	var windowHeight = $window.height();
	
	$window.resize(function() {
		windowHeight = $window.height();
	});
	
	$(".parallax").each(function() {
		var $this = $(this),
			height = $this.height(),
			offset = $this.offset().top,
			scroll;
		
		$window.resize(function() {
			height = $this.height();
			offset = $this.offset().top;
		});
		
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
		var $this = $(this),
			target;
		
		if ($this.attr("href") === '#') {
			return;
		}
		
		e.preventDefault();
		
		target = $($this.attr("href")).offset().top - 198;
		
		$("html, body").animate({
			scrollTop: target
		}, 800);
	});
}());

//
// menu - highlight
//
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
// form
//
(function() {
	var $opener = $(".formOpener"),
		$form = $(".contactForm"),
		$otherOpeners = $(".contactUs");
	
	$form.hide();
	
	$opener.click(function() {
		if ($form.is(":visible")) {
			$form.slideUp(400, function() {
				$opener.removeClass("opened");
			});
		} else {
			$opener.addClass("opened");
			$form.delay(200).slideDown(400);
		}
	});
	
	$otherOpeners.click(function(e) {
		e.preventDefault();
		
		$opener.click();
	});
}());

//
// mobile menu
//
(function() {
	var $opener = $(".menuOpener"),
		$menu = $(".headerTop"),
		mobile = false,
		wasMobile = false;
	
	$window.resize(function() {
		if ($(window).width() <= 600) {
			mobile = true;
		} else {
			mobile = false;
		}
		
		if (mobile !== wasMobile) {
			if (mobile) {
				$menu.hide();
			} else {
				$menu.show();
			}
			
			wasMobile = mobile;
		}
	});
	
	$opener.click(function() {
		if ($menu.is(":visible")) {
			$menu.slideUp(200);
		} else {
			$menu.slideDown(200);
		}
	});
}());


//
// force scroll and resize
//
$window.resize().scroll();

});