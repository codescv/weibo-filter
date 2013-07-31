var feeds = $('.WB_feed_type');
chrome.storage.local.get("filter_words" , function(result) {
	var filter_words = result.filter_words;
	for (var i = 0; i < feeds.length; i++) {
	    var text = feeds[i].innerHTML;
	    for (var j = 0; j < filter_words.length; j++) {
	        var pattern = filter_words[j];
	        if (text.match(pattern)) {
		        console.log("hide: "+ pattern);
	            $(feeds[i]).hide();
	        }
	    }
	}
});