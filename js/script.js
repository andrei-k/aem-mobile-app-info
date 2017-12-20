$(function() {
	app.init();
});

var app = {
	init: function() {
		document.addEventListener("deviceready", app.onDeviceReady, false);
	},

	// Now safe to use device APIs
	onDeviceReady: function() {
		if (cq.mobile.user.isAuthenticated) {
			$(".container").append("<p><strong>cq.mobile.user.authToken:</strong> " + cq.mobile.user.authToken + "</p>");
			$(".container").append("<hr>");
		}

		$(".container").append("<p><pre><strong>cq.mobile:</strong> " + syntaxHighlight(JSON.stringify(cq.mobile, null, 4)) + "</pre></p>");
		$(".container").append("<hr>");
		
		var plugins = cordova.require("cordova/plugin_list").metadata;
		$(".container").append("<p><pre><strong>plugins:</strong> " + syntaxHighlight(JSON.stringify(plugins, null, 4)) + "</pre></p>");
	}
};


function syntaxHighlight(json) {
	json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = "number";
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = "key";
			} else {
				cls = "string";
			}
		} else if (/true|false/.test(match)) {
			cls = "boolean";
		} else if (/null/.test(match)) {
			cls = "null";
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}