//copyright: Lukasz Szczepanski of szczepan.me
var changRoleText = function(){
	roles = ['UX Designer','UI Designer','UI Developer','Front End Developer','Designer','UI Engineer','Web Designer','Web Developer','Coder','Human'];
	var roleElm = $('.role');
	setInterval(function(){
		var random = Math.floor(Math.random()*roles.length)
		var role = roles[random];
		var txt  = role + '.'
		roleElm.text(txt).attr('data-text',txt);
	},5000);

}
var addBgColor = function(){
	colorArrayOne = [createColor(),createColor(),createColor()];
	colorArrayTwo = [createColor(),createColor(),createColor()];
	stop1 = 'rgb(' + colorArrayOne[0] + ',' + colorArrayOne[1] + ',' + colorArrayOne[2] + ')';
	stop2 = 'rgb(' + colorArrayTwo[0] + ',' + colorArrayTwo[1] + ',' + colorArrayTwo[2] + ')';
	//currentColor1 = stop1;
	//currentColor2 = stop2;
	var gradient    = 'linear-gradient(45deg,' + stop1 + ',' + stop2 + ')';
	var revGradient = 'linear-gradient(-45deg,' + stop2 + ',' + stop1 + ')';
	$('.outer').css({'background': gradient}).addClass('active');
	// $('.stop1,.stop1 .tinyButton').css({'background': stop1});
	// $('.stop2,.stop2 .tinyButton').css({'background': stop2});
	$('.inner').addClass('active');
	// reloadStyleTags(stop1,stop2);
}
//find number between 0 and 255
var createColor = function(){
	var value = randomNumber();
	return parseInt(value);
}
var randomNumber = function(){
	return Math.floor(Math.random() * 255);
}
//apply styles to head
var reloadStyleTags = function(stop1,stop2){
	$('#style').remove();
	$('<style id="style">' +
		'.stop2 .imgWrapp::after , .stop2 .imgWrapp::before {background:' + stop2 + ';} ' +
		'.stop1-text{color:' + stop2 + ';} ' +
		'.stop2-text{color:' + stop1 + ';} ' +
		'.stop1 .imgWrapp::before , .stop1 .imgWrapp::after {background:' + stop1 + ';} ' +
		'.instaImagesBg {background:' + stop2 + '} ' +
		'.comingSoon .glitch:before{text-shadow:2px 0 ' + stop2 + '} ' +
		'.comingSoon .glitch:after{text-shadow:2px 0 ' + stop1 + '} ' +
		'</style>').appendTo('head');
}
//detect touch device
var isTouch = function(){
	var touch = $('html').hasClass('touchevents') ? true : false;
	return touch;
}
// detect iOS
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// window height & width
var getScreenSizes = function(){
	var width  = isTouch() ? window.screen.width : $(window).outerWidth();
	var height = isTouch() ? window.screen.height : $(window).outerHeight();
	return {width,height};
}
var width  = getScreenSizes().width;
var height = getScreenSizes().height;
//get current period of a day and change text in hero
function getCurrentDayTime() {
	var today = new Date()
	var curHr = today.getHours()
	var time  = $('.time')
	if (curHr < 12) {
		time.text('Morning')
	}else if (curHr >= 12 && curHr < 18) {
		time.text('Afternoon')
	}else{
		time.text('Evening')
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
	//console.log(json);
	for ( i=0; i < o.length; i++ ){
		var imageURL = o[i].images.standard_resolution.url;
		var image    = '<a class="instaLink" href="#"><img src="' + imageURL + '"/></a>';
		$(image).appendTo('#instafeed .instaImagesBg');
	}
};
//load infor from xml and create some html
var getDataFromXml = function(){
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
		//changeBgColor();
		createDotsNav();
		addClickEvents('.imgWrapp');
		addHoverEvents('.imgWrapp')
	});
}
//hover events for mask addAnimationsToSkills
var addHoverEvents = function(elm){
	$(elm).hover(function(){
		var className = $(this).attr('id');
		var parent    = $(this).parent()[0];
		$(parent).toggleClass(className);
	})
}
//click events for click elements
window.active = false;
var addClickEvents = function(elm){
	$(elm).off('click').click(function(){
		var elm       = $(this);
		var target    = elm.parents().hasClass('code') ? 'code' : 'design';
		var element   = $('.' + target);
		var container = $(element).find('.detailsContainer li').first();
		var method    = elm.hasClass('closeUI') ? 'close' : 'open';
		window.active = true;
		if (target == 'code'){
		  var index     = elm.index();
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
	  }else{
			alert(elm);
			elm.addClass('isOn');
			//elm.siblings('.imgWrapp').removeClass('isOn').addClass('isOff');
			// var imageURL  = window.location.href + 'images/FG-LP.jpg';
			// var className = 'image-content-wrapp';
			// var divTag    = '<div class=' + className + '><img class="image-content" src="' + imageURL + '" /></div>';
			// var e         = $('.' + className);
			// if (!e.length){
			// 	$('.isOn').after(divTag);
			// }else if(method == 'close'){
			// 	$('.' + className).removeClass('show');
			// }
			// $('.detailsContainer.images-li').addClass('scrollable');
			// animateDesignButtons(elm);
		};
		reactAndScrollTop(element,container,margin,method);
	});
};
//animate design buttons
var animateDesignButtons = function(elm){
	//var className = elm.className;
	var siblings  = elm.siblings('.imgWrapp');
	var delay     = 200;
	for (var i = 0; i < siblings.length; i++){
		var sib   = siblings;
		var index = 0;
		setTimeout(function(){
			timedEvenet(sib[index]);
			index++;
		},delay*i)
	}
};
var timedEvenet = function(sib){
	$(sib).addClass('isOff');
	$('.image-content-wrapp').addClass('show');
}
//adjust scrollTop for the elements
var reactAndScrollTop = function(element,container,margin,method){
	var domPos    = getScreenSizes().width <= 768 ? element.index()*2 : element.index();
	var distance  = domPos*height;
	var delay     = element.hasClass('activated') ? '0' : '500';
	//react after scrolling the container to top
	$('body,html').animate({scrollTop:distance}, delay, function() {
   	method == 'open' ? element.addClass('activated') : element.removeClass('activated');
		if (method == 'close'){
			$('.isOff,.isOn').removeClass('isOff isOn');
		}
		//window.active = false;
		container.css({
			'margin-top':-margin,
		})
	});
};
//create little dot navigation
var createDotsNav = function(){
	var list      = $('.codeDetails .detailsContainer li')
	var length    = list.length;
	var container = $('.codeDetails');
	container.append('<nav class="tinyNav"></nav>')
	list.each(function(index,el){
		nameData = $(this).find('h3').text();
		nameData.length == 0 ? nameData = 'All' : nameData;
		$('.tinyNav').append('<span data-for="' + nameData + '" class="tinyButton"></span>');
	});
	$('.tinyButton').eq(0).addClass('active')
	addClickEvents('.tinyButton,.closeUI');
	$('.tinyButton').css({
		'background': stop2
	});
};
var addAnimationsToSkills = function(index,method){
	var max     = 15;
	var li      = $('.codeDetails li');
	var seq     = index+1;
	var elm     = li.eq(seq);
	var skill   = $(elm).find('p.skill');
	var _length = $(elm).find('p.length');
	var s,l;
	skill.data('knowledge') ? s=skill.data('knowledge') : s = 0;
	_length.data('length') ? l=_length.data('length') : l = 0;
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
//is Odd?
var isOdd = function(num){return num % 2};
//mouse position
$(document).on('mousemove', function( event ) {
	var activated = $('.code').hasClass('activated');
	if (activated){
	  var x = event.pageX*0.1;
	  var y = event.pageY*0.1;
	  var panText = $('.stop1-text');
	  for (i=0; i<panText.length; i++){
	  	var index = panText[i];
	  	var dest;
	  	isOdd(i) ? dest = '-' : dest = '+';
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
$(document).on('scroll', function(){
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
		//checkDistanceFromTop([codeArticle,codeDetails,designArticle,designDetails,aboutMe]);
		$('.article-h2 span').css('background-position', mommentum+'px 0');
		$('.code article').css('background-position', bgMommentum + "% 50%");
		$('.design article').css('background-position', 100-bgMommentum + "% 50%");
		//$('.design .overlay,.code .overlay').css('background-position', docTop*0.1+ "% 50%");
});
var checkDistanceFromTop = function(el){
	for (var i=0; i<el.length; i++){
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
			if ($(e).hasClass('designDetailsssssss')){
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
var removeClassForEach = function(type,e){
	var imgWrapp = $(e).find('.imgWrapp');
	if (imgWrapp.length > 0){
		for (i=0;i<imgWrapp.length;i++){
			delayedReact(i,type,imgWrapp);
		}
	}
}
var delayedReact = function(index,type,el){
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
	if (width != $(window).outerWidth()){
		layoutsAdjust();
	}
});
//open navigation and events
var openNav = function(){
	$('.hamburger').click(function(){
		$(this).toggleClass('is-active');
	})
}
//after document has loaded
$(document).ready(function(){
	layoutsAdjust();
	addBgColor();
	//changeBgColor()
	//getDataFromXml();
	//instAPI();
	changRoleText();
	//openNav();
	$('.images-show').click(function(e){
		e.preventDefault();
		alert('#TODO');
	});
	//little hero heart click events
	$('.heart').click(function(){
		$('.outer,.inner').removeClass('active');
		setTimeout(function(){
			startTransition();
			$('.inner').addClass('active');
		}, 300);
	})
});
var layoutsAdjust = function(){
	height < 700 && !isTouch() ? height = 700 : height;
	var min = (getScreenSizes().width <= 768) ? height*2 : height;
	// console.log(height,min,width);
	$('.code , .design').css({
		'height':min,
		'min-height':min,
	});
	// $('.outer , .full-height').css({
	// 	'height':height,
	// });
	// if (iOS && window.screen.height == 568){
	// 	$(window).scrollTop(75);
	// };
}
