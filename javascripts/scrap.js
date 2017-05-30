var denver = new google.maps.Marker({
		position: new google.maps.LatLng(39.742043, -104.991531),
	 	map: map,
	 	visible: true,
		icon: marker_1,
		title: 'Denver',
	});
  
	var storeDescription = 
		'<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Denver</h1><div id="bodyContent"><p><b>Bold</b> description.</p></div></div>';

        var infowindow = new google.maps.InfoWindow({
        	content: storeDescription
        });	
        denver.addListener('click', function() {
        	infowindow.open(map, denver);
        });
	
	var infowindows = [
		infowindow
	];
		
	map.addListener('click', function(event) {
    		for (var i = 0; i < infowindows.length; i++ ) {
         		infowindows[i].close();
    		}
	});
  
  
  
  		var infowindow = new google.maps.InfoWindow({
        			content: facility[4]
        		});
			marker.addListener('click', function() {
        			infowindow.open(map, marker);
			});
			map.addListener('click', function(event) {
				infowindow.close();
			});
