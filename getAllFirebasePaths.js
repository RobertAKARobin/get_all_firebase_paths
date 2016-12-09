function getAllPaths(parentObject, delim){
	var out = [];
	var path = [];
	delim = (delim || ".");
	getPaths(parentObject);
	return out;

	function getPaths(object){
		var key, val;
		for(key in object){
			val = object[key];
			if(typeof val == "object"){
				path.push(key);
				if(!(object instanceof Array)){
					getPaths(val);
				}
				path.pop();
			}else{
				out.push(path.join(delim) + delim + key);
			}
		}
	}
}

function unique(array){
	var out = [];
	array.forEach(function(item){
		if(!out.includes(item)){
			out.push(item);
		}
	});
	return out;
}

function getAllFirebasePaths(input){
	var paths = getAllPaths(input);
	var rx = {
		key: /\-K[a-zA-Z0-9_-]{18}/g,
		uid: /[a-zA-Z0-9_-]{28}/g
	}
	paths.forEach(function(item, index){
		paths[index] = item
			.replace(rx.key, "$key")
			.replace(rx.uid, "$uid");
	});
	return unique(paths);
}
