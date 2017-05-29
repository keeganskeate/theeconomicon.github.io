jQuery(document).ready(function($){
	// Google maps parameters
	var	
		map_center_latitude = 39.5501,
		map_center_longitude = -105.7821,
		latitude = 39.742043,
		longitude = -104.991531,
		map_zoom = 10;

	// Custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_1 = ( is_internetExplorer11 ) ? '../images/cd-icon-location.png' : '../images/cd-icon-location.svg';
		
	// Basic color for map, and saturation and brightness
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;

	// Style of the map
	var style= [ 
		{
		// Sets label saturation
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    	{
		// Points of interest
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
		// Highways lables
	        	featureType: 'road.highway',
	       		elementType: 'labels',
	        	stylers: [
	            		{visibility: "off"}
	        	]
	    	}, 
		{ 	
		// Local roads lables
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
		// Arterial road lables
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
		// Road lables
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		// Style different elements on the map
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
				{ visibility: "on" }, 
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
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "off" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
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
		
	// Google map options
	var map_options = {
		center: new google.maps.LatLng(map_center_latitude, map_center_longitude),
		zoom: map_zoom,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: style,
    	}
	
    	// Initialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);

	// Add custom buttons for the zoom-in/zoom-out on the map
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
  	// Place the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});     
	// Add a custom marker to the map				
	var denver = new google.maps.Marker({
	  	position: new google.maps.LatLng(39.742043, -104.991531),
	 	map: map,
	 	visible: true,
		icon: marker_1,
		title: 'Denver'
	});
       
	var storeDescription = 
	    '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Denver</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Bold</b> description.</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: storeDescription
        });
	
        denver.addListener('click', function() {
          infowindow.open(map, denver);
        });
