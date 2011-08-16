/**
 * @fileoverview SCORM 1.2 Javascript API
 * Facilitates communication between SCORM content and an LMS.
 *
 * @author nsweany
 * @version 1.0.0
 */

/**
 * Facilitates communication between SCORM 1.2 content and an LMS.
 * @constructor
 * @param {Object} win	(Optional) An HTML window object where the search for the SCORM API should begin. Defaults to the current window where the Scorm12 object is created
 * @return {Scorm12 | Object}
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
function Scorm12(win){
	if(!(win === null || win === "" || win === undefined)){
		this.findAPI(win);
	}
}

/**
 * Initializes (starts) communication with the LMS
 * (Calls LMSInitialize on the API instance)
 */
Scorm12.prototype.initialize = function(){
	if(this.api === null){
		throw new ScormException(-1, "LMS::Scorm12",
			"The SCORM API is not available.",
			"This SCO might not be running within an LMS environment, or the SCORM API has not been found."
		);
	}
	return this.api.LMSInitialize("");
}

/**
 * Forces a flush of set data to the LMS
 * (Calls LMSCommit on the API instance)
 */
Scorm12.prototype.commit = function(){
	return this.api.LMSCommit("");
}

/**
 * Terminates the SOCRM 1.2 Session with the LMS
 * (Calls LMSFinish on the API instance)
 */
Scorm12.prototype.finish = function(){
	return this.api.LMSFinish("");
}

/**
 * Getter function for any valid SCORM 1.2 name/value pair
 * (calls LMSGetValue on the API instance)
 * @param {Object} prop	Valid SCORM 1.2 property (cmi data)
 */
Scorm12.prototype.get = function(prop){
	return this.api.LMSGetValue(prop.toString());
}

/**
 * Setter method for any valid SCORM 1.2 name/value pair
 * (Calls LMSSetValue on the API instance)
 * @param {Object} prop	Valid SCORM 1.2 property (cmi data)
 * @param {Object} val	Value to set the property to
 */
Scorm12.prototype.set = function(prop, val){
	return this.api.LMSSetValue(prop.toString(), val.toString());
}

/**
 * Returns the error code on the last call made to the SCORM API
 * @return	{String } Number}	error code number
 */
Scorm12.prototype.errorCode = function(){
	return this.api.LMSGetLastError();
}

/**
 * Scans parent frames of a given frame for the SCORM 1.2 API (and object called API)
 *
 * @param {Object} win	Any window object
 */
Scorm12.prototype.findAPI = function(win){
	this.api = this._getAPI(win);
	if(this.api === null){
		throw new ScormException(-1, "LMS::Scorm12",
			"The SCORM API was not found.",
			"This SCO might not be running within an LMS environment."
		);
	}
	return this.api;
}

/**
 * @private
 * scans parent frames of a given frame for the SCORM 1.2 API (and object called API)
 * if the scan fails, the given window object's opener is used.
 *
 * @param {Object} win	Any window object
 */
Scorm12.prototype._getAPI = function(win) {
	try {
		var ret = this._scanParentsForAPI(win);
		return ret ? ret : this._scanParentsForAPI(win.opener);
	} catch(e) {
		return null;
	}
}
/**
 * @private
 * scans parent frames of a given frame for the SCORM 1.2 API (and object called API)
 *
 * @param {Object} win	Any window object
 */
Scorm12.prototype._scanParentsForAPI = function(win) {
	var api;
	do {
		api = win.API;
		if (win.parent == null || win.parent == win) {
			break;
		}
		win = win.parent;
	} while (!api);
	return api;
}
/**
 * Reference to the SCORM API instance
 */
Scorm12.prototype.api = null;




/**
 * A custom exception used for a more useful description of errors in the SCO
 *
 * @constructor
 * @param {Object} code	error code describing the type of error (-1 means no error code)
 * @param {Object} where the location where the error was thrown
 * @param {Object} desc a detailed description of the error
 * @param {Object} diag	a detailed diagnostic description of the error
 */
function ScormException(code, where, desc, diag) {
	this.code  = code; // -1 means no code
	this.where = where;
	this.desc  = desc;
	this.diag  = diag;
}
/**
 * Overrides of the toString() method to output the internal properties of the exception
 */
ScormException.prototype.toString = function() {
	return this.where + ": " + this.desc + ". " + this.diag
	                  + (this.code != -1 ? " (error code " + this.code + ")" : "");
}

