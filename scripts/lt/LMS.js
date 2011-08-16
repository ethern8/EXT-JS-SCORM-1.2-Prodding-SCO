/**
 * @fileoverview LMS SCORM Javascript API
 * Facilitates communication between SCORM content and an LMS.
 *
 * @author nsweany
 * @version 1.0.0
 */

/**
 * Facilitates communication between SCORM content and an LMS.
 * @constructor
 * @param {Object} scormBehavior	a Scorm Behavior object that provides the implementation code for communication using a specific version of SCORM
 * @return {LMS | Object}
 * @example
 * // Define the sco object
 * var sco = null;
 * // run this function when the page loads
 * function scoInit(){
 *     try {
 *         sco = new LMS(new Scorm12());
 *         // now initialize the session (optional)
 *         sco.initialize();
 *     } catch(e){
 *         alert(e.toString());
 *     }
 * }
 */
function LMS(scormBehavior){
	this._scormBehavior = scormBehavior;
}

/**
 * Initializes the SCORM session with the LMS
 */
LMS.prototype.initialize = function(){
	return this._scormBehavior.initialize();
}

/**
 * Commits persistent data to the LMS
 */
LMS.prototype.commit = function(){
	return this._scormBehavior.commit();
}

/**
 * Finishes the SCORM session with the LMS
 */
LMS.prototype.finish = function(){
	return this._scormBehavior.finish();
}

/**
 * Getter method for retrieving cmi data from the LMS
 *
 * @param {String} prop	name of the cmi data property to retrieve
 */
LMS.prototype.get = function(prop){
	return this._scormBehavior.get(prop);
}

/**
 * Setter method for sending cmi data to the LMS
 *
 * @param {String} prop	name of the cmi data property to set
 * @param {String || Number} val	value of the cmi data property
 */
LMS.prototype.set = function(prop, val){
	return this._scormBehavior.set(prop, val);
}

/**
 * Retrieves the error code for the last SCORM call made to the LMS
 */
LMS.prototype.errorCode = function(){
	return this._scormBehavior.errorCode();
}

/**
 * Searches and returns the location of the SCORM API within the frameset heirarchy
 *
 * @param {Object} win	HTML window object to use as the starting point for the search
 * @return	{Object}	Reference to the SCORM API
 */
LMS.prototype.findAPI = function(win){
	return this._scormBehavior.findAPI(win);
}

/**
 * @private
 * Internal LMS instance of the SCORM Behavior.
 * Provides the actual implementation for each method
 */
LMS.prototype._scormBehavior = null;