// MAIN JavaScript

// YOUTUBE VIDEO
var params = { allowScriptAccess: "always",  wmode:"transparent" };
var atts = { id: "myytplayer" };
swfobject.embedSWF("http://www.youtube.com/v/qfBXKGqH9RU?version=3&enablejsapi=1&playerapiid=ytplayer&autoplay=1",
				   "ytapiplayer", "100%", "100%", "8", null, null, params, atts);

function onYouTubePlayerReady(playerId) {
	var ytplayer = document.getElementById("myytplayer");
	ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

function onytplayerStateChange(newState) {
	if (newState == 0) {
		hideVideo();
	}
}

function hideVideo() {
	$("#pageVideo").remove();
	$("#pageStart").show();
}
// END YOUTUBE VIDEO

var timeOutStart = false, counterInterval;

$(function(){
	var photo_1, photo_2;
	
	$(".b-tree-toy").click(function(){
		if (timeOutStart) return false;
		
		var photo = $(this).find(".b-tree-toy__photo"),
			src = photo.attr("src"),
			toy = $(this).find(".b-tree-toy__bg");
			
		if (photo.is(":visible")) return false;
		
		if (photo_1) {
			photo_2 = src;
		} else {
			photo_1 = src;
		}
		
		if (photo_1 && photo_2) {
			var photoOpened_1 = $(".b-tree-toy__photo[src='" + photo_1 + "']"),
				photoOpened_2 = $(".b-tree-toy__photo[src='" + photo_2 + "']");
				
			if (photo_1 == photo_2) {
				photoOpened_1.addClass("b-opened-right");
				photoOpened_2.addClass("b-opened-right");
			} else {
				setTimeout(function(){
					photoOpened_1.fadeOut().prev().fadeIn();
					photoOpened_2.fadeOut().prev().fadeIn();
					
					timeOutStart = false;
				}, 1000);
				timeOutStart = true;
			}
		
			photo_1 = '';
			photo_2 = '';
			
			checkOpenedRight();
		}
		
		photo.fadeIn();
		toy.fadeOut();
	});
	
	$(".b-link-start").click(function(){
		$("#pageStart").hide();
		$("#pageGenderChoose").show();
		$("#pageGame").show();
		$("#ChristmassTree").addClass("fadeIn");
		counterInterval = setInterval(updateCounter, 2000);
		
		$.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
				
		if(!$.browser.device){
			snowEffectBind();
		}
	});
	
	$(".b-choose-btns__man").click(function(){
		$(".b-tree-toy__photo[data-type=man]").remove();
		$("#pageGenderChoose").hide();
	});
	
	$(".b-choose-btns__woman").click(function(){
		$(".b-tree-toy__photo[data-type=woman]").remove();
		$("#pageGenderChoose").hide();
	});
	
	$(".b-btn-fb").click(function(){
		$(this).find('a').click();
	});
	
	$(".b-video-skip").click(function(){
		hideVideo();
	});
	
	$(".b-form-send-id form").submit(function(){
		var data = $(this).serialize(),
			ID = $.trim($(this).find(".b-input-text").val());
			
		if (!ID) {
			$(".b-form-send-id__result").hide();
			$(".b-form-send-id__error").show();
			
			return false;
		}
			
		$.ajax({
			type: "POST",
			url: "/send_mail.php",
			data: data,
			success: function(result) {
				if (result == "MESSAGE_SENT") {
					$(".b-form-send-id__result").show();
					$(".b-form-send-id__error").hide();
				}
			},
			dataType: "text"
		});
		return false;
	});
});

function checkOpenedRight() {
	var size = $(".b-tree-toy__photo.b-opened-right").size();
	
	if (size == 20) {
		setTimeout(showForm, 1000);
	}
}

function showForm() {
	$("#pageGame").hide();
	$("#pageWinnerForm").show();
	
	$.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
				
	if(!$.browser.device){
		snowEnd();
		$(".snowEffect").remove();
	}
}

function updateCounter() {
	var startCounter = 1031,
		endCounter = 99999,
		now = $(".b-counter__text").data("count"),
		next = 0;
		
	if (!now) {
		next = startCounter;
	} else {
		next = now + 3;
	}
	
	if (next >= endCounter)
	{
		clearInterval(counterInterval);
		next = endCounter;
	}
	
	var text = next.toString();
	if (next < 1000) {
		text = '00' + text;
	} else if (next < 10000) {
		text = '0' + text;
	}
	
	$(".b-counter__text").data("count", next).text(text);
}