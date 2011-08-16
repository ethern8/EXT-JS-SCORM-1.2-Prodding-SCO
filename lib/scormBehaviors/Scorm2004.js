function Scorm2004(win){
	this.api = this._getAPI(win);
}

Scorm2004.prototype.initialize = function(){
	
}

Scorm2004.prototype.commit = function(){
	
}

Scorm2004.prototype.initialize = function(){
	
}

Scorm2004.prototype.get = function(){
	
}

Scorm2004.prototype.set = function(){
	
}

Scorm2004.prototype._getAPI = function(win) {
	try {
		var ret = this._scanParentsForAPI(win);
		return ret ? ret : this._scanParentsForAPI(win.opener);
	} catch(e) {
		return null;
	}
}

Scorm2004.prototype._scanParentsForAPI = function(win) {
	var api;
	do {
		api = win.API_1484_11;
		if (win.parent == null || win.parent == win) {
			break;
		}
		win = win.parent;
	} while (!api);
	return api;
}

Scorm2004.prototype.api = null;