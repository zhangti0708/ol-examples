(function(){
	
	var at = null;
	accLayUITable = function(){
		at = this;
	}
	
	// 初始化对象
	accLayUITable.prototype.init = function(param){
		if(null === param || undefined === param)return;
		var t = this;
		for(var key in param){
			t[key] = param[key];
		}
	}
	
	// 创建
	accLayUITable.prototype.build = function(param){
		switch(param.type){
			case "3":{
				create_3(param.data);
				break;
			}
			default:{
				create_1(param.data);
			}
		}
	}
	
	/**
	 * 默认后端传递layui详细参数
	 * param 示例：
	 * 	{
	 * 		data:{}
	 * 		plugin:[]，
	 * 		style:1(预设值，后期可动态管理样式)
	 * 	}
	 * param.data重要参数：
	 * 	@param head	表头
	 * 	@param body 表体
	 * 	@param elem	要创建的位置,在此元素同级创建
	 * 
	 * param.plugin重要参数：
	 * 	@param table 表明要动态的调用layui的table插件
	 * 
	 * 参数详细参考地址：
	 * 	https://www.layui.com/doc/modules/table.html	
	 */
	var create_1 = function(param){
		layui.use(param.plugin, function(){
		  var table = layui.table;
		  table.render(param.data);
		});
		if(null!==param.style){
			// do something...
		}
	}
	
	/**
	 * 简单表格创建
	 */
	var create_2 = function(param){
		
	}
	
	/**
	 * 双表头创建
	 */
	var create_3 = function(param){
		
		var head = param.header;
		var body = param.body;
		var height = param.height ? param.height : 0;
		var limit = param.limit ? param.limit : 20;
		var pId = param.pId ? param.pId : "#test";
		
		var headDataHandle = function(data){
			var result = [];
			var topColumn = data.topColumn;
			var subColumn = data.subColumn;
			var map,rowspan,field;
			for(var i = 0 , j = topColumn.length; i < j ; i++){
				map = topColumn[i];
				rowspan = map.rowspan;
				field = map.field;
				if(null === rowspan || undefined === rowspan){
					map["field"] = "123456789";
				}
				/*if("region" === field){
					map["fixed"] = "right";
				}*/
				map["align"] = "center";
				map["minWidth"] = 120;
			}
			for(var i = 0 , j = subColumn.length; i < j ; i++){
				map = subColumn[i];
				map["align"] = "center";	// 列文本居中
				map["minWidth"] = 120;	// 设置列最小宽度
				map["totalRow"] = true;	// 开起列合计
			}
			topColumn[0]["totalRowText"] = "合计：";		// 合计行文本
			result.push(data.topColumn);
			result.push(data.subColumn);
			return result;
		}
		var handData = headDataHandle(head);
		
		var data = {
			elem:pId
			,data: body
			,cols: handData
			,limit: 20
			,height: height
			,page: true 				// 开启分页
			,totalRow: true 			// 合计行
			,done:function(res,curr,count){	// 生成完table后执行的方法,所有操作table的方法都会执行这个方法
				$(".layui-table").find("td").each(function(index,element){
					// 多表头有bug，处理多出的空白列
					var t = this;
					if("123456789"===$(t).attr("data-field")){
						$(t).addClass("displayNone");
					}
				})
			}
		};
		var plugin = "table";
		
		create_1({'plugin':plugin,'data':data});
		
		
	}
	
})(jQuery);