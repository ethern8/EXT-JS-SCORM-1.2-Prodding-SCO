/**
 * elearning.ConsolePanel
 * 
 * @author 	nsweany
 * @extends	 Ext.Panel
 */
// create the elearning namespace if it doesn't already exist
Ext.ns('elearning');

elearning.ConsolePanel = Ext.extend(Ext.Panel, {
    log_win:null,
 
    initComponent: function(){
        // Called during component initialization
 		
        // Config object has already been applied to 'this' so properties can 
        // be overriden here or new properties (e.g. items, tools, buttons) 
        // can be added, eg:
        Ext.apply(this, {
            // Prototype Defaults, can be overridden by user's config object
		    title: 'Console',
		    collapsible: true,
			id:'console-log-panel',
		    html: '<ol class="console-log"><li></li></ol>',
		    split: true,
		    height: 200,
		    minHeight: 100,
			autoScroll:true,
			bodyStyle:{'background':'#FFFFFF url("images/console-background.png") repeat-y', 'font':'normal 0.8em "Courier New",Courier,mono'},
			bbar:new Ext.Toolbar({
				items:[{
					text:'Print Console Log',
					handler:this.onPrintPress.createDelegate(this)
				},'-',{
					text:'Clear Console Log',
					handler:this.onClearPress.createDelegate(this)
				}]
			})
        });
 
        // Before parent code
 
        // Call parent (required)
        elearning.ConsolePanel.superclass.initComponent.apply(this, arguments);
 
        // After parent code
        // e.g. install event handlers on rendered component
    },
 
    // Override other inherited methods 
    onRender: function(){
 
        // Before parent code
 
        // Call parent (required)
        elearning.ConsolePanel.superclass.onRender.apply(this, arguments);
 
        // After parent code
 
    },
	
	onPrintPress:function(buttonObj, eventObj){
		try{
			this.printBody();
		} catch(e){
			this.log(e.toString());
		}
	},
	
	onClearPress:function(){
		Ext.DomHelper.overwrite(this.body.first(), {'tag':'ol','class':'console-log','html':'<li></li>'})
	},
	
	log:function(msg){
		this.body.first().last().insertSibling({
			'tag': 'li', 
			'class':'console-log-item', 
			'html':msg
		}).scrollIntoView(this.body);
	}
});
 
// register xtype to allow for lazy initialization
Ext.reg('consolepanel', elearning.ConsolePanel);