function do_filter() {
    chrome.storage.local.get("filter_words" , function(result) {
    	var filter_words = result.filter_words;
    	var f = document.getElementsByClassName("WB_feed_type");
    	for (var i = 0; i < f.length; i++) {
    	    var text = $(f[i]).text();
    	    for (var j = 0; j < filter_words.length; j++) {
    	        var pattern = filter_words[j];
    	        if (text.match(pattern)) {
    		        console.log("hide: "+ pattern);
    	            $(f[i]).hide();
    	        }
    	    }
            
    	}
    });
}

setTimeout(do_filter, 3000);