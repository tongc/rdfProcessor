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

console.info($('[typeof]:not([typeof] [typeof])'));

console.info($( ".h-product" ).parent().html());

    $(body).find("[typeof]").each(function() {
              var request = $.ajax({
                url: "http://any23.org/any23/json/",
                type: "POST",
                data: $(this).parent().html(),
                contentType:  "text/html"
              });

              request.done(function( msg ) {
                console.info(msg);
              });
    });

