// Data
var points = [
{"name":"Business1",
"lat":"39.718525","lng":"-105.017281",
"centerType":"medical_center",
"typeId":"1",
},
{"name":"Business2","lat":"39.679337","lng":"-104.987891","typeId":"1", "centerType":"medical_center"},{"name":"Business3","lat":"38.330489","lng":"-104.716092","typeId":"2","centerType":"retail_store"},{"name":"Business4","lat":"39.750626","lng":"-105.002313","typeId":"2","centerType":"retail_store"},{"name":"Business5","lat":"39.752584","lng":"-104.991667","typeId":"2","centerType":"retail_store"},{"name":"Business6","lat":"39.7114780","lng":"-105.000288","typeId":"1","centerType":"medical_center"}];
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
    	//imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      styles:[{
          url: "https://googlemaps.github.io/js-marker-clusterer/images/m1.png",
          width: 53,
          height:53,
          textColor:"#fff",
          textSize: 11
        }]
};
// Marker images
var customIcons = {
    medical_center: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png'
    },
    retail_store: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
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
            title: development.name
    });
   	// Categories
    storedmarker.typeCategory = development.typeId;
		// Info Windows
    google.maps.event.addListener(storedmarker, 'click', function() {
        if(typeof infowindow != 'undefined') infowindow.close();
        //infowindow = new google.maps.InfoWindow({content: });
        
        // Info Bubbles
        infowindow = new InfoBubble({
            disableAutoPan: false
        });
        infowindow.addTab('License', "<b>"+ development.name +  "</b>");
        infowindow.addTab('Licensee(s)', development.name);   
        
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
  
