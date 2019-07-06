/**
 * OM openlayers Map
 * 地图画点对象
 */
(function(){
	
	var r = null;
	point = function(){
		r = this;
		r.queryId = [];// 所有查询的数据id，方便清除
	}
	
	// 初始化对象
	point.prototype.init = function(param){
		if(null === param || undefined === param)return;
		var t = this;
		for(var key in param){
			t[key] = param[key];
		}
	}
	
	point.prototype.build = function(param){
		var t = this , data = null;
		switch(param.handleType){
			case "":{ break; }
			default :{ data = t.drawPoint(param); }
		}
		return data;
	}
	
	/**
	 * 清除所有图层相关数据
	 */
	point.prototype.clearAll = function(){
		var arr = r.queryId,t = this;
		for(var i = 0 , j = arr.length; i < j ; i++){
			t.clear(arr[i]);
		}
	}
	
	/**
	 * 清除某一个图层相关数据
	 * 这一步还可以优化，当有多个randomId时候遍历多次
	 */
	point.prototype.clear = function(randomId){
		// 清除缓存的业务数据
		var businessCache =  r.businessCache;
		var businessData = businessCache["point"][randomId];
		if(null!=businessData&&undefined!==businessData){
			businessCache["point"][randomId] = null;
		}
		// 根据id从图层中删除
		var vector = this.getVector(randomId);
		if(null!=vector&&undefined!==vector){
			vector.getSource().clear();
			r.map.removeLayer(vector);
			vector = null;
		}
	}
	
	/**
	 * 获取矢量图层
	 */
	point.prototype.getVector = function(randomId){
		var ary = r.auxiliary ,
		layers = r.map.getLayers().getArray();
		ary.arrForEach(layers,function(layer){
			var layerName = layer.get("layerName");
			if(randomId!==layerName)return false;
			r.map.removeLayer(layer);
			return true;
		})
	}
	
	/**
	 * 后端传递的点数据
	 */
	point.prototype.drawPoint = function(data){
		var ary = r.auxiliary
		,cache = r.businessCache.point
		,features = []
		,random = new Date().getTime()+Math.floor(Math.random()*100000)+""
		,result = null
		,cacheParam = {};
		ary.arrForEach(data.datas,function(mapParam,index){
			var position = createPoint(mapParam.longitude*1 , mapParam.latitude*1);
			var point = new ol.Feature({
				code: mapParam.code,
				geometry : new ol.geom.Point(position),
				population : 4000,
				rainfall : 500,
			});
			var color = data.legend[mapParam.legend_index].c;
			point.setStyle(new ol.style.Style({
				image :new ol.style.Circle({
					fill: new ol.style.Fill({
						color: color
					}),
					stroke: new ol.style.Stroke({
						color: "#e5e5e5",	
						width: 1
					}),
					radius: mapParam.radius ?	mapParam.radius : 5	
				}),
				zIndex: 5
			}));
			point.set("code",mapParam["poi_id"]);
			point.set("drawType","point");
			point.set("dataId", random);
			features.push(point);
			mapParam["fillColor"] = color;
			cacheParam[mapParam["poi_id"]+""] = mapParam;
		})
		if(features.length>0){
			result = {id:random,type:"point",'features':features};
			r.queryId.push(random);
			cache[random] = cacheParam;
		}
		return result;
	}
	
	// 将经纬度转换成openlayers默认坐标系
	function createPoint(lon , lat){
		return ol.proj.fromLonLat([lon , lat]);
	}
	
})(jQuery);