(function(){
	
	/**
	 * 滚动条
	 */
	echartsDataZoom = function(){}
	
	echartsDataZoom.prototype.build = function(param){
		var result = null;
		switch(param.type){
			case "1" : break;
			default  : result = create_1();
		}
		return result;
	}
	
	/**
	 * 参数详情参考
	 * https://blog.csdn.net/alice9999999/article/details/78027726
	 */
	var create_1 = function(param){
		return [{  
	             type: 'slider',	//图表下方的伸缩条
	             show : true,  		//是否显示
	             realtime : true,  	//
	             start : 0,  		//伸缩条开始位置（1-100），可以随时更改
	             end : 10,  		//伸缩条结束位置（1-100），可以随时更改 
	             bottom:25,                            //组件离容器下侧的距离,'20%'
		}]
	}
	
})(jQuery);

(function(){
	
	/**
	 * y轴展示内容调整
	 */
	echartsYAxis = function(){}
	
	echartsYAxis.prototype.build = function(param){
		var result = null;
		switch(param.type){
			case "1" : break;
			default  : result = create_1(param.arr);
		}
		return result;
	}
	
	var create_1 = function(param){
		var result = [];
		for(var i = 0 , j = param.length; i < j ; i++){
			var mergeData = $.extend(true, {
				type : 'value'
			},param[i]);
			result.push(mergeData);
		}
		return result;
	}
	
})(jQuery);

(function(){
	
	/**
	 * x轴展示内容调整
	 */
	echartsXAxis = function(){}
	
	echartsXAxis.prototype.build = function(param){
		var result = null;
		switch(param.type){
			case "1" : break;
			default  : result = create_1(param.arr);
		}
		return result;
	}
	
	var create_1 = function(param){
		var result = [];
		for(var i = 0 , j = param.length; i < j ; i++){
			var mergeData = $.extend(true, {
				type : 'category',
	            data : null,
	            axisTick: {
	                alignWithLabel: true
	            }
			},param[i]);
			result.push(mergeData);
		}
		return result;
	}
	
})(jQuery);

(function(){
	
	/**
	 * echarts整个画布显示位置调整
	 * 参考博客：
	 * https://blog.csdn.net/qq_30264689/article/details/80911974
	 */
	echartsGrid = function(){}
	
	echartsGrid.prototype.build = function(param){
		var result = null;
		switch(param.type){
			case "2" : result = create_2(param);break;
			default  : result = create_1(param);
		}
		return result;
	}
	
	var create_1 = function(param){
		return $.extend(true, {
			left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
		},param);
	}
	
	var create_2 = function(param){
		return $.extend(true, {
			x: 0,
	        y: 0,
	        x2: 0,
	        y3: 0
		},param);
	}
	
})(jQuery);

(function(){
	
	echartsSeries = function(){}
	
	echartsSeries.prototype.build = function(param){
		var result = null;
		switch(param.type){
			case "2" : result = create_2(param);break;
			default  : result = create_1(param);
		}
		return result;
	}
	
	/**
	 * 创建串联
	 * param是arr,主要用于饼图相关的图例
	 */
	var create_1 = function(param){
		var result = [];
		for(var i = 0 , j = param.series.length; i < j ; i++){
			var mergeData = $.extend(true, {
				name: null,
	            type: 'pie',
	            radius : '50%',
	            center: ['50%', '50%'],
	            data:null,
	            label:{
                    align: 'left',
                    normal:{
                        formatter(v) {
                            let text = Math.round(v.percent)+'%' + '' + v.name
                            if(text.length <= 8)
                            {
                                return text;
                            }else if(text.length > 8 && text.length <= 16){
                                return text = text.slice(0,8)+"\n"+text.slice(8)
                            }else if(text.length > 16 && text.length <= 24){
                                return text = text.slice(0,8)+"\n"+text.slice(8,16)+"\n"+text.slice(16)
                            }else if(text.length > 24 && text.length <= 30){
                                return text = text.slice(0,8)+"\n"+text.slice(8,16)+"\n"+text.slice(16,24)+"\n"+text.slice(24)
                            }else if(text.length > 30){
                                return text = text.slice(0,8)+"\n"+text.slice(8,16)+"\n"+text.slice(16,24)+"\n"+text.slice(24,32)+"\n"+text.slice(32)
                            }
                        },
                        textStyle : {
                            fontSize : 12
                        }
                    }
                }
			},param.series[i]);
			result.push(mergeData);
		}
		return result;
	}
	
	/**
	 * 创建串联
	 * param是arr,主要用于柱状图相关的图例
	 */
	var create_2 = function(param){
		var result = [];
		for(var i = 0 , j = param.series.length; i < j ; i++){
			var mergeData = $.extend(true, {
				name: null,
	            type:'bar',
	            barWidth: '60%',
	            data:null
			},param.series[i]);
			result.push(mergeData);
		}
		return result;
	}
	
})(jQuery);

(function(){
	
	/**
	 * 工具展示
	 */
	echartsTooltip = function(){}
	
	echartsTooltip.prototype.build = function(param){
		var result = null;
		switch(param.type){
			case "1" : break;
			default  : result = create_1(param);
		}
		return result;
	}
	
	/**
	 * 创建工具提示，这种是从pie图上拔下来的
	 */
	var create_1 = function(param){
		return $.extend(true, {
			trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
		},param);
	}
	
})(jQuery);

(function(){
	
	/**
	 * Echarts 图例对象
	 */
	echartsLegend = function(){}
	
	echartsLegend.prototype.build = function(param){
		var result = null;
		if(!param.type)param["type"] = "default";
		var type = JSON.parse(JSON.stringify(param["type"]));
		delete param["type"];
		switch(type){
			case "2" : result = create_2(param);break;
			default  : result = create_1(param);
		}
		return result;
	}
	
	/**
	 * 图例靠右居中展示
	 */
	var create_1 = function(param){
		return $.extend(true, {
			type: 'scroll',
			orient: 'vertical',
	        right: 10,
	        top: 'center',
	        data: null
		},param);
	}
	
	/**
	 * 图例在下方居中
	 */
	var create_2 = function(param){
		return $.extend(true, {
			type: 'scroll',
	        botton: 10,
	        data: null
		},param);
	}
	
})(jQuery);

(function(){
	
	var efactory = null;
	echarts_factory = function(){
		efactory = this;
		efactory.cache = {};
		efactory.init();
	}
	
	/**
	 * 初始化对象
	 */
	echarts_factory.prototype.init = function(){
		var t = this;
		t.legend = new echartsLegend();
		t.tooltip = new echartsTooltip();
		t.series = new echartsSeries();
		t.grid = new echartsGrid();
		t.xAxis = new echartsXAxis();
		t.yAxis = new echartsYAxis(); 
		t.dataZoom = new echartsDataZoom();
	} 
	
	/**
	 * 创建
	 * @param [{ pId:"",business:{tooltip:{type:1}} }]
	 */
	echarts_factory.prototype.build = function(param){
		var t = this;
		for(var i = 0 , j = param.length;i<j ; i++){
			var param_i = param[i];
			var pId = param_i["pId"];
			var option = t.getOption(param_i["business"]);
			t.createEchart(pId,option);
		}
	}
	
	/**
	 * 获取创建选项
	 */
	echarts_factory.prototype.getOption = function(param){
		var t = this,obj,result = {};
		for(var key in param){
			obj = t[key];
			result[key] = obj.build(param[key]);
		}
		return result;
	}
	
	/**
	 * 创建Echarts
	 */
	echarts_factory.prototype.createEchart = function(pId,option){
		var t = this , myChart = t.cache[pId];
		if(null!==myChart&&undefined!==myChart){
			myChart.setOption(option,true);
		}else{
			myChart = echarts.init(document.getElementById(pId)); 
			myChart.setOption(option);
			t.cache[pId] = myChart;
		}
	}
	
	/**
	 * 刷新
	 */
	echarts_factory.prototype.resize = function(){
		var cache = efactory.cache;
		var chart = null;
		for(var key in cache){
			chart = cache[key];
			chart.resize();
		}
	}
	
})(jQuery);