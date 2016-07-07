//random color
var changeBgColor = function(userTriggered){
	a = 1
	stop1 = 'rgba(' + createColor() + ',' + createColor() + ',' + createColor() + ',' + a + ')'
	stop2 = 'rgba(' + createColor() + ',' + createColor() + ',' + createColor() + ',' + a + ')'
	stop1 = stop1.toString()
	stop2 = stop2.toString()
	gradient = 'linear-gradient(45deg,' + stop1 + ',' + stop2 + ')'
	$('.outer').css({
		'background': gradient,
	}).addClass('active');
}
function createColor(){
	return Math.floor(Math.random() * (256 - 0 + 1)) + 0
}
function getCurrentTime() {
	var today = new Date()
	var curHr = today.getHours()
	var time  = $('.time')
	if (curHr < 12) {
		time.text('Good Morning')
	}else if (curHr > 12 && curHr < 18) {
		time.text('Good Afternoon')
	}else{
		time.text('Good Evening')
	}
};
//instagram feed
var feed = new Instafeed({
    get: 'user',
    userId: 310892904,
    limit: '100',
    sortBy: 'most-recent',
    resolution: 'low_resolution',
    clientId: 'e4358e3f63984c27ad88e480843dcd36',
    accessToken: '310892904.e4358e3.63e2391b9be241158f28c6e3903e502d',
    useHttp: true,
    filter: function(image) { return image.tags.indexOf('') <= 0	}
});
//load big loooong xml svg file, don't inline!
$(document).ready(function(){
	$('.design , .outer').css('height',$(window).outerHeight())
	changeBgColor();
	getCurrentTime();
	//feed.run();
	//loop = setInterval(changeBgColor,10000);
	$('.inner').load('svg/svg_logo.xml');
	$('.behance').load('svg/behance.svg');
	$('.github').load('svg/gitHub.svg');
	$('.heart').click(function(){
		$('.outer').removeClass('active');
		setTimeout(function(){
			changeBgColor()
		}, 300);
	})
});
