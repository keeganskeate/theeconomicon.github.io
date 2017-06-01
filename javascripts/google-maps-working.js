jQuery(document).ready(function($){
	
function Markers(color){
//map.closeInfoWindow();
  map.getInfoWindow().hide() 
   if (document.getElementById(color).checked==false) { // hide the marker
      for (var i=0;i<gmarkers.length;i++) {
         if (gmarkers[i].type==color)  {
            map.removeOverlay(gmarkers[i]);
         }
      }
   } else { // show the marker again
      for (var i=0;i<gmarkers.length;i++) {
         if (gmarkers[i].type==color)  {
            map.addOverlay(gmarkers[i]);
         }
      }
   }
}
var gmarkers=[];
var map;
var bounds = new google.maps.LatLngBounds();
// Create our "tiny" marker icon 
var baseIcon = new google.maps.Icon();
baseIcon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
baseIcon.iconSize = new google.maps.Size(12, 20);
baseIcon.iconAnchor = new google.maps.Point(6, 20);
baseIcon.infoWindowAnchor = new google.maps.Point(5, 1);
//baseIcon.imageMap = [4,0,0,4,0,7,3,11,4,19,7,19,8,11,11,7,11,4,7,0]; 

var icons=[];
var marker_1 = ( is_internetExplorer11 ) ? 'http://labs.google.com/ridefinder/images/mm_20_blue.png' : 'http://labs.google.com/ridefinder/images/mm_20_blue.png';

function coloredRideshareIcon(iconColor) {
   var color;
   if ((typeof(iconColor)=="undefined") || (iconColor==null)) { 
      color = "red" 
   } else { 
      color = iconColor; 
   }
   if (!icons[iconColor]) {
      var icon = new GIcon(baseIcon);
      icon.image = "http://labs.google.com/ridefinder/images/mm_20_"+ color +".png";
      icons[iconColor]=icon;
   } 
   return icons[iconColor];
}

function createMarker(point, iconStr, title, html) {
   bounds.extend(point);
   var icon = coloredRideshareIcon(iconStr);
   var marker = new google.maps.Marker(
     point,
     {icon: icon,
     title: title});
   gmarkers.push(marker);
   marker.type = iconStr; 
   google.maps.event.addListener(marker, "click", function () {
     var text = "<div><div class=\"smalltext\">"+ html +"</div></div>";
     if (marker.open) {
       marker.closeInfoWindow();
       marker.open = false;
     }
     else{
       marker.openInfoWindowHtml(text);
       marker.open = true;
     }
   });
   map.addOverlay(marker);
}

//GEvent.addListener(map, 'click', function() {
//    map.closeInfoWindow();
//  });

function makeMap() {
  var map_options = {
		center: new google.maps.LatLng(39.00, -105.547222),
		zoom: 8,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
    	};
	map = new google.maps.Map(document.getElementById('google-container'), map_options); 
  //map = new google.maps.Map(document.getElementById('google-container'));
   //map.addControl(new google.maps.LargeMapControl());
   //map.addControl(new google.maps.MapTypeControl({streetViewControl: false,zoomControl: false,}));
//   map.centerAndZoom(new GPoint(-3.97729, 54.30000), 11);	
   map.setCenter(new google.maps.LatLng(39.0, -105.547222), 8);
   addMarkers();
   map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
}	

function addMarkers() {
var point = new google.maps.LatLng(39.718525, -105.017281);
var marker = createMarker(
  point,
  'yellow',
  'Store-Name',
  '<div id="infowindow">415 mary ave<br>Reedsburg, WI<br>Listed by:<a href=http://www.gavinbros.com>Gavin Brothers</a></div>');

var point = new google.maps.LatLng(39.679337, -104.987891);
var marker = createMarker(
  point,
  'blue',
  'Store-Name',
  '<div id="infowindow" style="white-space: nowrap;">Reedsburg Public Library<br>370 Vine St<br>Reedsburg, WI<br><a href=http://www.scls.lib.wi.us/reedsburg/index.html>www.scls.lib.wi.us/reedsburg/index.html</a></div>');

var point = new google.maps.LatLng(38.330489, -104.716092);
var marker = createMarker(
  point,
  'green',
  'Store-Name',
  '<div id="infowindow" style="white-space: nowrap;">VFW Post 1916 Reedsburg<br>200 Veterans Dr<br>Reedsburg, WI<br><a href=http://></a></div>');

var point = new google.maps.LatLng(39.711478, -105.002313);
var marker = createMarker(
  point,
  'orange',
  'Store-Name',
  '<div id="infowindow" style="white-space: nowrap;">Reedsburg area high school<br>1100 s albert ave<br>Reedsburg, WI<br><a href=http://></a></div>');

var point = new google.maps.LatLng(39.752584, -104.991667);
var marker = createMarker(
  point,
  'red',
  'Store-Name',
  '<div id="infowindow" style="white-space: nowrap;">Anna stone park<br>300 w 2nd st<br>Reedsburg, WI<br><a href=http://></a></div>');

var point = new google.maps.LatLng(39.750626, -105.000288);
var marker = createMarker(
  point,
  'purple',
  'Store-Name',
  '<div id="infowindow" style="white-space: nowrap;">church of god<br>1225 n dewey ave<br>Reedsburg, WI<br><a href=http://></a></div>');
  
  
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
});
