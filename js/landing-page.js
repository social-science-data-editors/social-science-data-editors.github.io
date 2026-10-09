// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var href = $(this).attr('href');
        // Only intercept in-page anchors; let links to other pages navigate normally
        if (!href || href.charAt(0) !== '#' || !$(href).length) return;
        // Offset by the fixed navbar so the heading isn't hidden underneath it
        var navHeight = $('.navbar-fixed-top').outerHeight() || 0;
        $('html, body').stop().animate({
            scrollTop: $(href).offset().top - navHeight - 10
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 70
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});