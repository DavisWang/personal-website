$(document).ready(function() {

    $("nav").delegate("a", "click", function() {
        content = $(this).attr("href");
		$("nav a").removeClass("current");
	    $("nav a[href="+content+"]").addClass("current");
		$("section[id]").fadeOut(200).hide();
		$("#" + content).fadeIn(200, function() {
			updatePageHeight();
		}); 
        return false;
    });
	
	function updatePageHeight() {
		var baseHeight = 175,
			curr = $(".current").attr("href");
		$("#page-wrap").animate({
			height: baseHeight + $("section#" + curr).height() + "px"
		});
	}
});