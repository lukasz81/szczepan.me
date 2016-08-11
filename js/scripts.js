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
	$('.stop1,.stop1 .tinyButton').css({
		'background': stop1
	});
	$('.stop2,.stop2 .tinyButton').css({
		'background': stop2
	});
	$('.inner').addClass('active');
	$('#style').remove();
	$('<style id="style">' +
		'.code .codeDetails ul li .imagesContainer .imgWrapp::after , .code .codeDetails ul li .imagesContainer .imgWrapp::before {background:' + stop2 + ';} ' +
		'.code .stop1-text{color:' + stop2 + ';} ' +
		'.design .designDetails ul li .imagesContainer .imgWrapp::before,.design .designDetails ul li .imagesContainer .imgWrapp::after{background:' + stop1 + ';} ' +
	  '</style>').appendTo('head');
}
//find number between 0 to 255
function createColor(){
	return Math.floor(Math.random() * (255 - 0 + 1)) + 0
}
//detect touch device
var isTouch = function isTouch(){
	var touch = $('html').hasClass('touchevents')
	if (touch){
		return true;
	}else {
		return false;
	}
}
// detect iOS
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// window height & width
var width = $(window).outerWidth();
var height;
isTouch()? height = window.screen.height : height = $(window).outerHeight();
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
function instAPI(){
	var accessToken = '310892904.e4358e3.63e2391b9be241158f28c6e3903e502d';
	var userId      = '310892904';
	var clientId    = 'e4358e3f63984c27ad88e480843dcd36';
	$.ajax({
		type:'GET',
  	url: "https://api.instagram.com/v1/users/self/media/recent/?access_token="+accessToken,
  	dataType: "jsonp",
		jsonpCallback: 'callbackFunction'
	});
}
var callbackFunction = function(json){
	var o = json.data;
	for ( i=0; i < o.length; i++ ){
		var imageURL = o[i].images.standard_resolution.url;
		var image    = '<a href="#"><img src="' + imageURL + '"/></a>';
		$(image).appendTo('#instafeed');
	}
};
//load infor from xml and create some html
function getDataFromXml(){
	path = window.location.href + 'images/dev-icons/';
	$.get(path + 'data.xml', function(d){
		var skill  = $(d).find('skill');
		var length = skill.length;
		skill.each(function(index){
			var skill       = $(this);
			var title       = skill.attr('title');
			var img         = skill.attr('imageurl');
			var imgUrl      = path + img;
			var description = skill.find('description').text();
			var knowledge   = skill.find('knowledge').text();
			var use   			= skill.find('use').text();
			var skillset    = skill.find('description').attr('skillset');
			var length      = skill.find('description').attr('length');
			//create nav li's
			$('.innerNav .imagesContainer').append('<span data-title="' + title + '" class="imgWrapp def">' + title + '</span>');
			//create content li's
			var html = '<li data-index="'+ index++ +'" class="asTable">';
			html += '<aside><h3 class="stop1-text">' + title + '</h3>';
			html += '<p>' + description + '</p>';
			html += '<p class="withBg skill" data-knowledge="' + skillset + '">' + knowledge +'<span class="bar stop2">' + knowledge +'</span><span class="val">0</span></p>';
			html += '<p class="withBg length" data-length="' + length + '">' + use +'<span class="bar stop2">' + use +'</span><span class="val">0</span></p>';
			html += '</li></aside>';
			$('.codeDetails .detailsContainer').append($(html));
		});
		changeBgColor();
		createDotsNav();
		addClickEvents('.imgWrapp');
	});
}
//create little dot navigation
function createDotsNav(){
	var list      = $('.codeDetails .detailsContainer li')
	var length    = list.length;
	var container = $('.codeDetails');
	container.append('<nav class="tinyNav"></nav>')
	list.each(function(index,el){
		nameData = $(this).find('h3').text();
		(nameData.length == 0)? nameData = 'All' : nameData
		$('.tinyNav').append('<span data-for="' + nameData + '" class="tinyButton"></span>');
	});
	$('.tinyButton').eq(0).addClass('active')
	addClickEvents('.tinyButton,.closeUI');
	$('.tinyButton').css({
		'background': stop2
	});
};
//click events for click elements
window.active = false;
function addClickEvents(elm){
	$(elm).off('click').click(function(){
		window.active = true;
		var elm       = $(this);
		var index     = elm.index();
		var container = $('.detailsContainer li').first();
		var height    = container.outerHeight();
		if (elm.hasClass('tinyButton') || elm.hasClass('closeUI')){
			var margin = (index)*height;
			$(this).addClass('active').siblings().removeClass('active');
			addAnimationsToSkills(index-1,method);
		}else{
			var margin = (index+1)*height;
			$('.tinyButton').eq(index+1).addClass('active').siblings().removeClass('active');
			addAnimationsToSkills(index,method);
		};
		var method;
		elm.hasClass('closeUI')? method='close' : method='open';
		var elm = $('.code');
		//removeClassForEach('remove',elm);
		reactToScrollTop(elm,container,margin,method);
	});
};
function addAnimationsToSkills(index,method){
	var max     = 15;
	var li      = $('.codeDetails li');
	var seq     = index+1;
	var elm     = li.eq(seq);
	var skill   = $(elm).find('p.skill');
	var _length = $(elm).find('p.length');
	var s,l;
	skill.data('knowledge')? s=skill.data('knowledge') : s=0;
	_length.data('length')? l=_length.data('length') : l=0;
	var sBar    = skill.find('span.bar');
	var sVal    = skill.find('span.val');
	var lBar    = _length.find('span.bar');
	var lVal    = _length.find('span.val');
	$({someValue: 0}).animate({s,val:(l/max)*100,l}, {
		duration: 3000,
		easing:'swing',
		step: function() {
			sBar.css('width',Math.round(this.s)+'%');
			sVal.text(Math.round(this.s)+'%');
			lBar.css('width',Math.round(this.val)+'%');
			lVal.text(Math.round(this.l)+' yrs')
		}
	});
}
//adjust scrollTop for the elements
function reactToScrollTop(elm,container,margin,method){
	var delay = '500';
	domPos    = elm.index();
	distance  = domPos*height;
	elm.hasClass('activated')? delay='0' : delay='500';
	$('body,html').animate({scrollTop:distance}, delay, function() {
   	method=='open'? elm.addClass('activated') : elm.removeClass('activated');
		window.active = false;
		container.css({
			'margin-top':-margin,
		})
	});
};
//isOdd?
function isOdd(num){return num % 2};
//mouse position
$(document).on( "mousemove", function( event ) {
	if ($('.code').hasClass('activated')){
	  var x = event.pageX*0.1;
	  var y = event.pageY*0.1;
	  var panText = $('.stop1-text');
	  for (i=0; i<panText.length; i++){
	  	var index = panText[i];
	  	var dest;
	  	isOdd(i)? dest='-':dest="+";
	  	var valX = dest+y;
	  	var valY = dest+x;
	    $(panText).eq(i).css({
	  		'-webkit-transform' : 'translate3d(' + valX + 'px,' + valY + 'px,0)',
	  	  '-moz-transform'    : 'translate3d(' + valX + 'px,' + valY + 'px,0)',
	  	  '-ms-transform'     : 'translate3d(' + valX + 'px,' + valY + 'px,0)',
	  	  '-o-transform'      : 'translate3d(' + valX + 'px,' + valY + 'px,0)',
	  	  'transform'         : 'translate3d(' + valX + 'px,' + valY + 'px,0)'
	  	})
	  };
	}else{
		return
	}
});
$(document).on('scroll',function(){
		var codeArticle    = $('.code article')[0];
		var codeDetails    = $('.code .codeDetails')[0];
		var designArticle  = $('.design article')[0];
		var designDetails  = $('.design .designDetails')[0];
		var aboutMe        = $('#instafeed')[0];
		//////////////
		var docTop         = $(document).scrollTop();
		var _index         = parseInt(docTop/height);
		var mommentum      = docTop*0.5;
		var bgMommentum    = docTop*0.01;
		var distance       = (docTop-height*_index)*1.75
		checkDistanceFromTop([codeArticle,codeDetails,designArticle,designDetails,aboutMe]);
		$('.article-h2 span').css('background-position', mommentum+'px 0');
		$('.code article').css('background-position', bgMommentum + "% 50%");
		$('.design article').css('background-position', bgMommentum/5 + "% 50%");
});
function checkDistanceFromTop(el){
	for (i=0; i<el.length; i++){
		var e     = el[i];
		var top   = e.getBoundingClientRect().top;
		var half  = height/1.5;
		if (top <= half && top > half/8 && $(e).hasClass('def')){
			$(e).removeClass('def');
			removeClassForEach('remove',e);
		}else if ($(document).scrollTop() < 100){
			$(e).addClass('def');
			if (!window.active){
			  removeClassForEach('add',e);
		  }
		}else if (top <= height/1.2){
			if ($(e).hasClass('designDetails')){
				//alert('d');
				$(e).find('.imagesContainer').css({
					'-webkit-transform' : 'translateY(' + -top*0.15 + 'px)',
					'-moz-transform'    : 'translateY(' + -top*0.15 + 'px)',
					'-ms-transform'     : 'translateY(' + -top*0.15 + 'px)',
					'-o-transform'      : 'translateY(' + -top*0.15 + 'px)',
					'transform'         : 'translateY(' + -top*0.15 + 'px)',
				});
			}
		}
	};
}
//remove class for each element and animate
function removeClassForEach(type,e){
	var imgWrapp = $(e).find('.imgWrapp');
	if (imgWrapp.length > 0){
		for (i=0;i<imgWrapp.length;i++){
			delayedReact(i,type,imgWrapp);
		}
	}
}
function delayedReact(index,type,el){
	setTimeout(function(){
		if (type == 'remove'){
			el.eq(index).removeClass('def')
		}else{
			el.eq(index).addClass('def')
		};
	}, index*150);
}
//resize update
$(window).resize(function(){
	layoutsAdjust();
});
//after document has loaded
$(document).ready(function(){
	layoutsAdjust();
	getCurrentTime();
	getDataFromXml();
	instAPI();
	//load big loooong xml svg file, don't inline!
	loadSVGs();
	//little hero heart click events
	$('.heart').click(function(){
		$('.inner , .outer').removeClass('active');
		setTimeout(function(){
			changeBgColor()
		}, 300);
	})
});
function layoutsAdjust(){
	(height < 700 && !isTouch())? height = 700 : height;
	var min;
	(width < 768) ? min=height*2 : min=height;
	console.log(height,min,width);
	$('.code , .design').css({
		'height':height,
		'min-height':min,
	});
	$('.outer , .full-height').css({
		'height':height,
	})
	if (iOS && window.screen.height==568){
		$(window).scrollTop(85);
	};
}
function loadSVGs(){
	$('.inner').load('svg/svg_logo.xml');
	$('.behance').load('svg/behance.svg');
	$('.github').load('svg/gitHub.svg');
	$('.code-shield').load('svg/code-shield.svg')
	$('.design-shield').load('svg/design-shield.svg')
}
