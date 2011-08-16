Ext.ns('elearning');

var dumpLog = null;

Ext.onReady(function(){
	console.log(window.opener.elearning.console.getLog());
	Ext.getBody().insertFirst(window.opener.elearning.console.getLog());
	/*
	dumpLog = function(msg){
		var target = Ext.get('contents');
		console.log(msg);
		Ext.getBody().insertFirst(msg);
	}
	*/
});
