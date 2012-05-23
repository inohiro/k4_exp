function transform( xmlFile, xslFile, resultNodeID ) {
    var xml, xslt, newDoc;
    
    xml = document.implementation.createDocument( "", "", null );
    xslt = document.implementation.createDocument( "", "", null );
    
    xml.async = false;
    xslt.async = false;
    xml.load( xmlFile );
    xslt.load( xslFile );
    
    var xsltp = new XSLTProcessor();
    xsltp.importStylesheet( xslt );
    newDoc = xsltp.transformToFragment( xml, window.document );
    document.getElementById( 'XML' ).innerHTML = "";
    document.getElementById( 'XML' ).appendChild( newDoc );
}

function add( xmlFile, xslFile, target ) {
    var categoryValue = document.addForm.category.value;
    var idValue = document.addForm.id.value;
    var titleValue = document.addForm.title.value;
    var descriptionValue = document.addForm.description.value;
    var coverageValue = document.addForm.coverage.value;
    var dateValue = document.addForm.date.value;
    var commentValue = document.addForm.comment.value;
    var timeValue = document.addForm.time.value;

    var xml = document.implementation.createDocument( "", "", null );
    xml.async = false;
    xml.load( xmlFile );

    var root = xml.documentElement;

    var schedules = root.getElementsByTagName( 'schedule' );
    if( schedules ) {
	var newFlg = true;
	for( var i = 0; i < schedules.length; i++ ) {
            if( schedules.item( i ).getAttribute( 'id' ) == idValue ) {
		alert( "// Update Process" );
		var schedule = schedules.item( i );
		
		schedule.setAttribute( "id", idValue );
		schedule.setAttribute( "category", categoryValue );
		
		var nodes = new Array( 'dc:title', 'dc:description', 'dc:coverage', 'dc:date', 'time', 'comment' );
		var nodeValues = new Array( titleValue, descriptionValue, coverageValue, dateValue, timeValue, commentValue );
		
		for( var i = 0; i < nodes.length; i++ ) {
		    var node = nodes[i];
		    var nodeValue = nodeValues[i];
		    
		    if( node ) { // Update
 			if( schedule.getElementsByTagName( node ) ) {
			    dump( schedule.getElementsByTagName( node ).item( 0 ) );
			    schedule.getElementsByTagName( node ).item( 0 ).removeChild( 0 );
			    dump( schedule.getElementsByTagName( node ).item( 0 ) );
			    //	        schedule.removeChild( schedule.getElementsByTagName( node ).item( 0 ) );
			    var tmpNode = xml.createTextNode( nodeValue );
			    schedule.getElementsByTagName( node ).item( 0 ).appendChild( tmpNode );
			}
		    }
		}
		
		newFlg = false;
		break;
	    }
	}
	if( newFlg ) {
	    var result = createNew( xml, idValue, categoryValue, titleValue, descriptionValue, timeValue, coverageValue, commentValue );
	    xml = result;
	}
    }
    
    var xslt = document.implementation.createDocument("", "", null);
    xslt.async = false;
    xslt.load( xslFile );
    
    var xsltp = new XSLTProcessor();
    xsltp.importStylesheet( xslt );

    var newDoc = xsltp.transformToFragment( xml, window.document );
    console.log( xml );
    console.log( newDoc );
    document.getElementById( target ).innerHTML = "";
    document.getElementById( target ).appendChild( newDoc );    
  }

// キーとバリューによる更新
// ノードタイプによる更新の振り分け

function createNew( xml, idValue, categoryValue, titleValue, descriptionValue, timeValue, coverageValue, commentValue ) {

    var newSchedule = xml.createElement( "schedule" );    
    var metadata = xml.createElement( "metadata" );
    
    var title = xml.createElement( "dc:title" );
    var tTitle = xml.createTextNode( titleValue );
    
    var date = xml.createElement( "dc:date" );
    var tDate = xml.createTextNode( "2010-04-23T03:39:21" );
    
    var description = xml.createElement( "dc:description" );
    var tDescription = xml.createTextNode( descriptionValue );
    
    var time = xml.createElement( "time" );
    var tTime = xml.createTextNode( timeValue );
    
    var coverage = xml.createElement( "dc:coverage" );
    var tCoverage = xml.createTextNode( coverageValue );
    
    var comment = xml.createElement( "comment" );
    var tComment = xml.createTextNode( commentValue );
    
    title.appendChild( tTitle );
    date.appendChild( tDate );
    description.appendChild( tDescription );
    time.appendChild( tTime );
    coverage.appendChild( tCoverage );  
    comment.appendChild( tComment );

    metadata.appendChild( title );
    metadata.appendChild( date );
    metadata.appendChild( description );
    metadata.appendChild( time );
    metadata.appendChild( coverage );

    console.log( metadata );

    newSchedule.appendChild( comment );
    newSchedule.appendChild( metadata );

    newSchedule.setAttribute( "id", idValue );
    //    newSchedule.setAttribute( "category", categoryValue );
    newSchedule.setAttribute( "category", "Private" );

    console.log( newSchedule );
    xml.documentElement.appendChild( newSchedule );

    return xml;
}

function alertHoge() {
    alert( "dump tmpXml" );
    console.log( tmpXml );
}

var tmpXml = "";

function remove( xmlFile, xslFile, target ) {
    var id = document.removeForm.id.value;
    
    if( id.match( /[A-Za-z\s.-]+/ ) ) {
	alert( "IDは半角数字で入力してください" );
    }
    else {
	var xml, xslt, newDoc;
	
	xml = document.implementation.createDocument( "", "", null );
	xml.async = false;
	xml.load( xmlFile );
	
	var root = xml.documentElement;
	var schedules = xml.documentElement.getElementsByTagName( 'schedule' );
	
	if( schedules ) {
            for( var i = 0; i < schedules.length; i++ ) {
		var tmpSchedule = schedules.item( i );
		
		if( tmpSchedule.getAttribute( 'id' ) == id ) { 

		    // remove schedule
		    root.removeChild( schedules.item( id - 1 ) );
		    alert( "削除しました" );
		    
		    xslt = document.implementation.createDocument("", "", null);
		    xslt.async = false;
		    xslt.load( xslFile );
		    
		    var xsltp = new XSLTProcessor();
		    xsltp.importStylesheet(xslt);
		    newDoc = xsltp.transformToFragment(xml, window.document);
		    document.getElementById( target ).innerHTML = "";
		    document.getElementById( target ).appendChild(newDoc);
		    break;
		}
            }
	}
	else {
            alert( "該当する予定が見つかりませんでした" );
	}
    }
}

function dump( obj ) {
    var serializer = new XMLSerializer();
    alert( serializer.serializeToString( obj ) );
}

function say( str ) {
    alert( str );
}

