(function(){
	
	var dd = null;
	dataDraw = function(){
		dd = this;
	}
	
	// 初始化对象
	dataDraw.prototype.init = function(param){
		if(null === param || undefined === param)return;
		var t = this;
		for(var key in param){
			t[key] = param[key];
		}
	}
	
	// 地图绘画总接口方法
	dataDraw.prototype.draw = function(mapData){
		var drawObj = null , features = null;
		drawObj = "region" === mapData.type ? dd.region : 
			("point" === mapData.type ? dd.point : null);
		if(null!==drawObj){
			switch(mapData.drawType){
				case "":{ break; }
				default:{
					features = drawObj.build(mapData)
				}
			}
		}
		if(null!==features&&undefined!==features){
			this.build({
				features : features.features
				,cache : dd.vectorCache
				,cacheId : features.id
				,isFitBounds : true
			});
		}
		if(mapData.openlegend && dd.legend && null!==features){
			dd.legend.build({
				id: features.id 
				,featuresType: features.type 
				,name: mapData.name
				,data: mapData.legend
			});
		}
	}
	
	// 清除
	dataDraw.prototype.clear = function(){
		if(dd.legend)dd.legend.clear();
		if(dd.region)dd.region.clearAll();
		if(dd.point) dd.point.clearAll();
		if(dd.popup) dd.popup.close();
	}
	
	// 创建
	dataDraw.prototype.build = function(data){
		var vectorSource = new ol.source.Vector({
			features : data.features
		})
		var vector = new ol.layer.Vector({
			source : vectorSource
		});
		if (!data.zIndex)data.zIndex = 5;
		vector.setZIndex(data.zIndex);
		vector.set("layerName", data.cacheId);
		dd.map.addLayer(vector);
		// 视野调整,定位到当前画在地图上的区域
		if (data.isFitBounds)map.getView().fit(vectorSource.getExtent());
		// 设置地图视野范围：全国（5）——》街区（18）
		if (data.zoom)dd.map.getView().setZoom(parseInt(data.zoom));
	}
	
})(jQuery);