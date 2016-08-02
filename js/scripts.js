//copyright: Lukasz Szczepanski

//random bg gradient color
var changeBgColor = function(userTriggered){
	a = 1
	stop1 = 'rgba(' + createColor() + ',' + createColor() + ',' + createColor() + ',' + a + ')'
	stop2 = 'rgba(' + createColor() + ',' + createColor() + ',' + createColor() + ',' + a + ')'
	stop1 = stop1.toString()
	stop2 = stop2.toString()
	gradient    = 'linear-gradient(45deg,' + stop1 + ',' + stop2 + ')'
	revGradient = 'linear-gradient(-45deg,' + stop2 + ',' + stop1 + ')'
	window.stop1 = stop1;
	window.stop2 = stop2
	$('.outer').css({
		'background': gradient
	}).addClass('active');
	$('.stop1,.tinyButton').css({
		'background': stop1
	});
	$('.stop2').css({
		'background': stop2
	});
	$('.inner').addClass('active');
	$('#style').remove();
	$('<style id="style">.code .codeDetails ul li .imagesContainer .imgWrapp::after , .code .codeDetails ul li .imagesContainer .imgWrapp::before{background:' + stop1 + '}</style>').appendTo('head');
}
//find number between 0 to 255
function createColor(){
	return Math.floor(Math.random() * (255 - 0 + 1)) + 0
}
//detect touch device
function isTouch(){
	var touch = $('html').hasClass('touchevents')
	if (touch){
		return true;
	}else {
		return false;
	}
}
// detect iOS
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
//get current period of a day and change text in hero
function getCurrentTime() {
	var today = new Date()
	var curHr = today.getHours()
	var time  = $('.time')
	if (curHr < 12) {
		time.text('Good Morning')
	}else if (curHr >= 12 && curHr < 18) {
		time.text('Good Afternoon')
	}else{
		time.text('Good Evening')
	};
};
//instagram feed
var feed = new Instafeed({
		// get: 'tagged',
		// tagName: 'logo',
		// accessToken: '310892904.e4358e3.63e2391b9be241158f28c6e3903e502d'
		get:        'user',
		tagName:    'awesome',
    userId:      310892904,
    limit:       '100',
    sortBy:      'most-recent',
    resolution:  'low_resolution',
    clientId:    'e4358e3f63984c27ad88e480843dcd36',
    accessToken: '310892904.e4358e3.63e2391b9be241158f28c6e3903e502d',
    useHttp:     true,
    filter: function(image) { return image.tags.indexOf('') <= 0	}
});
//load infor from xml and create some html
function getDataFromXml(){
	path = window.location.href + 'images/dev-icons/'
	$.get(path + 'data.xml', function(d){
		var skill  = $(d).find('skill')
		var length = skill.length;
		skill.each(function(index){
			var skill       = $(this);
			var title       = skill.attr('title');
			var img         = skill.attr('imageurl');
			var imgUrl      = path + img;
			var description = skill.find('description').text();
			var skillset    = skill.find('description').attr('skillset');
			//create nav li's
			$('.innerNav .imagesContainer').append('<span data-title="' + title + '" class="imgWrapp"><img data-title="' + title + '" class="devIcon" alt="" src="' + imgUrl + '" /></span>');
			//create content li's
			var html = '<li data-index="'+ index++ +'" class="asTable">';
			html += '<h3>' + title + '</h3>'
			html += '<p>' + description + '</p>' ;
			html += '</li>';
			$('.codeDetails .detailsContainer').append($(html));
		});
		createDotsNav();
		addClickEvents('.imgWrapp');
	});
}
//create little dot navigation
function createDotsNav(){
	var list      = $('.detailsContainer li')
	var length    = list.length;
	var container = $('.codeDetails');
	container.append('<nav class="tinyNav"></nav>')
	list.each(function(index,el){
		$('.tinyNav').append('<span class="tinyButton"></span>');
	});
	$('.tinyButton').eq(0).addClass('active')
	addClickEvents('.tinyButton');
	$('.tinyButton').css({
		'background': stop1
	});
};
//click events for click elements
function addClickEvents(elm){
	$(elm).off('click').click(function(){
		var index     = $(this).index();
		var container = $('.detailsContainer li').first()
		var height    = container.outerHeight()
		if (elm == '.tinyButton'){
			var margin = (index)*height
			$(this).addClass('active').siblings().removeClass('active')
		}else{
			var margin = (index+1)*height
			$('.tinyButton').eq(index+1).addClass('active').siblings().removeClass('active')
		};
		container.css({
			'margin-top':-margin,
		})
	});
};
//after document loaded
$(document).ready(function(){
	height = $(window).outerHeight()
	iOS? min = window.screen.height : min = height
	$('.design , .outer , .code').css({
		'height':height,
		'min-height':min,
	})
	if (iOS && window.screen.height==568){
		$(window).scrollTop(85);
	};
	changeBgColor();
	getCurrentTime();
	getDataFromXml();
	//feed.run();
	//load big loooong xml svg file, don't inline!
	$('.inner').load('svg/svg_logo.xml');
	$('.behance').load('svg/behance.svg');
	$('.github').load('svg/gitHub.svg');
	//little hero heart click events
	$('.heart').click(function(){
		$('.inner').removeClass('active');
		$('.outer').removeClass('active');
		setTimeout(function(){
			changeBgColor()
		}, 300);
	})
});
