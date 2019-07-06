(function(){
	
	var at = null;
	accTree = function(config){
		var t = this;
		at = this;
		t.config = $.extend(true, {
			data:null,			// 数数据
			pid: null,			// 数要绑定的节点
			choiceBox: false,	// 是否支持选择框
			choiceType: 1		// 单多选控制，1单选2多选
		},config);
		t.init();
	}
	
	accTree.prototype.init = function(){
		var t = this;
		appendStyle();
		t.createTree(t.config.data,t.config.pid);
	}
	
	accTree.prototype.createTree = function(data,pid){
		var t = this;
		var id = new Date().getTime() +"_"+(parseInt(Math.random()*10000));
		t.config["id"] = id;
		$(pid).append("<div class='accTree' id='"+id+"'>");
		t.build(t.config.data,"#"+id , "topUl");
		
	}
	
	/**
	 * 创建树
	 * 递归
	 */
	accTree.prototype.build = function(data,pid,topLocalClass){
		var t = this;
		var ul1,li1,child1;
		var $_ul = $("<ul>").addClass("displayNone " + topLocalClass);
		for( var i = 0 , j = data.length; i < j ; i++ ){
			ul1 = data[i];
			child1 = ul1.childrens; 
			li1 = $("<li>");
			var div = $("<div>");
			var i1 = $("<i>").click(expansionContraction)
				.addClass("model_tree_kg " +
					"fa fa-plus-square-o displayNone"); // fa-minus-square-o
			var i2 = null;
			if(t.config.choiceBox){
				// fa-check-square-o
				i2 = $("<i>").addClass("model_tree_xz fa fa-square-o");
				if(1 === t.config.choiceType){
					i2.click(singleElection);
				}else if(2 === t.config.choiceType){
					i2.click(moreElection);
				}
			}
			var span = $("<span>").text(ul1.name);
			$(li1).append($(div).append(i1).append(i2).append(span));
			if(null!==child1&&undefined!==child1&&child1.length>0){
				$(i1).removeClass("displayNone");
				t.build(child1,li1,"");
			}else{
				$(div).addClass("pl");
				$(i1).remove();
			}
			$_ul.append(li1);
		}
		$(pid).append($_ul);
	}
	
	/**
	 * 单选点击事件
	 */
	var singleElection = function(){
		var t = this;
		var handleObj = $($("#"+at.config.id).find(".fa-check-square-o"));
		if($(t).hasClass("fa-check-square-o")){	// 当前为选中情况
			$(t).removeClass("fa-check-square-o").addClass("fa-square-o");
		}else{
			if(null!==handleObj&&undefined!==handleObj&&handleObj.length>0){
				$(handleObj).removeClass("fa-check-square-o")
					.addClass("fa-square-o");
			}
			$(t).removeClass("fa-square-o").addClass("fa-check-square-o");
		}
	}
	
	/**
	 * 多选点击事件
	 */
	var moreElection = function(){
		var t = this;
		var $_li = $(t).parent().parent();
		if($(t).hasClass("fa-check-square-o")){	// 当前为选中情况
			topUpdateClass($(t).parent());
			$($_li.find(".fa-check-square-o"))
				.addClass("fa-square-o").removeClass("fa-check-square-o");
		}else{
			$($_li.find(".fa-square-o"))
				.addClass("fa-check-square-o").removeClass("fa-square-o");
			topUpdateClass2($_li.parent());
		}
	}
	
	/**
	 * 根据规则向上更改class：将此节点的父辈选中取消
	 * 递归
	 */
	var topUpdateClass = function(obj){
		var ho1 = $(obj).parent().parent();
		if(!$(ho1).hasClass("topUl")){
			var ho2 = $($(ho1).prev().children(".fa-check-square-o"));
			if(null!==ho2&&undefined!==ho2&&ho2.length>0){
				$(ho2).removeClass("fa-check-square-o").addClass("fa-square-o");
				topUpdateClass(ho1);
			}
		}
	}
	
	/**
	 * 根据规则向上更改class：将此节点的父辈待选中选中
	 * 递归
	 */
	var topUpdateClass2 = function(obj){
		if(!$(obj).hasClass("topUl")){
			var li = $(obj).children("li");
			var choice = li.children("div").children(".fa-check-square-o");	
			if(li.length === choice.length){
				var ho1 = $(obj).prev().children(".model_tree_xz");
				ho1.removeClass("fa-square-o").addClass("fa-check-square-o");
				topUpdateClass2($(obj).parent().parent());
			}
		}
	}
	
	/**
	 * 树展开收缩点击事件
	 */
	var expansionContraction = function(){
		var t = this;
		if($(t).hasClass("fa-plus-square-o")){ // 当前为收缩情况
			$(t).removeClass("fa-plus-square-o")
				.addClass("fa-minus-square-o");
			$(t).parent().next().removeClass("displayNone");
		}else{
			var handleObj = $($(t).parent().parent().find(".model_tree_kg"));
			$(handleObj).removeClass("fa-minus-square-o")
				.addClass("fa-plus-square-o");
			$($(t).parent().parent().find("ul")).addClass("displayNone");
		}
	}
	
	/**
	 * 添加样式
	 */
	var appendStyle = function(){
		if($("style[accTree-style]").length<=0){$("head").append("<style accTree-style=true>"+style()+"</style>");}
	}
	
	/**
	 * css样式
	 */
	var style = function(){
		return "" +
			"html,body{ margin:0; padding:0; height: 100%; font-size: 14px; }" +
			".accTree{width: 200px;height: 300px;overflow: auto;}" +
			".accTree>ul{display:block !important;}" +
			".accTree ul{list-style: none; padding: 0 13px;}" +
			".accTree ul>li>div{ height: 28px;border-bottom:1px solid rgba(0,0,0,0.1);}" +
			".accTree ul>li>div>*{ float:left; }" +
			".accTree ul>li>div>.model_tree_kg{cursor: pointer;width: 14px;height: 14px;margin: 7px 5px 7px 0;position: relative;}" +
			".accTree ul>li>div>.model_tree_xz{cursor: pointer;width: 14px;height: 14px;margin: 7px 5px 7px 0;position: relative;}" +
			".accTree ul>li>div>span{ cursor:default;height: 100%;line-height: 28px;}" +
			".displayNone{ display:none; }" +
			".pl{padding-left: 19px;}";
	}
	
})(jQuery);