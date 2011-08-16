/**
 * Adds an event handler to the onLoad event that initializes the SCORM communication
 * 
 * @author nsweany
 */
if (window.addEventListener){
	window.addEventListener('load', scoInit, false); 
} else if (window.attachEvent){
	window.attachEvent('onload', scoInit);
}
/** Define the sco object */ 
var sco = null;
/**
 * Initializes the sco object on page load
 */
function scoInit(){
	try {
		sco = new LMS(new Scorm12());
	} catch(e){
		alert(e.toString());
	}
}