(function() {

	var dm = null;
	drawModify = function() {
		dm = this;
		var id = new Date().getTime() + Math.floor(Math.random() * 10000);
		dm.config = {
			'id': id
			,'type': ['Point','LineString','Polygon','Circle']
			,'regionFileColor': 'rgba(255, 255, 255, 0.2)'
			,'regionStrokeColor': '#ffcc33'
			,'regionStrokeWidth': 2
			,'pointFileColor': 'rgba(255, 255, 255, 0.2)'
			,'pointStrokeColor': '#ffcc33'
			,'pointStrokeWidth': 1
			,"pointRadius": 7
		};
	}

	// 依赖注入
	drawModify.prototype.init = function(param) {
		if (null === param || undefined === param)return;
		dm.config = $.extend(true,dm.config,param);
		init_element();
		init_plugIn(param.plugIn);
	}
	
	// 删除
	drawModify.prototype.remove = function(param) {
		var vector = dm.vector;
		if(null!=vector&&undefined!==vector){
			vector.getSource().clear();
			dm.config.map.removeLayer(vector);
			dm.vector = null;
			if(dm.snap){
				dm.config.map.removeInteraction(dm.snap)
				dm.snap = null;
			};
		}
	}
	
	// 删除图层中画的内容
	drawModify.prototype.removeDrawContent = function(param) {
		var vector = dm.vector;
		if(null!=vector&&undefined!==vector){
			vector.getSource().clear();
		}
	}
	
	// 关闭
	drawModify.prototype.close = function(param) {
		if(dm.draw){
			dm.config.map.removeInteraction(dm.draw)
			dm.draw = null;
		};
	}
	
	// 打开功能
	drawModify.prototype.open = function(param) {
		dm.draw = new ol.interaction.Draw({
			source: dm.source,
			type: param.drawType
        });
        dm.config.map.addInteraction(dm.draw);
        // draw end 画完以后要做的事情
        // 这里的事件可以写成动态的，这里暂时写死
        dm.draw.on('drawend', function(evt) {
        	var func = param.func;
        	func(evt);
		})
	}
	
	// feature边界磁力
	drawModify.prototype.snap = function() {
	    dm.snap = new ol.interaction.Snap({source: dm.source});
	    dm.config.map.addInteraction(dm.snap);
	}

	// 初始化图层
	var init_element = function() {
		var features = new ol.Collection();
		var source = new ol.source.Vector({features: features});
		var vector = new ol.layer.Vector({
			source : source,
			style : new ol.style.Style({
				fill : new ol.style.Fill({
					color : dm.config.regionFileColor
				}),
				stroke : new ol.style.Stroke({
					color : dm.config.regionStrokeColor,
					width : dm.config.regionStrokeWidth
				}),
				image : new ol.style.Circle({
					radius : dm.config.pointRadius,
					fill : new ol.style.Fill({
						color : dm.config.pointFileColor
					}),
					stroke : new ol.style.Stroke({
						color : dm.config.pointStrokeColor,
						width : dm.config.pointStrokeWidth
					})
				})
			}),
			zIndex : 4
		});
		vector.set('id',dm.config.id);
		dm.config.map.addLayer(vector);
	    dm.source = source;
	    dm.vector = vector;
	    dm.modify = new ol.interaction.Modify({
	        features: features,
	        deleteCondition: function(event) {
	          return ol.events.condition.shiftKeyOnly(event) &&
	              ol.events.condition.singleClick(event);
	        }
	      });
	    dm.config.map.addInteraction(dm.modify);
	}
	
	// 初始化插件
	var init_plugIn = function(paramArr){
		if(null === paramArr || undefined === paramArr)return;
		for(var i = 0 , j = paramArr.length ; i < j; i++){
			var strParam = paramArr[i];
			var func = dm[strParam];
			if(null !== func)func();
		}
	}
	
	

})(jQuery);