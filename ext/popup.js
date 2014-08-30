$(function() {
    $("#tabs").tabs();
});

chrome.storage.sync.get('RDFa', function(items) {
    if (items.RDFa !== undefined) {
        var myRecords = JSON.parse(items.RDFa);
        console.info("Received ");
        console.info(myRecords);
        if (myRecords != undefined) {
            var dynatable = $('#triplesTableRDFa').dynatable({
                dataset: {
                    records: myRecords.tags
                }
            });
        }
    }
});


chrome.storage.sync.get('Microdata', function(items) {
    if (items.Microdata !== undefined) {
        var myRecords = JSON.parse(items.Microdata);
        console.info("Received ");
        console.info(myRecords);

        if (myRecords != undefined) {
            var dynatable = $('#triplesTableMicrodata').dynatable({
                dataset: {
                    records: myRecords.tags
                }
            });
        }
    }
});


chrome.storage.sync.get('Microformats', function(items) {
    if (items.Microformats !== undefined) {
        var myRecords = JSON.parse(items.Microformats);
        console.info("Received ");
        console.info(myRecords);

        if (myRecords != undefined) {
            var dynatable = $('#triplesTableMicroformats').dynatable({
                dataset: {
                    records: myRecords.tags
                }
            });
        }
    }
});