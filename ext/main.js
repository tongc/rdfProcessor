var getTriples = function(elements) {
    var tags = document.getElementsByTagName("*");
    var RDFaPageAttributes = ["typeof", "about", "prefix", "vocab", "resource", "property", "inlist", "datatype"];
    //var MicroformatsPageAttributes = ["rel", "rev", "class"];
    var MicroDataPageAttributes = ["itemscope", "itemtype", "itemid", "itemprop", "itemref"];

    for ( var i = 0; i < tags.length; i++) {
        var attributes = tags[i].attributes;
        for ( var j = 0; j < attributes.length; j++) {
            if (RDFaPageAttributes.indexOf(attributes[j].name) != -1) {
                console.info("This is a RDFa web page " + tags[i].tagName);
            }

    //		if (MicroformatsPageAttributes.indexOf(attributes[j].name) != -1) {
    //		    console.info("This is a Microformats web page " + tags[i].tagName);
    //		}
    //		if (MicroDataPageAttributes.indexOf(attributes[j].name) != -1) {
    //			console.info("This is a Microdata web page " + tags[i].tagName);
    //		}
        }
    }

    elements.each(function() {
    console.info($(this).parent().html());
      $.ajax({
        url: "http://any23.org/any23/json/",
        type: "POST",
        data: $(this).parent().html(),
        contentType:  "text/html",
        async: false,
        success: function( msg ) {
           chrome.extension.sendMessage({tags: JSON.stringify(processResult(msg.quads))},
           function(response) {
           })
        },
        error: function(request, status, error) {
        console.info(request.responseText.quads);
            chrome.extension.sendMessage({tags: JSON.stringify(processResult(JSON.parse(request.responseText.replace(/(\r\n|\n|\r)/gm,"")).quads))},
            function(response) {
            })
        }
      });

      function processResult(objArray) {
        var newArray = new Array();
        for(var i=0;i<objArray.length;i++) {
          var object = objArray[i][2];
          delete object["lang"];
          delete object["datatype"];
          newArray.push(object);
        }
        return newArray;
      };
    });
};

getTriples($('[typeof]:not([typeof] [typeof])'));
getTriples($('[itemtype]:not([itemtype] [itemtype])'));