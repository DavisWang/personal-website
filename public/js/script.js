$(document).ready(function() {

		 $('#gallery').galleria({
				 width:675,
				 height:675
		 });

		$("a.fancybox").fancybox();
		console.log("Hello");
		$("nav").delegate("a", "click", function() {
			content = $(this).attr("id").substring(4);
			console.log("content: " + content);
			$("nav a").removeClass("current");
			console.log("nav a#" + content);
			$("nav a#nav-" + content).addClass("current");
			
			$("section[id]").fadeOut(200).hide();
			console.log("section#" + content);
			$("section#" + content).fadeIn(200, function() {
				updatePageHeight();
			}); 
			return false;
		});
	
	function updatePageHeight() {
		var baseHeight = 175,
		curr = $(".current").attr("id").substring(4);
		console.log("curr is "  + curr)
		$("#page-wrap").animate({
			height: baseHeight + $("section#" + curr).height() + "px"
		});
	}
});