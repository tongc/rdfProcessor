chrome.storage.sync.get('tags', function(items) {
    if(items.tags !== undefined) {
    	console.debug(items.tags.length);
        var myRecords = JSON.parse(items.tags);
        var dynatable = $('#triplesTable').dynatable({
          dataset: {
            records: myRecords
          }
        });
	}
  });