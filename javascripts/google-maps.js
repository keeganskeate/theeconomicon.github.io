jQuery(document).ready(function($){
	// Style of the map
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;
	var style= [ 
		{
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    	{
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
	        	featureType: 'road.highway',
	       		elementType: 'labels',
	        	stylers: [
	            		{visibility: "off"}
	        	]
	    	}, 
		{ 	
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		// Style Elements
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ visibility: "off" }, 
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ visibility: "off" }, 
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ visibility: "off" }, 
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}
	];
//-----------------------------------------------------------------------------------------------------------------------------------------------------
// Map Setup
	var map_options = {
		center: new google.maps.LatLng(39.00, -105.547222),
		zoom: 8,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: style,
    	}
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
// Custom Zoom
	function CustomZoomControl(controlDiv, map) {
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  	    controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}
	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
//-----------------------------------------------------------------------------------------------------------------------------------------------------
// Markers
	// Custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_1 = ( is_internetExplorer11 ) ? '../images/cd-icon-location.png' : '../images/cd-icon-location.svg';
	
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
		[infowindow]
	];
		
	map.addListener('click', function(event) {
    		for (var i = 0; i < infowindows.length; i++ ) {
         		infowindows[i].close();
    		}
	});
	
	var facilities = [
		['1-11 LLC', 40.741895, -73.989308, 1, '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Business</h1><div id="bodyContent"><p><b>Bold Label</b></p><p>Description.</p></div></div>'],
        	['136 DENVER DEVELOPER LLC', 39.9442113, -104.97830210000001, 2, '<div id="content"><div id="siteNotice"></div><h1 id="firstHeading" class="firstHeading">Business</h1><div id="bodyContent"><p><b>Bold Label</b></p><p>Description.</p></div></div>']
	];
	
	function setMarkers(map) {
		for (var i = 0; i < facilities.length; i++) {
			var facility = facilities[i];
			var marker = new google.maps.Marker({
				position: {lat: facility[1], lng: facility[2]},
				map: map,
				icon: marker_1,
				title: facility[0],
				zIndex: facility[3]
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
        	}
      	}
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------
});
