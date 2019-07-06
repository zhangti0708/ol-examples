/**
 * 筛选器 
 * 用于协调管理不同源中对筛选功能业务化的支持
 ****
 * 所有用此筛选器的源需要支持该筛选器的原生方法中调用源的方法
 ****
 * @author 李超
 * @modifier acc_小方
 * @designPattern 适配器模式
 * @create 20190411左右
 */
$(function(){
	
	/**
	 * 所有原生方法应当用t = this来调用，
	 * 因为前端的变量查找机制是从内向外扩散，
	 * 最顶层才能找到this
	 * 
	 * @param param 初始化信息
	 * 		需要提供如下内容：
	 * 			源、父id等等，可以自添加一些额外信息
	 * @param source源,json对象 { "base" ： base }
	 * @param pid 元素添加的父类
	 * @param typeContent 支持的类型 { "base" : [type..] } 
	 */
	var selectTemplate = null ;
	screeningFactory = function(param){
		var t = this;
		selectTemplate = t;
		t.source = null;
		t.pid = null;
		t.paramSource = null;
		t.init(param);
		t.typeContent = getTypeContent(t.source);
	}
	
	/**
	 * 初始化方法
	 * 用于处理
	 */
	screeningFactory.prototype.init = function(param){
		var t = this;
		t.source = param.source;
		t.pid = param.pid;
		t.paramSource = param;
	}
	
	/**
	 * 创建维度
	 */
	screeningFactory.prototype.build = function(data){
		var t = this , typeSource = null , id = t.pid;
		$('#'+t.pid).empty();
		for( var i = 0 ,j = data.length;i<j;i++ ){
			var param = data[i].childrens;
			for( var a = 0 , b = param.length; a < b; a++ ){
				var dimensionData = param[a];
				var showType = dimensionData["show_type"];
				typeSource = t.getSource(showType);
				if(null!=typeSource && undefined !== typeSource){
					typeSource.build(dimensionData,"#"+id , obj);
				}else{
					// console.log("维度创建失败")
				}
			}
		}
	}
	
	/**
	 * 获取创建类型中对应的值
	 */
	screeningFactory.prototype.getValue = function(){
		
	}
	
	/**
	 * 根据类型获取源
	 * @return source
	 */
	screeningFactory.prototype.getSource = function(type){
		var t = this,source = null,typeMap = t.typeContent;
		for(var key in typeMap){
			var typeList = typeMap[key];
			if(typeList != null && typeList != undefined){
				for(var i=0;i<typeList.length;i++){
					if(type == typeList[i]){
						return t.source[key];
					}
				}
			}
		}
		return source;
	}
	
	/**
	 * 获取源下的类型，并封装起来
	 * 为后期查找源提供依据
	 * @return {
	 * 		"sourceName" : [type..]
	 * }
	 */
	var getTypeContent = function(source){
		var result = null;
		if(null!==source&&undefined!==source){
			result = {};
			var paramMap = null,typeArr = [];
			for(var key in source){
				paramMap = source[key].typeList();
				$.each(json, function(paramKey) {
					typeArr.push(paramKey);
				});
				result[key] = typeArr;
			}
		}
		return result;
	}
	
});



