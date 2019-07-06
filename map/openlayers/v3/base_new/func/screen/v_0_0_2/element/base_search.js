/**
 * 元素的默认创建
 * @author acc_小方
 * @designPattern 简单工厂
 * @create 20190415
 */
(function(){
	
	var ce = null;
	createElement = function(){
		ce = this;
	}
	
	/**
	 * 添加必须的初始化对象
	 */
	createElement.prototype.init = function(param){
		var t = this;
		t.auxiliary = param.auxiliary;
	}
	
	/**
	 * 创建维度并返回
	 * param = {
	 * 		business : {}，	// 业务数据
	 * 		attribute ： {},	// 元素属性数据
	 * 		plugin:{}	// 插件数据
	 * }
	 */
	createElement.prototype.build = function(param){
		var result = null;
		switch(param.business.type){
			case "0": result = create_0(param);break;
			case "1": result = create_1(param);break;
			case "2": result = create_2(param);break;
			case "3": result = create_3(param);break;
			case "4": result = create_4(param);break;
			case "5": result = create_5(param);break;
			case "6": result = create_6(param);break;
			default:
		}
		return result;
	}
	
	/**
	 * 嵌套结构创建
	 * 	主要属性有：
	 * 		param.business.next 同层下一个元素
	 * 		param.business.nextLevel 下一层元素
	 *  缺陷：
	 *  	能提供简单的运用，在复杂结构下数据结构会显得很冗余
	 *  	提高维护的难度
	 */
	createElement.prototype.moreBuild = function(param){
		var t = this,
		obj = t.build(param),
		next = param.business.next,
		nextLevel = param.business.nextLevel;
		if(!t.auxiliary.mapBool(next)){
			next.business["pId"] = param.business.pId;
			t.moreBuild(next);
		}
		if(!t.auxiliary.mapBool(nextLevel)){
			nextLevel.business["pId"] = obj;
			t.moreBuild(nextLevel);
		}
	}
	
	/**
	 * 类型列表
	 * 当前对象支持的维度创建类型列表
	 * type : type describe
	 */
	createElement.prototype.typeList = function(){
		return {
			"0" : "输入框",
			"1" : "时间选择框",
			"2" : "下拉选",
			"3" : "div 按钮 维度选择框",
			"4" : "创建div并返回该对象",
			"5" : "创建span并返回该对象",
			"6" : "div标签栏：可以向前或向后添加div元素",
		}
	}
	
	/**
	 * 输入框
	 */
	var create_0 = function(param){
		var p = param.business ,  a = param.attribute;
		var $_input = $("<input/>").attr(a);
		if(p.propertychange)$_input.on('input propertychange',p.propertychange);// 输入
		if(p.blur)$_input.blur(p.blur);// 光标离开
		if(p.click)$_input.blur(p.click);
		$(p.pId).append($_input);
		return $_input;
	}
	
	/**
	 * 时间选择框
	 * param.plugin怎么传参参考:https://www.layui.com/laydate/
	 */
	var create_1 = function(param){
		create_0(param);
		laydate.render(param.plugin);
	}
	
	/**
	 * 下拉选
	 */
	var create_2 = function(param){
		var p = param.business ,  a = param.attribute , data = p.data;
		if(null === data || undefined === data || data.length === 0)return
		var $_select = $("<select>").attr(a);
		var paramMap = null;
		for(var i = 0 , j = data.length ; i < j ; i++){
			paramMap = data[i];
			$_select.append($("<option>").attr(paramMap).text(paramMap.name));
		}
		$(p.pId).append($_select);
		return $_select;
	}
	
	/**
	 * div 按钮 维度选择框
	 */
	var create_3 = function(param){
		var p = param.business,
		div = create_4(param);
		param["business"]["pId"] = div;
		create_5(param);
		if(p.click)$(div.children("span")).click(p.click);
		return div;
	}

	/**
	 * 创建div并返回该对象
	 */
	var create_4 = function(param){
		var p = param.business,
		a = param.attribute,
		bool = ce.auxiliary,
		pId = $(p.pId);
		var div = $("<div>").attr(a).text(a.name);
		if(!bool.arrBool(pId))pId.append(div);
		return div;
	}
	
	/**
	 * 创建span并返回该对象
	 */
	var create_5 = function(param){
		var p = param.business,
		bool = ce.auxiliary;
		if(bool.mapBool(p))return null;
		var data = p.data, 
		pId = $(p.pId),
		span,
		result = [];
		for(var i = 0 , j = data.length ; i < j ; i++){
			paramMap = data[i];
			span = $("<span>").attr(paramMap).text(paramMap.name);
			result.push(span);
			pId.append(span);
		}
		return result;
	}
	
	/**
	 * div标签栏：可以向前或向后添加div元素
	 */
	var create_6 = function(param){
		var div = create_4(param);
		var next = param.business.next;
		var nextLevel = param.business.nextLevel;
		if(!ce.auxiliary.mapBool(next)){
			next.business["pId"] = param.business.pId;
			create_6(next);
		}else if(!ce.auxiliary.mapBool(nextLevel)){
			nextLevel.business["pId"] = div;
			create_6(nextLevel);
		}
	}
	
})(jQuery);