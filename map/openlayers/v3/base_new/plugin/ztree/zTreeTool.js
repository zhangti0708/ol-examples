/**
 * 树形下拉框工具
 * 
 * @author lb19921021
 * 
 * zTreeTool.initChildrens(id, zNodes, multiple, displayName, childrenName,
 * indexName, search, isLeafData, defaultParam, defaultVal)按照标准格式创建树形下拉框 带有搜索功能
 * 
 * zTreeTool.init(id, zNodes, multiple, setting) 按照简单格式创建树形下拉框 没有搜索功能
 */
var zTreeTool = new Object();
/**
 * 监听div大小改变事件
 */
(function($, h, c) {
	var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j
			+ "-special-event", b = "delay", f = "throttleWindow";
	e[b] = 250;
	e[f] = true;
	$.event.special[j] = {
		setup : function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.add(l);
			$.data(this, d, {
				w : l.width(),
				h : l.height()
			});
			if (a.length === 1) {
				g();
			}
		},
		teardown : function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.not(l);
			l.removeData(d);
			if (!a.length) {
				clearTimeout(i);
			}
		},
		add : function(l) {
			if (!e[f] && this[k]) {
				return false;
			}
			var n;
			function m(s, o, p) {
				var q = $(this), r = $.data(this, d);
				r.w = o !== c ? o : q.width();
				r.h = p !== c ? p : q.height();
				n.apply(this, arguments);
			}
			if ($.isFunction(l)) {
				n = l;
				return m;
			} else {
				n = l.handler;
				l.handler = m;
			}
		}
	};
	function g() {
		i = h[k](function() {
			a.each(function() {
				var n = $(this), m = n.width(), l = n.height(), o = $.data(
						this, d);
				if (m !== o.w || l !== o.h) {
					n.trigger(j, [ o.w = m, o.h = l ]);
				}
			});
			g();
		}, e[b]);
	}
})(jQuery, this);

/**
 * zTreeTool方法实现
 */
(function($) {
	zTreeTool.showMenu = function(place) {
		var cityObj = $(place);
		var id = cityObj.attr("id");
		var cityOffset = $(place).offset();
		var hight = $(window).height();
		$("#" + id + "content .treeMenuContentTemp").css({
			"max-height" : hight * 0.4 + "px"
		});
		if (cityOffset.top > 0.5 * hight) {
			var h = $("#" + id).height();
			var a = cityObj.height();
			$("#" + id + "content").css({
				left : cityOffset.left + "px",
				top : cityOffset.top - h - a + 9 + "px"
			}).slideDown("fast");
			resize(id + "content", $(place));
		} else {
			$("#" + id + "content").css({
				left : cityOffset.left + "px",
				top : cityOffset.top + cityObj.outerHeight() + "px"
			}).slideDown("fast");
		}
		$("html").bind("mousedown", zTreeTool.onBodyDown);
	}
	// 缓存绑定监听div大小的id
	var tempResizeId;
	function resize(id, place) {
		$('#' + id).resize(function() {
			tempResizeId = id;
			var cityOffset = place.offset();
			var h = $("#" + id).height();
			var a = place.height();
			$("#" + id).css({
				left : cityOffset.left + "px",
				top : cityOffset.top - h - a + 9 + "px"
			});
		});
	}
	zTreeTool.hideMenu = function() {
		$(".treeMenuContent").fadeOut("fast");
		$("html").unbind("mousedown", zTreeTool.onBodyDown);
	}
	zTreeTool.onBodyDown = function(event) {
		if (!($(event.target).parents(".treeMenuContent").length > 0)) {
			$('#' + tempResizeId).unbind("resize");
			zTreeTool.hideMenu();
		}
	}
	zTreeTool.settingmultiple = {
		check : {
			enable : true,
			nocheckInherit : true
		},
		view : {
			dblClickExpand : false
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			onCheck : zTreeToolOnCheck
		}
	};
	zTreeTool.setting = {
		check : {
			enable : true,
			nocheckInherit : true,
			chkStyle : "radio",
			radioType : "all"
		},
		view : {
			dblClickExpand : false
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			onCheck : zTreeToolOnCheck
		}
	};

	function zTreeToolOnCheck(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj(treeId), nodes = zTree
				.getCheckedNodes(true), v = "", index = "";
		for ( var i = 0, l = nodes.length; i < l; i++) {
			var node = nodes[i];
			var father = node.getParentNode();
			if (father != null) {
				var fathermark = father.getCheckStatus();
				if (fathermark.half == true) {// 父节点不是完全选中
					var mark = node.getCheckStatus();
					if (mark.half == false) {// 是完全选中
						v += node.name + ",";
						index += node[indexName] + ",";
					}
				}
			} else {
				var mark = node.getCheckStatus();
				if (mark.half == false) {// 是完全选中
					v += node.name + ",";
					index += node[indexName] + ",";
				}
			}
		}
		if (v.length > 0) {
			v = v.substring(0, v.length - 1);
		}
		if (index.length > 0) {
			index = index.substring(0, index.length - 1);
		}
		var cityobjid = treeId.replace("tree", "");
		var cityObj = $("#" + cityobjid);
		cityObj.attr("data", index);
		cityObj.attr("value", v);
	}

	// 取消高亮
	function updateNodes(treeObj2, id) {
		if (zTreeTool[id] != undefined) {
			var nodeList1 = zTreeTool[id].tempnodes;
			for ( var i = 0; i < nodeList1.length; i++) {
				nodeList1[i].highlight = false;
				treeObj2.updateNode(nodeList1[i]);
			}
		}
	}
	function search(id, key, value, children, temp) {
		var treeId = id;
		if (value != "") {
			var treeObj = $.fn.zTree.getZTreeObj(treeId);
			// 折叠所有节点
			treeObj.setting.view.expandSpeed = "";
			treeObj.expandAll(false);
			treeObj.setting.view.expandSpeed = "fast";
			// 取消高亮
			updateNodes(treeObj, id);
			//取消选中
			treeObj.cancelSelectedNode();
			var nodeList = treeObj.getNodesByParamFuzzy(key, value);
			if (nodeList && nodeList.length > 0) {
				zTreeTool[id] = new Object();
				zTreeTool[id].tempnodes = [];
				// 搜索结果高亮
				for ( var i = 0; i < nodeList.length; i++) {
					var node = nodeList[i];
					zTreeTool[id].tempnodes.push(node);
					node.highlight = true;
					treeObj.updateNode(node);
					// 展开查询节点
					if (node[children] == null) {
						treeObj.expandNode(node.getParentNode(), true, null,
								null);
						//选中
						treeObj.selectNode(node, true);
					} else {
						treeObj.expandNode(node, true, null, null);
					}
				}
			} else {
				if (temp != null) {
					temp.val("没有查到此内容");
				}
			}
		}
	}
	// 搜索按钮
	zTreeTool.searchButton = function(target, id, key, children) {
		var value = $(target).prev().val();
		search(id, key, value, children, $(target).prev());
	}
	// 按下回车键
	zTreeTool.searchEnterButton = function(_this, id, key, children) {
		search(id, key, _this.val(), children, _this);
	}
	// 默认选中
	function defaultSelected(treeId, parameter, val) {
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		var nodeList = treeObj.getNodesByParam(parameter, val, null);
		for ( var i = 0; i < nodeList.length; i++) {
			var node = nodeList[i];
			treeObj.checkNode(node, true, true, true);
		}
	}
	// 默认打开第一层
	function defaultOpenFirst(treeId) {
		var treeObj = $.fn.zTree.getZTreeObj(treeId);
		var nodes = treeObj.getNodes();
		if (nodes.length < 3) {
			treeObj.expandNode(nodes[0], true, false, false);
		}
	}
	/**
	 * 按照Childrens格式初始化选择菜单
	 * 
	 * @author lb19921021
	 * 
	 * id 输入框id
	 * 
	 * zNodes 数据
	 * 
	 * multiple 是否多选
	 * 
	 * displayName 显示内容的参数名
	 * 
	 * childrenName 子元素的参数名
	 * 
	 * indexName 数值元素的参数名
	 * 
	 * search 是否使用搜索框
	 * 
	 * isLeafData 获取数据时是否获取底层全部元素
	 * 
	 * defaultParam 默认选中的参数名
	 * 
	 * defaultVal 默认选中的参数值
	 */
	zTreeTool.initChildrens = function(id, zNodes, multiple, displayName,
			childrenName, indexName, search, isLeafData, defaultParam,
			defaultVal) {
		var cleardiv = null;
		if (isLeafData != true) {
			isLeafData = false;
		}
		var ibobj = $("#" + id);
		ibobj.attr("readonly", "readonly");
		if (search == true) {
			ibobj.attr("onclick", "zTreeTool.showMenu(this)");
			$("html")
					.append(
							'<div id="'
									+ id
									+ 'content" class="treeMenuContent"><div class="ztoolsearch"><input class="invalid" placeholder="输入内容进行查询" id="'
									+ id
									+ 'search" data="'
									+ id
									+ 'tree"><a onclick="zTreeTool.searchButton(this,\''
									+ id
									+ 'tree\',\''
									+ displayName
									+ '\',\''
									+ childrenName
									+ '\')">&#12288;&#12288;</a></div><div class="treeMenuContentTemp"><ul id="'
									+ id
									+ 'tree" class="ztree" ></ul></div></div>');
			// 绑定回车事件
		} else {
			ibobj.attr("onclick", "zTreeTool.showMenu(this)");
			$("html")
					.append(
							'<div id="'
									+ id
									+ 'content" class="treeMenuContent"><div class="treeMenuContentTemp"><ul id="'
									+ id
									+ 'tree" class="ztree" ></ul></div></div>');
		}
		var check = {
			enable : true,
			nocheckInherit : true,
			chkStyle : "radio",
			radioType : "all"
		};
		if (multiple == true) {
			check = {
				enable : true,
				nocheckInherit : true
			};
		} else {
			isLeafData = false;
		}
		var setting = {
			check : check,
			view : {
				dblClickExpand : false,
				fontCss : function(treeId, treeNode) {
					return (treeNode.highlight) ? {
						color : "#A60000"
					} : {
						color : "#000"
					};
				}
			},
			data : {
				key : {
					children : childrenName,
					name : displayName
				}
			},
			callback : {
				onCheck : function(e, treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj(treeId), nodes = zTree
							.getCheckedNodes(true), v = "", index = "";
					for ( var i = 0, l = nodes.length; i < l; i++) {
						var node = nodes[i];
						var father = node.getParentNode();
						if (father != null) {
							var fathermark = father.getCheckStatus();
							if (fathermark.half == true) {// 父节点不是完全选中
								var mark = node.getCheckStatus();
								if (mark.half == false) {// 自身是完全选中
									v += node[displayName] + ",";
									if (isLeafData == false) {
										index += node[indexName] + ","
									}
								}
							}
						} else {
							var mark = node.getCheckStatus();
							if (mark.half == false) {// 是完全选中
								v += node[displayName] + ",";
								if (isLeafData == false) {
									index += node[indexName] + ","
								}
							}
						}
						if (isLeafData == true && !node.isParent) {
							index += node[indexName] + ","
						}

					}
					if (v.length > 0) {
						v = v.substring(0, v.length - 1);
					}
					if (index.length > 0) {
						index = index.substring(0, index.length - 1);
					}

					var cityobjid = treeId.replace("tree", "");
					var cityObj = $("#" + cityobjid);
					cityObj.attr("data", index);
					cityObj.attr("value", v);
					// 显示清空按钮
					if (v != "") {
						cleardiv.show();
					} else {
						cleardiv.hide();
					}
					// 调用回掉函数
					var callback = zTreeTool.callbackLis[cityobjid];
					if ($.isFunction(callback)) {
						callback(cityObj);
					}
				}
			}
		};
		$.fn.zTree.init($("#" + id + "tree"), setting, zNodes);
		// 绑定回车键
		$("#" + id + "search").keyup(
				function(event) {
					var _this = $(this);
					if (event.keyCode == 13) {
						zTreeTool.searchEnterButton(_this, id + "tree",
								displayName, childrenName);
					}
				});

		// 默认打开第一层
		defaultOpenFirst(id + "tree");
		// 添加清空按钮
		cleardiv = clearAll(id, id + "tree");
		// 默认选中
		if (defaultParam != undefined && defaultParam != null) {
			defaultSelected(id + "tree", defaultParam, defaultVal);
		}
	}
	/**
	 * 清空选择
	 */
	function clearAll(id, treeid) {
		var clear = $('<span class="input-clear" title="清空">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
		var _id = $("#" + id);
		_id.after(clear);
		clear.click(function() {
			clearAllClick(_id, treeid, clear);
		});
		return clear;
	}
	function clearAllClick(_id, treeid, clear) {
		var treeObj = $.fn.zTree.getZTreeObj(treeid);
		// 默认展开树
		treeObj.expandAll(false);
		var nodes = treeObj.getNodes();
		if (nodes.length < 3) {
			treeObj.expandNode(nodes[0], true, false, false);
		}
		// 取消选择
		var nodes = treeObj.getCheckedNodes();
		for ( var i = 0, l = nodes.length; i < l; i++) {
			treeObj.checkNode(nodes[i], false, true, true);
		}
		// 取消高亮
		updateNodes(treeObj, treeid);
	}

	/**
	 * 点击改变后的回掉函数zTreeTool.callback($input) 参数为input对象
	 */
	zTreeTool.callbackLis = {};

	/**
	 * 根据某个输入框的id，初始化此输入框为树形下拉框
	 * 
	 * @param id
	 *            输入框id
	 * @param zNodes
	 *            树形菜单数据
	 * @param multiple
	 *            是否多选
	 * @param setting
	 *            树形菜单配置，null使用默认设置
	 */
	zTreeTool.init = function(id, zNodes, multiple, setting) {
		var ibobj = $("#" + id);
		ibobj.attr("onclick", "zTreeTool.showMenu(this)");
		ibobj.attr("readonly", "readonly");
		$("html")
				.append(
						'<div id="'
								+ id
								+ 'content" class="treeMenuContent"><div class="treeMenuContentTemp"><ul id="'
								+ id + 'tree" class="ztree" ></ul></div></div>');
		if (setting == null) {
			if (multiple == true) {
				setting = zTreeTool.settingmultiple;
			} else {
				setting = zTreeTool.setting;
			}
		}
		$.fn.zTree.init($("#" + id + "tree"), setting, zNodes);
	}
	/**
	 * 根据id获取选中的值
	 */
	zTreeTool.getSelected = function(id, idname) {
		var zTree = $.fn.zTree.getZTreeObj(id + "tree"), nodes = zTree
				.getCheckedNodes(true), v = "";
		for ( var i = 0, l = nodes.length; i < l; i++) {
			var node = nodes[i];
			var father = node.getParentNode();
			if (father != null) {
				var fathermark = father.getCheckStatus();
				if (fathermark.half == true) {// 父节点不是完全选中
					var mark = node.getCheckStatus();
					if (mark.half == false) {// 是完全选中
						v += node[idname] + ",";
					}
				}
			} else {
				var mark = node.getCheckStatus();
				if (mark.half == false) {// 是完全选中
					v += node[idname] + ",";
				}
			}
		}
		if (v.length > 0) {
			v = v.substring(0, v.length - 1);
		}
		return v;
	}
})(jQuery);