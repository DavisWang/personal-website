$(document).ready(function() {

    var $pageWrap    = $("#page-wrap"),
        baseHeight   = 0,
	content = "home";

    $("nav").delegate("a", "click", function() {

	$pageWrap.height($pageWrap.height());
	baseHeight = $("#nav").height() + 53; //new base height assignment: 175px
        content = $(this).attr("href");
		$("nav a").removeClass("current");
	    $("nav a[href="+content+"]").addClass("current");
		$("section[id]").fadeOut(200).hide();
		$("#" + content).fadeIn(200, function() {
			$pageWrap.animate({
				height: baseHeight + $("#" + content).height() + "px"
			});
		}); 
        return false;
    });

});