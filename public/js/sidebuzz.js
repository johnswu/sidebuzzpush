var winW = 630, winH = 460;

function resizeHostFrame() {
	if (document.body && document.body.offsetWidth) {
	 winW = document.body.offsetWidth;
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
	 winW = document.documentElement.offsetWidth;
	 winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
	 winW = window.innerWidth;
	 winH = window.innerHeight;
	}
	
	winH = winH - 40;
	
	document.getElementById('hostFrame').style.height=winH+"px";
	document.getElementById('hostFrame').style.width=winW+"px";
	
	// also size chat window
	winH = winH - 130;
	$(".chat-panel > .panel-body").height(winH+"px");
}

function checkCurrentPush() {

	var pusher = new Pusher('8db2fa907ed05e0b68f6');
	var channel = pusher.subscribe('my-channel');
	
	channel.bind('my-event', function(data) {
		console.log(data);
		if ($('#hostFrame').contents().get(0).location.href != data.URL) {
			$('#hostFrame').contents().get(0).location = data.URL;
		}
	});

	/*
	$.ajax({
		type: "GET",
		url: restAPI,
		dataType: "json",
		success: function (data) {
			if ($('#hostFrame').contents().get(0).location.href != data[0].URL) {
				$('#hostFrame').contents().get(0).location = data[0].URL;
			}
		},
		error: function (e) {
			alert('Could not retrieve next content');
		}
	});
	*/
}

function checkPushCycle() {
	var data;
	var restAPI = "http://side.buzz/api.php?action=get_current_push_by_eventid&id=1";
	
	$.ajax({
		type: "GET",
		url: restAPI,
		dataType: "json",
		success: function (data) {
			if ($('#hostFrame').contents().get(0).location.href != data[0].URL) {
				$('#hostFrame').contents().get(0).location = data[0].URL;
			}
		},
		error: function (e) {
			console.log('Could not retrieve next content');
		}
	});

	checkCurrentPush();
}

function openChat() {
	$('#chatContainer').slideToggle();
	//$('#chatContainer').animate({'width': 'toggle'});
}

function sizeFullFrameImage() {
	winH = winH - 40;

	$("img#fullFrame").height(winH);
	$("img#fullFrame").width(winH);
}