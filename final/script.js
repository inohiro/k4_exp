function createXmlHttp(){
    if( window.XMLHttpRequest ) { // Mozilla, Firefox, Safari, IE7
	return new XMLHttpRequest();
    }
    else if ( window.ActiveXObject ) {
	try { // IE5, IE6
            return new ActiveXObject( "Msxml2.XMLHTTP" );
	}
	catch(e) {
            return new ActiveXObject( "Microsoft.XMLHTTP" );
	}
    }
    else {
	return null;
    }
}

function doXMLHttpRequest( url, xslfile, id ){
    // XMLHttpRequest object
    var xmlhttp = createXmlHttp();
    if( xmlhttp == null ) {
	alert( "XMLHttpRequest is not supported." );
    }

    // How to process response data
    xmlhttp.onreadystatechange = handleHttpEvent;

    // Callback function for response data
    function handleHttpEvent(){
	if( xmlhttp.readyState == 4 ) {
            if( xmlhttp.status == 200 ) {
		// for debug
		// just print out obtained XML data in a window.
		// window.alert(xmlhttp.responseText);

		// do xslt transformation and print the result out
		var xsl = document.implementation.createDocument("", "", null);
		xsl.async = false;
		xsl.load(xslfile);

		var xsltp = new XSLTProcessor();
		xsltp.importStylesheet(xsl);

		var newDoc = xsltp.transformToFragment(xmlhttp.responseXML, window.document);

		document.getElementById( id ).innerHTML = ""
		document.getElementById( id ).appendChild(newDoc);
            }
	    else {
		window.alert("Communication error.");
            }
	}
    }

    
    // Process HTTP request
    xmlhttp.open("GET", "/~amagasa/cgi-bin/geturl.cgi?u=" + url , true);
    xmlhttp.send(null);
}

function loadEntries() {
    var hatenaUrl = "http://feeds.feedburner.com/hatena/b/hotentry.rdf"
    doXMLHttpRequest( hatenaUrl, "base.xsl", 'XML' );
}

function loadComments( url ) {
    var bcUrl = "http://b.hatena.ne.jp/entry/rss/" + url;
    doXMLHttpRequest( bcUrl, 'bc.xsl', url );
}

function closeComments( url ) {
    document.activeElement.parentNode.attributes[0].ownerElement.textContent = '';
}

function applySelection( category ) {
    var url = "http://feeds.feedburner.com/hatena/b/hotentry.rdf"

    if( category.value == 'general' ) {
	url = "http://b.hatena.ne.jp/hotentry.rss?mode=general";
    }
    else if( category.value == 'video' ) {
	url = "http://feeds.feedburner.com/hatena/b/video"
    }
    else {
	url = "http://b.hatena.ne.jp/hotentry/" + category.value + ".rss";
    }

    doXMLHttpRequest( url, 'base.xsl', 'XML' );
}

function dump( obj ) {
    var serializer = new XMLSerializer();
    alert( serializer.serializeToString( obj ) );
}

