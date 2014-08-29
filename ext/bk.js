chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
	chrome.storage.sync.get('tags', function(items) {
  		chrome.storage.sync.set({'tags': request.tags} ,function() {
  		});
    });
	sendResponse({ack: "success"});
  });