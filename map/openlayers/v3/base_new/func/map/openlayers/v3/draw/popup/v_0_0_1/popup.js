(function(){
	
	var p = null;
	popup = function(){
		p = this;
	}
	
	// 依赖注入
	popup.prototype.init = function(param){
		if(null === param || undefined === param)return;
		var t = this;
		for(var key in param){
			t[key] = param[key];
		}
		initElement();
	}
	
	// 在地图中初始化弹出框overlay
	var initElement = function(){
		
		var mapDiv = new Date().getTime()+Math.floor(Math.random()*100000)+"";
		//初始化地图弹出框
		var popupId = mapDiv+ "_popup";
		var popcontentId =  mapDiv + "_popup-content";
		var closeId =  mapDiv + "_popup-closer";
		
		var elem1 = $('<div id="'+popupId+'" class="ol-popup">');
		var elem2 = $('<a href="#" id="'+closeId+'" class="ol-popup-closer"></a>');
		var elem3 = $('<div id="'+popcontentId+'"></div>');
		$("body").append(elem1.append(elem2).append(elem3));
		p.topObj = $(elem1);
		p.popObj = $(elem3);
		
		var container = document.getElementById(popupId);
		var overlay = new ol.Overlay({
			element: container,
			positioning : 'bottom-center',
			autoPan: true,
			autoPanAnimation: {
				duration: 250	//当Popup超出地图边界时，为了Popup全部可见，地图移动的速度.
			} ,
			autoPanMargin: 20,
		});
		p.map.addOverlay(overlay);
		p.overlay = overlay;

		var closer = document.getElementById(closeId);
		closer.onclick = function() {
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};
		p.closer = closer;
		
	}
	
	// 创建
	popup.prototype.build = function(param){
		p.clear();
		switch(param.type){
			case "":{ break; }
			default:{ build_1(param) }
		}
	}
	
	// 清除
	popup.prototype.clear = function(param){
		p.popObj.empty();
	}
	
	// 关闭
	popup.prototype.close = function(param){
		p.closer.click();
	}
	
	/**
	 * 添加外部传递的元素
	 */
	var build_1 = function(param){
		p.popObj.append(param.elem);
		p.overlay.setPosition(param.position);
	}
	
})(jQuery);