(function(){
	
	var bsf = null;
	baseSearchFunc = function(){
		bsf = this;
	}
	
	/**
	 * 确保必要的js对象已经引入
	 */
	baseSearchFunc.prototype.init = function(param){
		var t = this;
		t.auxiliary = param.auxiliary;
		t.eject = param.eject;
	}
	
	/**
	 * 创建事件
	 * param = {type:'',obj:t , ...}
	 */
	baseSearchFunc.prototype.build = function(param){
		if(null!==param.obj&&undefined!==param.obj){
			switch(param.type){
				case "2": func_2(param);break;
				default:
			}
		}else{
			switch(param.type){
				case "0": return func_0; break;
				case "1": return func_1; break;
				case "3": return func_3; break;
				default:
			}
		}
	}
	
	/**
	 * 类型列表
	 * type : type describe
	 */
	baseSearchFunc.prototype.typeList = function(){
		return {
			"0" : "数值输入框输入、光标弹出事件",
			"1" : "div选择框点击事件：单选显示隐藏",
			"2" : "点击页面关闭显示指定模块",
			"3" : "多选点击事件",
		}
	}
	
	/**
	 * 数值输入框输入、光标弹出事件
	 * number类型，支持带小数点
	 */
	var func_0 = function(){
		var t = this , val = $(t).val();
		if(null!==val&&undefined!==val&&val.length>0){
			if(!bsf.auxiliary.checkNumber(val)){
				bsf.eject.prompt("请输入数值类型的");
			}
		}
	}
	
	/**
	 * div选择框点击事件：单选显示隐藏
	 */
	var func_1 = function(){
		var t = this;
		if($(t).hasClass("active")){
			$(t).removeClass("active");
			$(t).text("未选中");
		}else{
			$(t).siblings().removeClass("active");
			$(t).addClass("active");
			$(t).siblings().text("未选中");
			$(t).text("sixgod");
		}
		
	}
	
	/**
	 * 点击页面关闭显示指定模块
	 */
	/**
	 * 用于处理页面点击关闭指定对话框
	 * 主要元素：
	 * 	1.boolDisplayObj ：全局缓存对象（创建在init_data.js中），用于缓存当前要监控的对象
	 * 	2.关闭参数（boolDisplayObj）的参数：
	 * 		{ "boolObj" : $(".topMenuContext") , "handleObj" : this , "status" : 0};
	 * 		boolObj: 要判断的对话框，通过判断点击事件源是否是这个对象子类关闭对话框
	 * 		handleObj：该对象的定义函数对象，从中调用close方法关闭对话框
	 * 		status：必须为0
	 * 		exception：例外，除handleObj外点击这个对象不关闭对话框，包括子类,$("#obj"),数组类型
	 */
	var func_2 = function(param){
		$(param.obj).click(function(){
			if(null!==boolDisplayObj&&undefined!==boolDisplayObj)
				boolDisplayObj.handleObj.close();
			$(param.disObj).prev().find("i")
				.removeClass("fa-chevron-down").addClass("fa-chevron-up")
			$(param.disObj).removeClass("displayNone");
			$(param.disObj).animate({"top":"41px"},230);
			boolDisplayObj = param.data;
		})
	}
	
	/**
	 * 多选点击事件
	 */
	var func_3 = function(){
		var t = $(this);
		if($(t).hasClass("active")){
			$(t).removeClass("active");
		}else{
			$(t).addClass("active");
		}
	}
	
})(jQuery);