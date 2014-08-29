chrome.storage.sync.get('tags', function(items) {
    if(items.tags !== undefined) {
    	console.debug(items.tags.length);
    	if(items.tags.length==0) {
    		$('#RDFa').append("No records");
    	}

        var myRecords = JSON.parse(items.tags);
        $('#triplesTable').dynatable({
          dataset: {
            records: myRecords.quads
          }
        });

  		for (var i = 0; i < items.tags.length; i++) {
    		$('#RDFa').append(items.tags[i]);
    	}
	}
  });