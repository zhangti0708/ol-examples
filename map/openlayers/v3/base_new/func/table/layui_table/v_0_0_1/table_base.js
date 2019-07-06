
(function(){
	baseTable = function(){};
	/**
	 * 创建维度
	 * @param type 创建的类型
	 * @data 数据
	 * @pId 元素的父id(必须是#id)
	 * @obj 如果有配置信息，在这上面获取
	 */
	baseTable.prototype.build = function(type,data,pId,obj){
		switch(type){
			case "0": create_0(data,pId,obj);break;
			case "1": create_1(data,pId,obj);break;
			default:
		}
	};
	
	
	
	/**
	 * 类型列表
	 * 当前对象支持的维度创建类型列表
	 * type : type describe
	 */
	baseTable.prototype.typeList = function(){
		return {
			"0" : "默认样式",
			"1" : "创建真分页"
		}
	};
	
	/**
	 * 创建单表头的默认样式样式
	 * 
	 * data数据格式
	 * {"tableHaed":[{field: 'id', title: 'ID'},{field: 'username', title: '用户名'}]
	    ,"tableBody":[{id:0,username:user1}]
	    }
	 */
	var create_0 = function( data, parentId , obj ) {
		var tableHead = data.tableHead;
		var tableBody = data.tableBody;
		var limit = data.tableBody.length;//显示全部条数,若不配置,默认显示10条，
		var pId = parentId;
		var render = {elem:pId,limit:limit,data:tableBody,cols:[tableHead]};
		
		layui.use('table', function(){
			  var table = layui.table;
			  table.render(render);
			});
	};
	/**
	 * 创建单表头的真分页样式
	 * 
	 * data数据格式
	 * {"tableHaed":[{field: 'id', title: 'ID'},{field: 'username', title: '用户名'}]
	    ,"tableBody":[{id:0,username:user1}]
	    }
	 */
	var create_1 = function( data, parentId , obj ) {
		var tableHead = data.tableHead;//表头数据
		var tableBody = data.tableBody;
		var limit = data.limit;//后台传值，每页显示几条
		var count = data.count;//一共多少条数据
		var pId = parentId;
		var render = {elem:pId,data:tableBody,limit:limit,cols:[tableHead]};
		$(pId).parent().append("<div id='page'></div>");
		layui.use(['table','laypage'], function(){
			  var table = layui.table;
			  var laypage = layui.laypage;
			  table.render(render);
			  laypage.render({
				  elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
				  ,limit:limit //后台传值
				  ,count: count //数据总数，从服务端得到
				  ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
			      ,jump: function(obj,first){//回调函数
			    	  var pageCurr = obj.curr //当前显示页
			    	  var pageCount = obj.count //共显示多少页
			    	  if(!first){//第一次不执行
			    		  //回调处理，表格重载
			    	  }
			      }
			  });
			  
			});
	};
	
	

})(jQuery);;