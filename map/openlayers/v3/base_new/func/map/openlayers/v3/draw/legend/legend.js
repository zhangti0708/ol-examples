(function(){
	
	var l = null;
	legend = function(){
		l = this;
	}
	
	// 依赖注入
	legend.prototype.init = function(param){
		if(null === param || undefined === param)return;
		var t = this;
		for(var key in param){
			t[key] = param[key];
		}
		init_element();
	}
	
	// 初始化页面元素
	var init_element = function(){
		var id = new Date().getTime() + Math.floor(Math.random() *10000);
		$("body").append('<div class="bottomLegendBox_l" id="mapLegend">'
				+ '<ul class="bottomLegend" id="'+id+'"></ul></div>');
		l.ul = $("#"+id);
	}
	
	// 创建
	legend.prototype.build = function(param){
		switch(param.type){
			case "":{
				break;
			}
			default:{
				create_1(param);
			}
		}
	}
	
	// 清除
	legend.prototype.clear = function(){
		l.ul.empty();
	}
	
	/**
	 * 创建一
	 */
	var create_1 = function(data){
		var ary = l.auxiliary;
		// 添加元素
		var li = $('<li class="huntianyi_region_legend">');
		if(null === data.naem || undefined === data.naem) data.naem = "区域";
		var div_1 = $('<div class="legendTitle">').text(data.naem);
		var div_2 = $('<div class="legend">');
		ary.arrForEach(data.data,function(mapPaaram,index){
			var div_3 = $('<div class="legendSelect">')
				.attr({index:index , color:mapPaaram.c , code:data.id , type:data.featuresType});
			var div_4 = $('<div class="legendColor" style="background-color:'+mapPaaram.c+'">');
			var div_5 = $('<div class="legendDescribe">').text(mapPaaram.n);
			div_2.append(div_3.append(div_4).append(div_5));
		})
		li.append(div_1).append(div_2);
		l.ul.append(li);
		// 添加点击事件
		div_2.find(".legendColor").click(function(){
			var t = $(this)
			,pObj = t.parent()
			,key = pObj.attr("code")
			,type = pObj.attr("type")
			,index = pObj.attr("index") * 1
			,vectorCache = l.vectorCache[key]
			,businessCache = l.businessCache[type][key];
			
			if(l.popup)l.popup.close();
			
			if(t.hasClass("none")){ // 表明已经取消显示
				t.removeClass("none");
				var color = pObj.attr("color");
				displayFeature(vectorCache,businessCache,index,{
					borderColor: l.region.borderColor
					,borderWidth:l.region.borderWidth
					,fillColor: color
					,displayType: ""
				},type)
				t.css({"background-color":color});
			}else{
				t.addClass("none");
				displayFeature(vectorCache,businessCache,index,{
					borderColor: "rgba(0,0,0,0)"
					,borderWidth:0
					,fillColor: "rgba(0,0,0,0)"
					,displayType: "none"
				},type)
				t.css({"background-color":"transparent"});
			}
		})
	}
	
	/**
	 * 显示隐藏图层
	 * @vector 图层缓存
	 * @business 业务数据缓存
	 * @index 判断条件
	 * @param 达成条件要换的颜色 和 处理数据
	 */
	var displayFeature = function(vector,business,index,param,type){
		var ary = l.auxiliary
		,features = vector.getSource().getFeatures()
		,code,map,v,legend_index;
		ary.arrForEach(features,function(feature){
			code = feature.get("code");
			map = business[code];
			legend_index = "region"===type ? map.v.legend_index : map.legend_index;
			if(index === legend_index){
				var style = null;
				if("region" === type){
					style = new ol.style.Style({
						stroke : new ol.style.Stroke({
							color : param.borderColor,
							width : param.borderWidth
						}),
						fill : new ol.style.Fill({
							color : param.fillColor
						})
					})
				}
				if("point" === type){
					style = new ol.style.Style({
						image :new ol.style.Circle({
							fill: new ol.style.Fill({
								color: param.fillColor
							}),
							stroke: new ol.style.Stroke({
								color: param.borderColor,	
								width: 1
							}),
							radius:5
						})
					})
				}
				feature.setStyle(style);
				feature.set("displayType",param.displayType);
			}
		});
	}
	
})(jQuery);