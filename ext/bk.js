chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.sync.get('tags', function(items) {
            chrome.storage.sync.clear();
            chrome.storage.sync.set({
                'Microformats': JSON.stringify(JSON.parse(request.tags).Microformats)
            }, function() {});
            chrome.storage.sync.set({
                'Microdata': JSON.stringify(JSON.parse(request.tags).Microdata)
            }, function() {});
            chrome.storage.sync.set({
                'RDFa': JSON.stringify(JSON.parse(request.tags).RDFa)
            }, function() {});
        });
        sendResponse({
            ack: "success"
        });
    });