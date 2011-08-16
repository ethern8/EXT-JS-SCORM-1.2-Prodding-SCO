/**
 * 
 */
Ext.ns('elearning');

/**
 * CMI Data elements (supported by OutStart Evolution 2006)
 */
elearning.CMI_DATA_ELEMENTS = [
	"cmi.core.student_id",
	"cmi.core.student_name",
	"cmi.core.lesson_location",
	"cmi.core.credit",
	"cmi.core.lesson_status",
	"cmi.core.entry",
	"cmi.core.score.raw",
	"cmi.core.score.min",
	"cmi.core.score.max",
	"cmi.core.total_time",
	"cmi.core.exit",
	"cmi.core.session_time",
	"cmi.core.launch_data",
	"cmi.core.comments",
	"cmi.core.comments_from_lms",
	"cmi.suspend_data"
];


// NOTE:
// ASSUMES 'sco' object has been loaded for SCORM communication (@see sco_init.js) 
// An alternative is to instantiate the 'sco' object within the Ext.onReady function
// to avoid race conditions and ensure objects are created in the correct order.
// I chose NOT to take this approach so that i more clearly deperate the SCORM instantiation
Ext.onReady(function(){
	
	// shortcut to the elearning console panel
	elearning.console = null;
	
	elearning.InitHandler = function(buttonObj, eventObj){
		
		try{
			var init = sco.initialize();
			elearning.console.log('Initialize:' + init.toString());
		} catch(e){
			elearning.console.log("Error: " + e.toString());
		}
	}
	
	elearning.FindHandler = function(buttonObj, eventObj){
		try {
			var find = sco.findAPI(window);
			elearning.console.log("API found: " + find);
		} catch (e){
			elearning.console.log("Error: " + e.toString());
		}
	}
	
	elearning.FinishHandler = function(buttonObj, eventObj){
		try {
			var fin = sco.finish();
			elearning.console.log('Finish: ' + fin.toString());
		} catch(e){
			elearning.console.log("Error: " + e.toString());
		}
		
	}
	
	elearning.CommitHandler = function(buttonObj, eventObj){
		try{
			var com = sco.commit();
			elearning.console.log('Commit: ' + com.toString());
		} catch(e){
			elearning.console.log("Error: " + e.toString());
		}
		
	}
	
	elearning.ErrorCheckHandler = function(buttonObj, eventObj){
		try{
			var err = sco.errorCheck();
			elearning.console.log('Error Check: ' + err.toString());
		} catch(e){
			elearning.console.log("Error: " + e.toString());
		}
		
	}
	
	elearning.GetterHandler = function(buttonObj, eventObj){
		try{
			var getter_combo = elearning.ScormTester.findById('getter-combo');
			var getter = getter_combo.getValue();	
			elearning.console.log('Getter: ' + getter);
			var value = sco.get(getter);
			elearning.console.log("\t Getter Value: " + value);
			
		} catch(e){
			elearning.console.log("\t Error: " + e.toString());
		}
		
	}
	
	elearning.SetterHandler = function(buttonObj, eventObj){
		try{
			var setter_combo = elearning.ScormTester.findById('setter-combo');
			var setter_value = elearning.ScormTester.findById('setter-value')
			elearning.console.log('Setter: ' + setter_combo.getValue() + ": " + setter_value.getValue());
			var success = sco.set(setter_combo.getValue(), setter_value.getValue());
			elearning.console.log('\t Success: ' + success);
		} catch(e){
			elearning.console.log("\t Error: " + e.toString());
		}
		
	}
	
	elearning.ErrorCheckHandler = function(buttonObj, eventObj){
		try{
			elearning.console.log('Error Code: ' + sco.errorCode());
		} catch(e){
			elearning.console.log("\t Error: " + e.toString());
		}
	}
	
	elearning.ScormTester = new Ext.Viewport({
	    layout: 'border',
		listeners:{
			'afterlayout':{
				fn: function(){
					elearning.console = this.find('region','south')[0];
				}
			}
		},
	    items: [{
	        region: 'north',
	        html: '<h1 class="x-panel-header">SCORM Tester</h1>',
	        autoHeight: true,
	        border: false,
	        margins: '0 0 5 0'
	    }, {
	        region: 'west',
	        collapsible: true,
	        title: 'SCO Session Control',
			split:true,
	        width: 200,
			bodyStyle:{'padding':'5px'},
			items:[{
				xtype:'button',
				text:'Find API',
				handler:elearning.FindHandler,
				iconCls:'findBtn',
				width:100,
				style:{'padding-bottom':'5px'}
			},{
				xtype:'button',
				text:'Initialize',
				handler:elearning.InitHandler,
				iconCls:'initBtn',
				width:100,
				style:{'padding-bottom':'5px'}
			},{
				xtype:'button',
				text:'Commit',
				handler:elearning.CommitHandler,
				iconCls:'commitBtn',
				width:100,
				style:{'padding-bottom':'5px'}
			},{
				xtype:'button',
				text:'Finish',
				handler:elearning.FinishHandler,
				iconCls:'finBtn',
				width:100,
				style:{'padding-bottom':'5px'}
			},{
				xtype:'button',
				text:'Check Error',
				handler:elearning.ErrorCheckHandler,
				iconCls:'errorBtn',
				width:100,
				style:{'padding-bottom':'5px'}
			}]
			// the west region might typically utilize a TreePanel or a Panel with Accordion layout
	
	    }, {
	        region: 'center',
	        title: 'CMI Data Selector',
            xtype:'form',
			bodyStyle:{'padding':'5px'},
			bodyBorder:'false',
			layout:'column',
			split:true,
			items:[{
				xtype:'fieldset',
				columnWidth:0.5,
				title:'Getter',
				height:150,
				style:{'margin-right':'5px'},
				bodyStyle:{'padding':'0 5px'},
				items:[{
					xtype:'combo',
					fieldLabel:'CMI Data',
					triggerAction: 'all', // prevents filtering of the combobox's store
					id:'getter-combo',
					store:elearning.CMI_DATA_ELEMENTS
				}],
				buttons:[{
					xtype:'button',
					text:'Get Value',
					handler:elearning.GetterHandler
				}]
			},{
				xtype:'fieldset',
				columnWidth:0.5,
				title:'Setter',
				height:150,
				bodyStyle:{'padding':'0 5px'},
				items:[{
					xtype:'combo',
					selectOnFocus:false,
					fieldLabel:'CMI Data',
					triggerAction: 'all', // prevents filtering of the combobox's store
					id:'setter-combo',
					store:elearning.CMI_DATA_ELEMENTS
				},{
					xtype:'field',
					id:'setter-value',
					fieldLabel:'Value'
				}],
				buttons:[{
					xtype:'button',
					text:'Set Value',
					handler:elearning.SetterHandler
				}]
			}]
			
	    }, {
	        region: 'south',
			xtype:'consolepanel'
	    }]
	});
	
	
});