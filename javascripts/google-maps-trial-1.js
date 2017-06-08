// Data
var points = [
{"license":"Business1",
"DBA":"Business Name",
"licenseType": "Medical Center",
"centerType":"medical_center",
"typeId":"1",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.718525","lng":"-105.017281"
},
{"license":"Business2",
"DBA":"Business Name",
"licenseType": "Medical Cultivation",
"centerType":"medical_cultivation",
"typeId":"2",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.731737","lng":"-104.985926"
},
{"license":"Business3",
"DBA":"Business Name",
"licenseType": "Medical Manufacturer",
"centerType":"medical_manufacturer",
"typeId":"3",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.754290","lng":"-104.979172"
},
{"license":"Business4",
"DBA":"Business Name",
"licenseType": "Medical Testing",
"centerType":"medical_testing",
"typeId":"4",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.769147","lng":"-105.003299"
},
{"license":"Business5",
"DBA":"Business Name",
"licenseType": "Retail Store",
"centerType":"retail_store",
"typeId":"5",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.507638","lng":"-106.052259"
},
{"license":"Business6",
"DBA":"Business Name",
"licenseType": "Retail Cultivation",
"centerType":"retail_cultivation",
"typeId":"6",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.752584","lng":"-104.991667"
},
{"license":"Business7",
"DBA":"Business Name",
"licenseType": "Retail Manufacturer",
"centerType":"retail_manufacturer",
"typeId":"7",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"37.937538","lng":"-107.811115"
},
{"license":"Business8",
"DBA":"Business Name",
"licenseType": "Retail Testing",
"centerType":"retail_testing",
"typeId":"8",
"typeColor":"#8c000f",
"street": "Street Address",
"city": "Denver",
"zip": "zipcode",
"lat":"39.679337","lng":"-104.987891"
}
];
// Global Variables
var map;
var infowindow;
var image = [];
var gmarkers = [];
var clusterMarkers = [];
// Google Map Options
var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;
var mapStyle= [
    {featureType: "water",
    elementType: "geometry",
		    stylers: [
			      { hue: main_color },
			      { visibility: "on" }, 
			      { lightness: brightness_value }, 
			      { saturation: saturation_value }
			  ]
    }
];
var mapOptions = {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(39.00, -105.547222),
        zoom: 8,
        streetViewControl: false,
        mapTypeControl: false,
        scaleControl: true,
        styles: mapStyle
};
// Cluster Options
var clusterOptions = {
    	gridSize: 50,
      maxZoom: 10,
      //minimumClusterSize: 4,
      styles:[{
          url: "https://googlemaps.github.io/js-marker-clusterer/images/m1.png",
          width: 53,
          height:53,
          textColor:"#fff",
          textSize: 11
        }]
    };
    // Import marker images
		var customIcons = {
    	medical_center: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
        size: new google.maps.Size(12, 20)
    	},
      medical_cultivation: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_yellow.png',
        size: new google.maps.Size(12, 20)
    	},
      medical_manufacturer: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_green.png',
        size: new google.maps.Size(12, 20)
    	},
      medical_testing: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_white.png',
        size: new google.maps.Size(12, 20)
    	},
    	retail_store: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
        size: new google.maps.Size(12, 20)
    	},
      retail_cultivation: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_orange.png',
        size: new google.maps.Size(12, 20)
    	},
      retail_manufacturer: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_purple.png',
        size: new google.maps.Size(12, 20)
    	},
      retail_testing: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_black.png',
        size: new google.maps.Size(12, 20)
    	}
		};
// Create Map
function mapInit(){
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		// Close info on map click
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
    });
    // Create markers and clusters
    addLocation();
    var markerCluster = new MarkerClusterer(map, clusterMarkers, clusterOptions);
    function addLocation(place,category) {
      for (var x in points){
          var development = points[x];
          var location = new google.maps.LatLng(development.lat, development.lng);
          storeMarker(location, development);
      }   
    }
    function storeMarker(location, development){
      var latLng = location;
      var icon = customIcons[development.centerType] || {};
      // Marker Options
      var storedmarker = new google.maps.Marker({
            position: latLng,
            icon: icon.icon,
            title: development.license,
            animation: google.maps.Animation.DROP
      });
   		// Categories
      storedmarker.typeCategory = development.typeId;
			// Info Windows
      google.maps.event.addListener(storedmarker, 'click', function() {
        if(typeof infowindow != 'undefined') infowindow.close();
        //infowindow = new google.maps.InfoWindow({
        //  content: "<b>"+ development.name +  "</b>"
        
        // Info Bubbles
        infowindow = new InfoBubble({
          disableAutoPan: false,
          hideCloseButton: false,
          closeSrc: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
          minHeight: 80,
          maxHeight: 80,
          arrowSize: 10,
          arrowPosition: 30,
          borderWidth: 2,
          borderColor: '#33ADA4'
        });
        infowindow.addTab('License', "<div id='infoText'>" +
        									"<b><font size='3rem'>"+ development.DBA + "                           </font><br/>" +
        									development.license + "<br/>" +
                          "<font color='development.typeColor'>" +
                          development.licenseType + "</font></b><br/>" +
                          development.street + "<br/>" +
                          development.city + ", CO " + development.zip +
                          "</div>");
        infowindow.addTab('Licensee(s)', development.license);   
        
      // Close Infowindow on second click
      if (!storedmarker.open) {
      	infowindow.open(map, storedmarker);
      	storedmarker.open = true;
      }
      else{
      	infowindow.close();
      	storedmarker.open = false;
      }
      });
            
			// Add marker to cluster
      clusterMarkers.push(storedmarker);    
    }
		// Toggle for Categories
    function toggle(category,show) { 
      var markers=[];
      for (var i=0; i<clusterMarkers.length; i++) {
        if (clusterMarkers[i].typeCategory == category) {
          markers.push(clusterMarkers[i]);
          clusterMarkers[i].setVisible(show);
        }
      }
      if(markers.length){
        markerCluster[(show)?'addMarkers':'removeMarkers'](markers);
      }
      if(!show && infowindow)infowindow.close();
    }
    function select(box,category) {
        toggle(category,box.checked);
    }
// Attach value of type
jQuery(document).ready(function($) {
  $('.map-filter').click(function () {
    select(this, this.value);
  });
});

}
// Execute
jQuery(document).ready(function(){
    mapInit();
});
  
