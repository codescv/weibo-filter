function refresh_filter_words(first_argument) {
    $("#filter_words").html("");
    chrome.storage.local.get("filter_words", function(response) {
	    console.log("words: ");
    	var filter_words = response.filter_words;
    	console.log(filter_words);
	    if (filter_words) {
	        for (var i = 0; i < filter_words.length; i++) {
	            var word = filter_words[i];
	            var del_link = $("<a href=\"#\" word=\"" + word +"\">delete</a>");
	            var item = $("<li></li>");
	            del_link.click(function(e) {
		           	var word = $(e.target).attr("word");
		           	return delete_word(word); 
	            });
	            item.append(word + " ");
	            item.append(del_link);
	            
	            $("#filter_words").append(item);
	        }
    	} else {
	    	chrome.storage.local.set({filter_words:[]});
    	}
    })    
}

function delete_word(word) {
	console.log("delete word: " + word);
	chrome.storage.local.get("filter_words", function(response) {
		var filter_words = response.filter_words;
		filter_words = _.without(filter_words, word);
		chrome.storage.local.set({filter_words: filter_words});
		refresh_filter_words();
	});
	
	return false;
}

$("#word_button").click(function() {
    chrome.storage.local.get("filter_words", function(response) {
	    var word = $("#word").val();
	    var filter_words = response.filter_words;
	    filter_words.push(word);
	    filter_words = _.uniq(filter_words);
	    chrome.storage.local.set({filter_words: filter_words});
	    $("#word").val("");
	    refresh_filter_words();
    });
    
});

$(document).ready(function() {
    refresh_filter_words(); 
});