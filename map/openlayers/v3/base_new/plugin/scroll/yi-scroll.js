/*
*name: yi_scroll*
*注：该插件并非滚动条完美的解决方案，仅提供一种滚动条解决方案*
*/


;(function($, window, document,undefined) {

$.fn.yi_scroll = function(options)
{
	var scroll_config={
		"speed":25,
		"isMaxHeight":false,
		"barOffTop":2,
		"barOffBottom":2,
		"barOffRight":2,
		"boxWidth":6,
		"barWidth":6,
		"childPanel":"._panel-box",
		"boxClass":"_scroll_box",
		"barClass":"_scroll_bar",
		"barColor" : "rgba(255,255,255,0.3)",
		"barMDColor" : "rgba(255,255,255,0.3)",
		"boxColor" : "rgba(255,255,255,1)",
		"isBox":false,
		"isBar":false
	}
	
	var opts = $.extend({},scroll_config,options);

	var color = {"box":opts.boxColor,"bar":opts.barColor,"barMD":opts.barMDColor};

	var w = {};
	w.FlagName = "_Prefix";	

	var sMouseWheel = "mousewheel";
	if(!("onmousewheel" in document)){					/*浏览器鼠标滚动事件的简单兼容*/
		sMouseWheel = "DOMMouseScroll";
	}   
	$(document).on(sMouseWheel,function(ev){			/*处理区域滚动与文档默认滚动冲突*/
		if(w.MouseInScroll)
			ev.preventDefault();
	});

	return this.each(function(){

		var elem = $(this) , elChild;

		if(elem.data(w.FlagName))
			return;							/*暂不支持多次实例化*/

		elem.css({"overflow":"hidden"});
		elChild = elem.find(opts.childPanel);
		elChild.css({"position":"absolute","top":"0","width":"100%","left":"0"});

		if(opts.isMaxHeight)
		{
			var sham = $("<div style='position:relative;background:transparent;z-index:-1;height:"+elChild.outerHeight()+"px'></div>");
			sham.appendTo(elem);
		}

		var jqScrollBox = $("<div style='position:absolute;opacity:"+(opts.isBox?1:0)+";width:"+opts.boxWidth+"px;top:"+opts.barOffTop+"px;right:"+opts.barOffRight+"px;bottom:"+opts.barOffBottom+"px;border-radius: 5px;background: "+color.box+";'></div>");
		jqScrollBox.addClass(opts.boxClass);
		var jqScrollBar= $("<div style='position:absolute;opacity:"+(opts.isBar?1:0)+";width:"+opts.barWidth+"px;top:"+opts.barOffTop+"px;right:"+opts.barOffRight+"px;border-radius: 5px;background: "+color.bar+";'></div>");
		jqScrollBar.addClass(opts.barClass);
		jqScrollBox.appendTo(elem);
		jqScrollBar.appendTo(elem);
		
		var iRate = elem.innerHeight()/elChild.outerHeight();	
		var iScrollBoxHeight = jqScrollBox.innerHeight() ;
		var iScrollBarHeight = Math.round(iRate*iScrollBoxHeight);
		if(iRate >= 1){
			jqScrollBox.hide();
			jqScrollBar.css("height",0);
		}
		else
		{
			jqScrollBar.css("height",iScrollBarHeight);
		}	
		var iMinTop = elem.innerHeight() - elChild.outerHeight();
		var sMaxTop = iScrollBoxHeight - iScrollBarHeight + opts.barOffTop;

		elem.on("mouseenter",function(){
			w.MouseInScroll = true;
			jqScrollBar.css({"opacity":1});
			fnContentResize();
		})
		elem.on("mouseleave",function(){			
			if(!opts.isBar)
			jqScrollBar.css({"opacity":0});
			w.MouseInScroll = false;
		});
		elem.on("mouseup",function(){						/*该处代码用于处理滚动区域的内容因鼠标事件发生改变时，及时更新滚动条*/
			jqScrollBar.css({"opacity":1});
			setTimeout(function(){fnContentResize();},200);	   
		})

			
		elem.on(sMouseWheel,function(ev){
			//console.log(ev);
			//ev.preventDefault();			
			ev = ev.originalEvent;
			if(iRate >= 1)
				return;
			if(ev.wheelDelta){
					iWheelDelta = ev.wheelDelta/120;
			}else{
					iWheelDelta = -ev.detail/3;
			}
			iMinTop = elem.innerHeight() - elChild.outerHeight();		
			if(iMinTop>0){
				elChild.css("top",0);
				return;
			}
			var iTop = parseInt(elChild.css("top"));
			var iTop = iTop + opts.speed*iWheelDelta;
			iTop = iTop > 0 ? 0 : iTop;
			iTop = iTop < iMinTop ? iMinTop : iTop;
			elChild.css("top",iTop);
			fnScrollContent(elem,elChild,jqScrollBox,jqScrollBar,opts.barOffTop);
		});

		var isS_B = false ,  doc_py , barTop , conTop;			/*滚动条拖拽*/
		jqScrollBar.on("mousedown",function(ev){
			isS_B = true;
			elem.css({"-moz-user-select": "none","-khtml-user-select": "none","user-select": "none"});
			jqScrollBar.css({"background":color.barMD});
			barTop = parseInt(jqScrollBar.css("top"));
			conTop = parseInt(elChild.css("top"));		
		});
		$(document).on("mousedown",function(ev){
			if(isS_B)
				doc_py = ev.pageY;
		});
		$(document).on("mousemove",function(ev){
			if(isS_B)
			{			
				var rate = ev.pageY - doc_py;			

				var sTop = barTop + rate;
				sTop = sTop < opts.barOffTop ? opts.barOffTop : sTop;
				sTop = sTop > sMaxTop ? sMaxTop : sTop;
				jqScrollBar.css("top",sTop);

				var jqCon_rate = elChild.outerHeight() * (rate/iScrollBoxHeight) * -1;
				var iTop = conTop + jqCon_rate;
				iTop = iTop > 0 ? 0 : iTop;
				iTop = iTop < iMinTop ? iMinTop : iTop;
				elChild.css("top",iTop);		
			}
		});
		$(document).on("mouseup",function(ev){	
			elem.css({"-moz-user-select": "","-khtml-user-select": "","user-select": ""});
			jqScrollBar.css({"background":color.bar});
			isS_B = false;	
		});	


		elChild.bind('DOMNodeInserted', function(e) {			/*容器内元素添加*/
			setTimeout(function(){fnContentResize();},100);
		});
		elChild.bind('DOMNodeRemoved', function(e) {		    /*容器内元素移除*/
			setTimeout(function(){fnContentResize();},100);		
		});
		function fnContentResize()								/*容器内元素变动更新滚动*/
		{
			if(opts.isMaxHeight)
			{
				sham.css({"height":elChild.outerHeight()+"px"});
			}
			iRate = elem.innerHeight()/elChild.outerHeight();
			if(iRate >= 1){
				jqScrollBox.hide();
				jqScrollBar.css("height",0);
				elChild.css("top",0);	
				return;
			}	
			jqScrollBox.show();
			iScrollBoxHeight = jqScrollBox.outerHeight();
			iScrollBarHeight = Math.round(iRate*iScrollBoxHeight);
			jqScrollBar.css("height",iScrollBarHeight);
			iMinTop = elem.innerHeight() - elChild.outerHeight();
			sMaxTop = iScrollBoxHeight - iScrollBarHeight ;
			var nowConTop = parseInt(elChild.css("top"));		
			fnScrollContent(elem,elChild,jqScrollBox,jqScrollBar,0,0);	
			if(nowConTop<iMinTop)
			{
				elChild.css("top",iMinTop);	
				jqScrollBar.css("top",sMaxTop);
			}		
		}

		elem.data(w.FlagName,true); 
	});
	
	function fnScrollContent(jqWrapper,jqContent,jqFollowWrapper,jqFlollowContent,iOffset){
		var rate = parseInt(jqContent.css("top"))/(jqContent.outerHeight()-jqWrapper.innerHeight())//卷起的比率
		var iTop = (jqFlollowContent.outerHeight()-jqFollowWrapper.innerHeight())*rate + iOffset;
		jqFlollowContent.css("top",iTop);
	}	
	
}

})(jQuery, window, document);

