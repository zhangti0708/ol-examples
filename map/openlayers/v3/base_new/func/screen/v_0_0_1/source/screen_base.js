/**
 * @tidyUp acc_小方
 * @designPattern 简单工厂
 * @create 20190411左右
 */
$(function(){
	
	baseScreen = function(){}
	
	/**
	 * 创建维度
	 * @param type 创建的类型
	 * @data 数据
	 * @pId 元素的父id
	 * @obj 如果有配置信息，在这上面获取
	 */
	baseScreen.prototype.build = function(type,data,pId,obj){
		switch(type){
			case "0": create_0(data,pId,obj);break;
			case "5": create_5(data,pId,obj);break;
			case "6": create_6(data,pId,obj);break;
			case "31": create_31(data,pId,obj);break;
			case "32": create_32(data,pId,obj);break;
			case "33": create_33(data,pId,obj);break;
			case "51": create_51(data,pId,obj);break;
			case "66": create_66(data,pId,obj);break;
			case "82": create_82(data,pId,obj);break;
			case "83": create_83(data,pId,obj);break;
			case "84": create_84(data,pId,obj);break;
			default:
		}
	}
	
	/**
	 * 获取value
	 */
	baseScreen.prototype.getValue = function(type){
		var result = null;
		switch(type){
			case "0": result = getData_0(data,pId,obj);break;
			case "6": result = getData_6(data,pId,obj);break;
			case "31": result = getData_31(data,pId,obj);break;
			case "32": result = getData_32(data,pId,obj);break;
			case "33": result = getData_33(data,pId,obj);break;
			case "51": result = getData_51(data,pId,obj);break;
			case "66": result = getData_66(data,pId,obj);break;
			case "82": result = getData_82(data,pId,obj);break;
			case "83": result = getData_83(data,pId,obj);break;
			case "84": result = getData_84(data,pId,obj);break;
			default:
		}
		return result;
	}
	
	/**
	 * 类型列表
	 * 当前对象支持的维度创建类型列表
	 * type : type describe
	 */
	baseScreen.prototype.typeList = function(){
		return {
			"0" : "div样式",
			"5" : "日期：年 ， 带结尾日期形成时间范围，但非必须选结尾日期",
			"6" : "自动完成，输入后返回后端查询数据并提供筛选",
			"31" : "日期：年",
			"32" : "日期：月",
			"33" : "日期：年月日",
			"51" : "日期：年月 ， 带结尾日期形成时间范围，但非必须选结尾日期",
			"66" : "select下拉选样式",
			"82" : "数值输入框",
			"83" : "无限制输入框",
			"84" : "数值范围"
		}
	}
	
	/**
	 * 创建维度div样式
	 */
	var create_0 = function( data, parentId , obj ) {
		
		var $_div = $("<div>")
			.attr({
				uuid : data.index_uuid,
				index_name : data.index_name,
				id : parentId.replace("#",""),
				showType : data["show_type"],
				is_must : data.is_must
			})
			.addClass("home-select-type clearfix");
		
		var $_p = $("<p>").addClass("home-select-type-title").text(data.index_name);
		$_div.append( $_p );
		
		if(0 == data["header_show"]){ $_div.addClass("DISPLAYnone");}
		
		for( var i = 0,j = data.childrens.length;i<j;i++ ){
			var param = data.childrens[i];
			var $_span = $("<span>").addClass("home-select-type-item").attr(param).text(param.index_name);
			if(param.target_tip != null && param.target_tip != "" && param.target_tip != ""){
				$_span.attr("title",param.target_tip);
			}
			$( $_div ).append( $_span );
		}
		
		clickFunc_0($_div.children("span"));
		
		$( parentId ).append( $_div );
	}
	
	/**
	 * 维度创建动态点击事件
	 */
	var clickFunc_0 = function( objName ) {
		
		// 维度条件点击事件：高亮指定的维度条件
		var shine = function(obj){
			$(obj).addClass("active");
		}

		// 维度条件点击事件：取消高亮指定的维度条件
		var average = function(obj){
			$(obj).removeClass("active");
		}
		
		$(objName).click(function(){
			
			var all = $(this).attr("is_all");	// 是否支持全选
			var multiple = $(this).attr("is_multiple");	// 单选多选
			var text = $(this).text();	// 按钮文本
			if("0" == multiple ){
				// 单选	: 1 高亮选中  ， 2 取消高亮
				if($(this).attr("class").indexOf("active")==-1){
					shine(this);
					average($(this).siblings());
				}else{
					average(this);
				}
			} else if ("1" == multiple){
				// 多选	：1 维度支持全选 ，2 维度不支持全选
				if( "1" == all ){
					// 支持全部操作
					if("全部" == text){
						// 全部	: 1 全部高亮   2 全部取消高亮
						if($(this).attr("class").indexOf("active")==-1){
							shine($(this).parent().children("span"));
						}else{
							average($(this).parent().children("span"));
						}
					}else{
						// 不是全部	: 1  高亮   2 取消高亮
						if($(this).attr("class").indexOf("active")==-1){
							shine(this);
						}else{
							average(this);
							average($($(this).parent().children()[1]));
						}
					}
				} else if( "0" == all ){
					// 不支持全部操作
					if($(this).attr("class").indexOf("active")==-1){
						shine(this);
					}else{
						average(this);
					}
				}
			}
		})	
	}
	
	/**
	 * 创建维度:日期：年 ， 带结尾日期形成时间范围，但非必须选结尾日期
	 */
	var create_5 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p1 = $("<p>").addClass("home-select-type-title dimensionPClass").text("年");
		var input = "<input type='text' class='demo-input dateInput invalid' placeholder='请选择日期' id='laydate5' readonly>";
		$( parentId ).append( $_div.append($_p1).append(input) );
		laydate.render({
			  elem: '#laydate5'
			  ,type: 'year'
			  ,range: true
			});
	}
	
	/**
	 * 创建维度:搜索维度
	 */
	var create_6 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({ uuid : data.index_uuid, id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix dimensionSearchParentDiv");
		var $_p1 = $("<p>")
			.addClass("home-select-type-title  dimensionPClass")
			.text(data.index_name);
		$_div.append($_p1);
		
		var $_input1 = $("<input>").attr("placeholder","请输入..")
			.addClass("invalid demo-input dateInput")
			.attr({ "status" : "query" , "prevValue" : "" })
			.bind(' input propertychange ',function(){
				getDataForCreate_6( this , data.index_value );
			})
			.blur(function(){
				this.value = "";
				$(this).attr("data","");
				var obj = this;
				setTimeout(function(){
					$(obj).next().addClass("DISPLAYnone");
				},450);
			});
		var $_div2 = $("<div>").addClass("dimensionSearchT6 DISPLAYnone");
		var $_div3 = $("<div>").text("Sixgod");
		$_div.append( $_input1 ).append( $_div2.append( $_div3 ) );
		
		$( parentId ).append( $_div );
	}
	
	/**
	 * 根据输入的内容向后台请求参数
	 * @param author Sixgod
	 * @param obj 执行查询的input对象
	 */
	var getDataForCreate_6 = function( obj , ajaxURL ) {
		var status = $(obj).attr("status");
		// 可以查询状态
		if( "query" === status  ){
			$(obj).attr("status" , "loading");
			var value = $(obj).val().trim();
			if( bool.strBool(value) ){
				$(obj).next().addClass("DISPLAYnone");
				$(obj).attr({status:"query",prevVlaue:""});
			} else {
				setTimeout(function(){
					while( true ){
						var prevValue = $(obj).val().trim();
						getDataForDimension6( obj , ajaxURL );
						value = $(obj).val().trim();
						if( prevValue === value ){
							$(obj).attr("status" , "query");
							break;
						}
					}
				},1200);
			}
		}	
	}
	
	/**
	 * 创建维度:日期：年月
	 */
	var create_31 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p1 = $("<p>").addClass("home-select-type-title dimensionPClass").text("年月");
		var input = "<input type='text' class='demo-input dateInput invalid' placeholder='请选择日期' id='laydate31' readonly>";
		$( parentId ).append( $_div.append($_p1).append(input) );
		laydate.render({
			  elem: '#laydate32'
			  ,type: 'year'
			});
	}
	
	/**
	 * 创建维度:日期：年月
	 */
	var create_32 = function( data , parentId , obj ) {
		var $_div = $("<div>").attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"],
			isDate : '1'
		}).addClass("home-select-type clearfix");
		var $_p1 = $("<p>").addClass("home-select-type-title dimensionPClass").text("年月");
		var input = "<input type='text' class='demo-input dateInput invalid'  placeholder='请选择日期' id='laydate32' readonly>";
		$( parentId ).append( $_div.append($_p1).append(input) );
		laydate.render({
			  elem: '#laydate32'
			  ,type: 'month'
			});
	}
	
	/**
	 * 创建维度:日期：年月日
	 */
	var create_33 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p1 = $("<p>").addClass("home-select-type-title dimensionPClass").text("年月");
		var input = "<input type='text' class='demo-input dateInput invalid' placeholder='请选择日期' id='laydate33' readonly>";
		$( parentId ).append( $_div.append($_p1).append(input) );
		laydate.render({
			  elem: '#laydate33'
			});
	}
	
	/**
	 * 创建维度:日期：年月 ， 带结尾日期形成时间范围，但非必须选结尾日期
	 */
	var create_51 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p1 = $("<p>").addClass("home-select-type-title dimensionPClass").text("年月");
		var input = "<input type='text' class='demo-input dateInput invalid' placeholder='请选择日期' id='laydate51' readonly>";
		$( parentId ).append( $_div.append($_p1).append(input) );
		laydate.render({
			  elem: '#laydate51',
			  type: 'month',
			  btns: ["aWeek", "oneMonth" , "halfYear","clear","confirm"],
			  range: true
		});
	}
	
	/**
	 * 创建维度:select下拉选样式
	 */
	var create_66 = function( data, parentId , obj ) {
		
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p = $("<p>").addClass("home-select-type-title").text(data.index_name);
		$_div.append( $_p );
		
		var $_select1 = $("<select>").addClass("dimensionSelect ");// 
		var $option = $("<option>").attr({"uuid":"-1"}).text("请选择"); // 
		$($_select1).append( $option );
		for( var i = 0,j = data.childrens.length;i<j;i++ ){
			var param = data.childrens[i];
			var $option = $("<option>").addClass("dimensionUl2Span").attr(param).text(param.index_name);// 
			$_select1.append( $option );
		}
		$( $_div ).append( $_select1 );
		$( parentId ).append( $_div );
	}
	
	/**
	 * 创建维度:数值输入框
	 */
	var create_82 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p = $("<p>").addClass("home-select-type-title dimensionPClass").text(data.index_name);
		$_div.append( $_p );
		var $_input = $("<input>")
			.addClass("invalid demo-input dateInput")
			.attr({ "placeholder" : "请输入数值.." })
			.keyup(function(){
				this.value = regHandle(this.value);
			});
		$( $_div ).append( $_input );
		$( parentId ).append( $_div );
	}
	
	/**
	 * 正则处理：数值为正负浮点数
	 */
	var regHandle = function( value ){
		value = value.replace(/[\u4E00-\u9FA5]/g,'')
		.replace(/[a-z]/g,'')
		.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\>|\/|\?]/g,"");
		var length = value.length;
		var lastText = value.substring( length - 1 );
		var subValue = value.substring( 0 , length - 1 );
		if( length !== 1 && "-" === lastText ) value = subValue;
		if( length === 1 && "." === lastText ) value = "";
		if( "." === lastText && subValue.indexOf(".") !== -1 )value = subValue;
		return value;
	}
	
	/**
	 * 创建维度:无限制输入框
	 */
	var create_83 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({
			uuid : data.index_uuid,
			id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p = $("<p>").addClass("home-select-type-title dimensionPClass").text(data.index_name);
		$_div.append( $_p );
		var $_input = $("<input>")
			.addClass("invalid demo-input dateInput")
			.attr({ "placeholder" : "请输入.." });
		$( $_div ).append( $_input );
		$( parentId ).append( $_div );
	}
	
	/**
	 * 创建维度:数值输入框
	 */
	var create_84 = function( data , parentId , obj ) {
		var $_div = $("<div>")
		.attr({ uuid : data.index_uuid, id : parentId,
			showType : data["show_type"]
		}).addClass("home-select-type clearfix");
		var $_p1 = $("<p>").addClass("home-select-type-title  dimensionPClass").text(data.index_name);
		$_div.append($_p1);
		
		var $_input1 = $("<input>").attr("placeholder","请输入..")
			.addClass("invalid demo-input dateInput")
			.keyup(function(){
				this.value = regHandle(this.value);
			});
		var $_span1 = $("<span>").text("-").addClass("dateInput")
			.css({"width":"15px","line-height":"30px"})
		var $_input2 = $("<input>").attr("placeholder","请输入..")
			.addClass("invalid demo-input dateInput")
			.keyup(function(){
				this.value = regHandle(this.value);
			}).blur(function(){
				var prev = $(this).prev().prev();
			    var prevVal = $(prev).val();
			    var popupTitle = $(prev).prev().text();
			    if( parseInt(this.value) < parseInt(prevVal) ){
			    	this.value = "";
			    	$.Pro( popupTitle + " : 范围结尾值 应该比 范围起始值 大" ,{BgColor:"rgba(255, 4, 4, 0.6)",Time:2});
			    }
			});
		
		$_div.append( $_input1 ).append( $_span1 ).append( $_input2 );
		$( parentId ).append( $_div );
	}
	
	/**
	 * 获取dimension的type1类型下showType为0的维度的选择项数据(默认div)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 * @documentAttribute 
	 * 		is_multiple 单选多选(0单选/1多选)
	 * 		is_all		是否带全部按钮(0带/1不带)
	 * 		is_must     必选判断(0不必须/1必须)
	 */
	var getData_0 = function( parentObj ) {
		// 维度数据返回封装 
		var result = new dimensionResult();
		// 维度关联处理(维度隐藏情况不获取值)
		if( $(parentObj).attr("class").indexOf("DISPLAYnone") !== -1)
			return result.success("");
		// 判断该维度是否按照逻辑来执行
		var is_must = $($(parentObj).children("span")[0]).attr("is_must");
		var span = $(parentObj).children(".active");
		if( "1" === is_must && span && 0 === span.length ){
			var title = $($(parentObj).children("p")).text();
			result.error(title + " 维度是必选，请选择！")
			return result;
		}
		var str = "" ,str2 = "";
		if( span && 0 !== span.length ){
			// 抽查其中一个对象查看属性
			var obj = span[0];
			var is_all = $(obj).attr("is_all");
			// 如果有全选按钮，应该从第二个选中项开始获取数据，第一个为全部应该略去
			var index = "0" === is_all ? 0 : "全部" === $(obj).text() ? 1 : 0;
			for( var i = index ,j = span.length; i<j; i++ ){
				var child = span[i];
				// 子维度关联关系处理
				if( $(child).attr("class")
						.indexOf("DISPLAYnone") !== -1)continue;
				var index_uuid_param = $(child).attr("index_uuid");
				str += index_uuid_param + ",";
				str2 += $(child).attr("index_name") + "[" + index_uuid_param + "]" + ",";
			}
			str = str.substring( 0 , str.length-1 );
			str2 = $(parentObj).attr("index_name") + "[" + $(parentObj).attr("uuid") + "]" + "|" + str2.substring( 0 , str2.length-1 );
		}
		result = !bool.strBool(str.trim()) ? 
				result.success(str , str2) : result.success("") ;
		return result; 
	}
	
	/**
	 * 获取dimension的type1类型下showType为6的维度的选择项数据(自动完成)
	 * @param time 2018_4_12 16:30
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_6 = function( parentObj ){
		var result = new dimensionResult();
		var index_uuid = $( parentObj ).attr("uuid");
		var inputs = $( parentObj ).children("input");
		var arr = [] , map = { index_uuid : index_uuid };
		for( var i = 0 , j = inputs.length ; i < j ; i++ ){
			var input = inputs[i];
			arr.push( $(input).val() );
		}
		map["val"] = arr;
		var mapStr = JSON.stringify(map)
		mapStr = "$STG$;" + "$sixgod$" + mapStr + "$STG$";
		result = !bool.strBool(mapStr) ? 
				result.success(mapStr) : result.success("");
		return result;
	}
	

	/**
	 * 获取dimension的type1类型下showType为51的维度的选择项数据(日期选择：年月)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_31 = function( parentObj ) {
		var result = new dimensionResult();
		var uuid = $(parentObj).attr("uuid");
		var inputValue = $($(parentObj).children("input")).val();
		if( bool.strBool(inputValue) )return result.success("");
		inputValue = inputValue.replace("-","").replace(" - ","_").replace("-","");
		result = result.success(uuid+"|"+inputValue+"|");
		return result;
	}
	
	/**
	 * 获取dimension的type1类型下showType为51的维度的选择项数据(日期选择：年月)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_32 = function( parentObj ) {
		var result = new dimensionResult();
		var uuid = $(parentObj).attr("uuid");
		var inputValue = $($(parentObj).children("input")).val();
		if( bool.strBool(inputValue) )return result.success("");
		inputValue = inputValue.replace("-","").replace(" - ","_").replace("-","");
		result = result.success(uuid+"|"+inputValue+"|");
		return result;
	}
	
	/**
	 * 获取dimension的type1类型下showType为51的维度的选择项数据(日期选择：年月)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_33 = function( parentObj ) {
		var result = new dimensionResult();
		var uuid = $(parentObj).attr("uuid");
		var inputValue = $($(parentObj).children("input")).val();
		if( bool.strBool(inputValue) )return result.success("");
		inputValue = inputValue.replace("-","").replace(" - ","_").replace("-","");
		result = result.success(uuid+"|"+inputValue+"|");
		return result;
	}
	
	/**
	 * 获取dimension的type1类型下showType为51的维度的选择项数据(日期选择：年月)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_51 = function( parentObj ) {
		var result = new dimensionResult();
		var uuid = $(parentObj).attr("uuid");
		var inputValue = $($(parentObj).children("input")).val();
		if( bool.strBool(inputValue) )return result.success("");
		inputValue = inputValue.replace("-","").replace(" - ","_").replace("-","");
		result = result.success(uuid+"|"+inputValue+"|");
		return result;
	}
	
	/**
	 * 获取dimension的type1类型下showType为82的维度的选择项数据(数值输入框)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_82 = function(parentObj) {
		var result = new dimensionResult();
		var input = $( parentObj ).children("input");
		var uuid = $(parentObj).attr("uuid");
		var name = $($(parentObj).children("p")).text();
		var value = $(input).val();
		if( bool.strBool(value) ){
			result = result.success("");
		}else{
			result = result.success(uuid+"|"+value , name + "[" + uuid + "]" + "|" + value + "[" + value + "]");
		}
		return result;
	}
	
	/**
	 * 获取dimension的type1类型下showType为83的维度的选择项数据(无限制输入框)
	 * @param time 2018_3_12 10:28
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var  getData_83 = function(parentObj) {
		var result = new dimensionResult();
		var input = $( parentObj ).children("input");
		var uuid = $(parentObj).attr("uuid");
		var name = $($(parentObj).children("p")).text();
		var value = $(input).val();
		if( bool.strBool(value) ){
			result = result.success("");
		}else{
			result = result.success(uuid+"|"+value , name + "[" + uuid + "]" + "|" + value + "[" + value + "]");
		}
		return result;
	}
	
	/**
	 * 获取dimension的type1类型下showType为84的维度的选择项数据(数值范围)
	 * @param time 2018_4_12 16:30
	 * @param author Sixgod
	 * @param parentObj 维度子项容器，从中获取维度子项
	 */
	var getData_84 = function( parentObj ){
		var result = new dimensionResult();
		var index_uuid = $( parentObj ).attr("uuid");
		var inputs = $( parentObj ).children("input");
		var arr = [] , map = { index_uuid : index_uuid };
		for( var i = 0 , j = inputs.length ; i < j ; i++ ){
			var input = inputs[i];
			arr.push( $(input).val() );
		}
		map["val"] = arr;
		var mapStr = JSON.stringify(map)
		mapStr = "$STG$;" + "$sixgod$" + mapStr + "$STG$";
		result = !bool.strBool(mapStr) ? 
				result.success(mapStr) : result.success("");
		return result;
	}
	
});



