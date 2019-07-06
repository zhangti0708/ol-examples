/**
 * 生成表格模板
 */

(function(){
	tableTemplate = function(param,source){
		var t = this;
		t.pid = param.pid;
		if(t.pid == ""|| t.pid == null|| t.pid == undefined){
			t.pid = "#dataTable";
		}

		t.init(param,source);
	};
	tableTemplate.prototype.init = function(param,source){
		var t = this;
		t.data = param;
		t.source = source;
	};
	tableTemplate.prototype.build = function(){
		var t = this;
		var type = t.data.type;
		var tableData = t.data.tableData;
		t.source.build(type,tableData,t.pid,t);
	}

})(jQuery);

