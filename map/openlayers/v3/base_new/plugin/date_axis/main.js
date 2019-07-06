/**
 * 初始化时间轴 initThisTimeLine(startsyear);
 * @author liangbin
 */
var initThisTimeLine;
/**
 * 获取选中的参数
 * 
 * @returns 返回字符串
 */
var getTimelineSelected;
/**
 * 点击后执行的方法 覆盖此方法
 */
var creatDataTimeLine;
/**
 * 标记是否可以播放 null不能播放
 */
var playmark = null;
/**
 * 加载成功后执行一次，playCompletion（5000），5000毫秒后执行下一次
 */
var playCompletion;
// 全局变量
var playtempli;
var interval = null;
var ollength;
var myInterval;
(function($) {
	// 生成时间轴参数
	var getTimeData;
	creatDataTimeLine = function() {
	}
	getTimeData = function(time, type) {
		var year = parseInt(time.substring(0, 4));
		var month = parseInt(time.substring(4, 6));
		var startyear = year - 20;
		// var startyear = parseInt(time);
		// var mydate = new Date();
		// var year = mydate.getFullYear();
		// var month = (mydate.getMonth() + 1);
		var datas = $("<div></div>");
		if (type == "quarter") {
			var data;
			for ( var i = startyear; i < year; i++) {
				data = formatData(i, "01", getstr(i, 1, 3), i + "年第一季度");
				datas.append(data);
				data = formatData(i, "04", getstr(i, 4, 6), i + "年第二季度");
				datas.append(data);
				data = formatData(i, "07", getstr(i, 7, 9), i + "年第三季度");
				datas.append(data);
				data = formatData(i, "10", getstr(i, 10, 12), i + "年第四季度");
				datas.append(data);
			}
			data = formatData(year, "01", getstr(year, 1, 3), year + "年第一季度");
			datas.append(data);
			if (month >= 4) {
				data = formatData(year, "04", getstr(year, 4, 6), year
						+ "年第二季度");
				datas.append(data);
			}
			if (month >= 7) {
				data = formatData(year, "07", getstr(year, 7, 9), year
						+ "年第三季度");
				datas.append(data);
			}
			if (month >= 10) {
				data = formatData(year, "10", getstr(year, 10, 12), year
						+ "年第四季度");
				datas.append(data);
			}
			var li = datas.find("li:last");
			li.find("a").addClass('selected');
		}
		if (type == "month") {
			var data;
			for ( var i = startyear; i < year; i++) {
				for ( var j = 1; j <= 12; j++) {
					var aa = (j < 10) ? (0 + "" + j) : j;
					data = formatData(i, aa, getstr(i, j, j), i + "年" + j + "月");
					datas.append(data);
				}
			}
			for ( var j = 1; j <= month; j++) {
				var aa = (j < 10) ? (0 + "" + j) : j;
				data = formatData(year, aa, getstr(year, j, j), year + "年" + j
						+ "月");
				datas.append(data);
			}
			var li = datas.find("li");
			li.eq(-2).find("a").addClass('selected');
		}
		if (type == "year") {
			var data;
			for ( var i = startyear; i <= year; i++) {
				data = formatData(i, "01", getstr(i, 1, 12), i + "年");
				datas.append(data);
			}
			var li = datas.find("li:last");
			li.find("a").addClass('selected');
		}
		// datas.find("li a[data-date='01/01/" + year +
		// "']").addClass('selected');
		return datas.html();
	}

	function getstr(year, start, end) {
		var str = "";
		for ( var i = start; i <= end; i++) {
			var month = (i < 10) ? (0 + "" + i) : i;
			str = str + year + month + ",";
		}
		if (str.length > 0) {
			str = str.substring(0, str.length - 1);
		}
		return str;
	}

	function formatData(year, month, date, name) {
		var data = '<li><a href="#0" data-date="01/' + month + '/' + year
				+ '" date="' + date + '">' + name + '</a></li>';
		return data;
	}
	getTimelineSelected = function() {
		var date = $(
				".cd-horizontal-timeline .events ol li a[class='selected']")
				.attr("date");
		return date;
	}
	var eventsMinDistance;
	var timeline = {};
	initThisTimeLine = function(date) {
		timeline.year = getTimeData(date, "year");
		timeline.quarter = getTimeData(date, "quarter");
		timeline.month = getTimeData(date, "month");
//		$("body")
//				.append(
//						'<a class="timeline-mini" title="显示时间轴"></a> <div class="timelinebox"><a class="reduce" id="timeline-reduce" title="最小化"></a><div style="margin-top:10px"><span style="margin-left:4em">查看时间段：</span><select class="timeline-select" id="timeline-select"><option value="month">按月查看</option><option value="quarter">按季度查看</option><option value="year">按年查看</option></select><a class="start" style="float:right;margin-right:10%" id="timeline-play"></a><span style="float:right;margin-right:1%">点击自动播放地图</span></div><section class="cd-horizontal-timeline"><div class="timeline" style="height:70px"><div class="events-wrapper" style="top:-10px"><div class="events"><ol></ol><span class="filling-line" aria-hidden="false"></span></div></div><ul class="cd-timeline-navigation"><li><a href="#0" class="prev inactive">Prev</a></li><li><a id="timeline-next" href="#0" class="next">Next</a></li></ul></div></section></div>');
		$("body")
		.append(
				'<a class="timeline-mini" title="显示时间轴"></a> <div class="timelinebox"><a class="reduce" id="timeline-reduce" title="最小化"></a><div style="margin-top:10px"><span style="margin-left:4em">查看时间段：</span><select class="timeline-select" id="timeline-select"><option value="month">按月查看</option><option value="year">按年查看</option></select><a class="start" style="float:right;margin-right:10%" id="timeline-play"></a><span style="float:right;margin-right:1%">点击自动播放地图</span></div><section class="cd-horizontal-timeline"><div class="timeline" style="height:70px"><div class="events-wrapper" style="top:-10px"><div class="events"><ol></ol><span class="filling-line" aria-hidden="false"></span></div></div><ul class="cd-timeline-navigation"><li><a href="#0" class="prev inactive">Prev</a></li><li><a id="timeline-next" href="#0" class="next">Next</a></li></ul></div></section></div>');

		$('.timeline .events-wrapper .events ol').append(timeline.month);
		$("#timeline-select").val("month");
		var timelines = $('.cd-horizontal-timeline');
		eventsMinDistance = 120;
		(timelines.length > 0) && initTimeline(timelines);
		var index = $(
				'.timeline .events-wrapper .events ol li a[class="selected"]')
				.parent().index();
		index = index * (-120);
		setTransformValue($(".timeline .events-wrapper .events")[0],
				'translateX', index + 'px');
		// 通过选择下拉框切换不同时间轴
		$("#timeline-select").change(changeTimeline);
		// 绑定播放按钮
		$("#timeline-play").click(function() {
			timelinePlay()
		});
		// 绑定最小化
		$("#timeline-reduce").click(function() {
			var _timeline = $(".timelinebox");
			if (_timeline.is(':visible')) {
				_timeline.hide();
				$(".timeline-mini").show();
			}
		});
		$(".timeline-mini").click(function() {
			$(".timelinebox").show();
			$(".timeline-mini").hide();
		});
	}
	function initTimeline(timelines) {
		timelines
				.each(function() {
					var timeline = $(this), timelineComponents = {};
					// cache timeline components
					timelineComponents['timelineWrapper'] = timeline
							.find('.events-wrapper');
					timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper']
							.children('.events');
					timelineComponents['fillingLine'] = timelineComponents['eventsWrapper']
							.children('.filling-line');
					timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper']
							.find('a');
					timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
					timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
					timelineComponents['timelineNavigation'] = timeline
							.find('.cd-timeline-navigation');
					timelineComponents['eventsContent'] = timeline
							.children('.events-content');

					// assign a left postion to the single
					// events along the timeline
					setDatePosition(timelineComponents, eventsMinDistance);
					// assign a width to the timeline
					var timelineTotWidth = setTimelineWidth(timelineComponents,
							eventsMinDistance);
					// the timeline has been initialize - show
					// it
					timeline.addClass('loaded');

					// detect click on the next arrow
					timelineComponents['timelineNavigation'].on('click',
							'.next', function(event) {
								event.preventDefault();
								updateSlide(timelineComponents,
										timelineTotWidth, 'next');
							});
					// detect click on the prev arrow
					timelineComponents['timelineNavigation'].on('click',
							'.prev', function(event) {
								event.preventDefault();
								updateSlide(timelineComponents,
										timelineTotWidth, 'prev');
							});
					// detect click on the a single event - show
					// new event content
					// 点击
					var defaultclick;
					timelineComponents['eventsWrapper'].unbind("click",
							defaultclick);
					timelineComponents['eventsWrapper'].on('click', 'a',
							defaultclick = function(event) {
								event.preventDefault();
								timelineComponents['timelineEvents']
										.removeClass('selected');
								$(this).addClass('selected');
								creatDataTimeLine();
							});

					// on swipe, show next/prev event content
					timelineComponents['eventsContent'].on('swipeleft',
							function() {
								var mq = checkMQ();
								(mq == 'mobile')
										&& showNewContent(timelineComponents,
												timelineTotWidth, 'next');
							});
					timelineComponents['eventsContent'].on('swiperight',
							function() {
								var mq = checkMQ();
								(mq == 'mobile')
										&& showNewContent(timelineComponents,
												timelineTotWidth, 'prev');
							});

				});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		// retrieve translateX value of
		// timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']), wrapperWidth = Number(timelineComponents['timelineWrapper']
				.css('width').replace('px', ''));
		// translate the timeline to the
		// left('next')/right('prev')
		(string == 'next') ? translateTimeline(timelineComponents,
				translateValue - wrapperWidth + eventsMinDistance, wrapperWidth
						- timelineTotWidth) : translateTimeline(
				timelineComponents, translateValue + wrapperWidth
						- eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		// go from one event to the next/previous one
		var visibleContent = timelineComponents['eventsContent']
				.find('.selected'), newContent = (string == 'next') ? visibleContent
				.next()
				: visibleContent.prev();

		if (newContent.length > 0) { // if there's a
			// next/prev event -
			// show it
			var selectedDate = timelineComponents['eventsWrapper']
					.find('.selected'), newEvent = (string == 'next') ? selectedDate
					.parent('li').next('li').children('a')
					: selectedDate.parent('li').prev('li').children('a');

			updateFilling(newEvent, timelineComponents['fillingLine'],
					timelineTotWidth);
			// updateVisibleContent(newEvent,
			// timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents,
					timelineTotWidth);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents,
			timelineTotWidth) {
		// translate timeline to the left/right according to the
		// position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null), eventLeft = Number(eventStyle
				.getPropertyValue("left").replace('px', '')), timelineWidth = Number(timelineComponents['timelineWrapper']
				.css('width').replace('px', '')), timelineTotWidth = Number(timelineComponents['eventsWrapper']
				.css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

		if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate)
				|| (string == 'prev' && eventLeft < -timelineTranslate)) {
			translateTimeline(timelineComponents, -eventLeft + timelineWidth
					/ 2, timelineWidth - timelineTotWidth);
		}
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; // only negative
		// translate value
		value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth
				: value; // do
		// not
		// translate
		// more
		// than
		// timeline width
		setTransformValue(eventsWrapper, 'translateX', value + 'px');
		// update navigation arrows visibility
		(value == 0) ? timelineComponents['timelineNavigation'].find('.prev')
				.addClass('inactive')
				: timelineComponents['timelineNavigation'].find('.prev')
						.removeClass('inactive');
		(value == totWidth) ? timelineComponents['timelineNavigation'].find(
				'.next').addClass('inactive')
				: timelineComponents['timelineNavigation'].find('.next')
						.removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		// change .filling-line length according to the selected
		// event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null), eventLeft = eventStyle
				.getPropertyValue("left"), eventWidth = eventStyle
				.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', ''))
				+ Number(eventWidth.replace('px', '')) / 2;
		var scaleValue = eventLeft / totWidth;
		// setTransformValue(filling.get(0), 'scaleX',
		// scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
			var distance = daydiff(timelineComponents['timelineDates'][0],
					timelineComponents['timelineDates'][i])
			// var distanceNorm = Math.floor(distance /
			// timelineComponents['eventsMinLapse']) + 1; /*根据日期间隔分割*/
			var distanceNorm = i + 1; /* 平均分割时间轴距离 */
			timelineComponents['timelineEvents'].eq(i).css('left',
					distanceNorm * min + 'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		// var timeSpan = daydiff(
		// timelineComponents['timelineDates'][0],
		// timelineComponents['timelineDates'][timelineComponents['timelineDates'].length
		// - 1]), timeSpanNorm = timeSpan
		// / timelineComponents['eventsMinLapse'], timeSpanNorm = Math
		// .round(timeSpanNorm) + 4, totalWidth = timeSpanNorm * width;
		var length = timelineComponents['timelineDates'].length + 2.5;
		totalWidth = eventsMinDistance * length;
		timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
		updateFilling(timelineComponents['timelineEvents'].eq(0),
				timelineComponents['fillingLine'], totalWidth);

		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
	}

	function updateOlderEvents(event) {
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null), timelineTranslate = timelineStyle
				.getPropertyValue("-webkit-transform")
				|| timelineStyle.getPropertyValue("-moz-transform")
				|| timelineStyle.getPropertyValue("-ms-transform")
				|| timelineStyle.getPropertyValue("-o-transform")
				|| timelineStyle.getPropertyValue("transform");

		if (timelineTranslate.indexOf('(') >= 0) {
			var timelineTranslate = timelineTranslate.split('(')[1];
			timelineTranslate = timelineTranslate.split(')')[0];
			timelineTranslate = timelineTranslate.split(',');
			var translateValue = timelineTranslate[4];
		} else {
			var translateValue = 0;
		}

		return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property + "(" + value + ")";
		element.style["-moz-transform"] = property + "(" + value + ")";
		element.style["-ms-transform"] = property + "(" + value + ")";
		element.style["-o-transform"] = property + "(" + value + ")";
		element.style["transform"] = property + "(" + value + ")";
	}

	// based on
	// http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript

	function parseDate(events) {
		var dateArrays = [];
		events.each(function() {
			var dateComp = $(this).data('date').split('/'), newDate = new Date(
					dateComp[2], dateComp[1] - 1, dateComp[0]);
			dateArrays.push(newDate);
		});
		return dateArrays;
	}

	function parseDate2(events) {
		var dateArrays = [];
		events.each(function() {
			var singleDate = $(this), dateComp = singleDate.data('date').split(
					'T');
			if (dateComp.length > 1) { // both
				// DD/MM/YEAR
				// and time are
				// provided
				var dayComp = dateComp[0].split('/'), timeComp = dateComp[1]
						.split(':');
			} else if (dateComp[0].indexOf(':') >= 0) { // only
				// time
				// is
				// provide
				var dayComp = [ "2000", "0", "0" ], timeComp = dateComp[0]
						.split(':');
			} else { // only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'), timeComp = [ "0", "0" ];
			}
			var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0],
					timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
		return dateArrays;
	}

	function daydiff(first, second) {
		return Math.floor((second - first) / (1000 * 60 * 60 * 24));
	}

	function minLapse(dates) {
		// determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) {
			var distance = daydiff(dates[i - 1], dates[i]);
			dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
	 * How to tell if a DOM element is visible in the current viewport?
	 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	 */

	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while (el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}

		return (top < (window.pageYOffset + window.innerHeight)
				&& left < (window.pageXOffset + window.innerWidth)
				&& (top + height) > window.pageYOffset && (left + width) > window.pageXOffset);
	}

	function checkMQ() {
		// check if mobile or desktop device
		return window.getComputedStyle(
				document.querySelector('.cd-horizontal-timeline'), '::before')
				.getPropertyValue('content').replace(/'/g, "")
				.replace(/"/g, "");
	}

	function changeTimeline() {
		var val = $(this).val();
		if (val == "quarter") {
			var temp = $(".timeline .events-wrapper .events ol");
			temp.html(timeline.quarter);
			timelines = $('.cd-horizontal-timeline');
			eventsMinDistance = 120;
			(timelines.length > 0) && initTimeline(timelines);
			var index = $(
					'.timeline .events-wrapper .events ol li a[class="selected"]')
					.parent().index();
			index = index * (-120);
			setTransformValue($(".timeline .events-wrapper .events")[0],
					'translateX', index + 'px');
			$("#timeline-next").attr("class", "next");
		}
		if (val == "year") {
			var temp = $(".timeline .events-wrapper .events ol");
			temp.html(timeline.year);
			timelines = $('.cd-horizontal-timeline');
			eventsMinDistance = 120;
			(timelines.length > 0) && initTimeline(timelines);
			var index = $(
					'.timeline .events-wrapper .events ol li a[class="selected"]')
					.parent().index();
			index = index * (-120);
			setTransformValue($(".timeline .events-wrapper .events")[0],
					'translateX', index + 'px');
			$("#timeline-next").attr("class", "next");
		}
		if (val == "month") {
			var temp = $(".timeline .events-wrapper .events ol");
			temp.html(timeline.month);
			timelines = $('.cd-horizontal-timeline');
			eventsMinDistance = 120;
			(timelines.length > 0) && initTimeline(timelines);
			var index = $(
					'.timeline .events-wrapper .events ol li a[class="selected"]')
					.parent().index();
			index = index * (-120);
			setTransformValue($(".timeline .events-wrapper .events")[0],
					'translateX', index + 'px');
			$("#timeline-next").attr("class", "next");
		}
	}

	var intervalTime = 5000;
	var canPlay = true;
	// 自动播放定时任务
	myInterval = function() {
		if (canPlay) {// 轮流检测是否可以播放
			canPlay = false;
			var tempindex = playtempli.index() + 1;
			if (tempindex < ollength) { // 不是最后一个元素 执行
				var next = playtempli.next();
				var num = next.find("a").css("left").replace("px", "");
				var wra = $(".timeline .events-wrapper").css("width").replace(
						"px", "");
				var events = $(".timeline .events-wrapper .events").css(
						'transform').split(",")[4];
				if (events == undefined) {
					events = 0;
				}
				var w = parseInt(num) + parseInt(events);
				// 时间轴滚动
				if (parseInt(wra) * 0.8 < w) {
					$("#timeline-next").trigger("click");
				}
				next.find("a").trigger("click");
				playtempli = next;
			} else { // 是最后一个元素 结束任务
				gotostop();
			}
		}
	}
	// 图标切换到运行状态
	function gotowork() {
		clearInterval(interval);
		$("#timeline-play").attr("class", "stop");
		$(".cd-horizontal-timeline").addClass("start");
		$("#timeline-select").addClass("start");
	}
	// 图标切换到停止状态
	function gotostop() {
		clearInterval(interval);
		interval = null;
		$("#timeline-play").attr("class", "start");
		$(".cd-horizontal-timeline").removeClass("start");
		$("#timeline-select").removeClass("start");
		canPlay = true;
	}
	
	stopLunBo = function(){
		gotostop();
	}

	playCompletion = function(time) {
		time = time == undefined || time == null ? intervalTime : time;
		setTimeout(function() {
			canPlay = true;
		}, time);
	}

	// 点击播放执行
	function timelinePlay() {
		var start = function() {
			var ol = $(".timeline .events-wrapper .events ol");
			// 获取ol子元素个数
			ollength = ol.children().length;
			var li = ol.find($("li a.selected")).parent();
			playtempli = li;
			gotowork();
			$("#timeloading").remove();
			myInterval();
			interval = setInterval("myInterval()", 900); // 1秒执行
		};
		if (playmark != null) {
			if (interval == null) {
				$("html")
						.append(
								'<div id="timeloading"><div id="timeloading-center"><div id="timeloading-center-absolute"><div></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div><div class="object"></div></div></div></div>');
				setTimeout(start, 1000);
			} else {
				gotostop();
			}
		}
	}
})(jQuery);