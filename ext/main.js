var results = new Object();

function sendToChrome() {
  console.info(results);
  chrome.extension.sendMessage({tags: JSON.stringify(results)},
  function(response) {
  })
}

var mfAttributes = new Array();
var currentType = undefined;
function isArray(obj) {
    if( Object.prototype.toString.call( obj ) === '[object Array]' ) {
        return true;
    } else {
        return false;
    }
}
function traverse(jsonObj) {
    if( typeof jsonObj == "object" ) {
        $.each(jsonObj, function(k,v) {
            if(k == "type") {
                if(isArray(v)) {
                    currentType = v[0];
                } else {
                    currentType = v;
                }
            }
            if(k == "properties") {
                if(currentType != undefined) {
                    for(var i=0;i<Object.keys(v).length;i++) {
                        var mfObject = new Object();
                        var key = Object.keys(v)[i];
                        mfObject.type = key;
                        if(isArray(v[key])) {
                            mfObject.value = v[key][0];
                        } else {
                            mfObject.value = v[key];
                        }
                        mfObject.namespace = currentType;
                        mfAttributes.push(mfObject);
                    }
                }
                mfObject = new Object();
            } else {
                traverse(v);
            }
        });
    }
}

function processMicroformats(elements) {
    var options = {
        'node': elements
    }
    traverse(microformats.getItems( options ));
    results["Microformats"] = new Object();
    results["Microformats"].tags = mfAttributes;
}

var getTriples = function(elements, annotationType) {
    if(annotationType == "Microformats") {
        processMicroformats(elements);
    } else {
        elements.each(function() {
          $.ajax({
            url: "http://any23.org/any23/json/",
            type: "POST",
            data: $(this).parent().html(),
            contentType:  "text/html",
            async: false,
            success: function( msg ) {
               saveResults(JSON.stringify(msg));
            },
            error: function(request, status, error) {
                saveResults(request.responseText);
            }
          });
        });
    }

    function saveResults(message) {
      var tags = processResult(JSON.parse(message.replace(/(\r\n|\n|\r)/gm,"")).quads);
      if(results[annotationType] == undefined) {
        results[annotationType] = new Object();
      }
      if(results[annotationType].tags == undefined) {
        results[annotationType].tags = tags;
      } else {
        results[annotationType].tags.concat(tags);
      }
    }

      function processResult(objArray) {
        var newArray = new Array();
        for(var i=0;i<objArray.length;i++) {
          var object = objArray[i][2];
          delete object["lang"];
          delete object["datatype"];
          object.namespace = objArray[i][1];
          newArray.push(object);
        }
        return newArray;
      }

};

getTriples($('[typeof]:not([typeof] [typeof])'), "RDFa");
getTriples($('[itemtype]:not([itemtype] [itemtype])'), "Microdata");
getTriples($('body')[0], "Microformats");

sendToChrome();
