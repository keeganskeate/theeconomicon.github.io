var siteURL = 'http://www.theeconomicon.com';
//if (document.domain == 'localhost') siteURL = "x";

$(document).ready(function () {
//jQuery(document).ready(function($){
    function render_map($el) {

        // Var
        var $markers = $el.find('.marker');

        // Vars
        var args = {
            center: new google.maps.LatLng(39.00, -105.547222),
            backgroundColor: '#ffffff',
            zoom: 8,
            disableDefaultUI: true,
            zoomControl: false,
            disableDoubleClickZoom: true,
            panControl: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable: true,
            overviewMapControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,

        };

        // Create map	        	
        //var map = new google.maps.Map($el[0], args);
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
        
        // Add a markers reference
        map.markers = [];

        // Add markers
        $markers.each(function () {
            add_marker($(this), map);
        });

        // Center map
        center_map(map);
        
        return map;

    }
    
    // Markers
    var marker_medical = ( is_internetExplorer11 ) ? '../images/marker-medical-center.png' : '../images/marker-medical-center.svg';
    var marker_retail = ( is_internetExplorer11 ) ? '../images/marker-retail-store.png' : '../images/marker-retail-store.svg';
    
    function add_marker($marker, map) {

        // Var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
        var icon = null;
        
        // Simple icon change to differentiate marker type      
        if ($marker.data('regime') == 'medical') {
            icon = marker_medical;
        } else {
            icon = marker_retail;
        }
        var marker = new google.maps.Marker({
            icon: icon,
            position: latlng,
            map: map,
            // Custom property to hold the filters options, it'a used below to filter the markers
            filter: {
                type: $marker.data('regime').toString().split(' '),
                date: $marker.data('type').toString().split(' ')
            }
        });

        // Add to array
        map.markers.push(marker);

        if ($marker.html()) {
            // Create info window
            infobox = new InfoBox({
                content: $marker.children().html(),
                disableAutoPan: false,
                //maxWidth: 150,
                pixelOffset: new google.maps.Size(-140, -140),
                zIndex: null,
                boxStyle: {
                    background: '#EAEAEB',
                    //opacity: 0.75,
                    width: '200px'
                },
                closeBoxMargin: '10px 9px 12px 0',
                //closeBoxURL: siteURL + '/close-google-popup.png',
                infoBoxClearance: new google.maps.Size(1, 1)
            });

            // Show info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function () {
                console.log($marker.children().html());

                infobox.open(map, marker);
                infobox.setContent($marker.children().html());

                mapID = $marker.attr('id');
                $('.' + mapID).show();
            });

        }

    }

    function center_map(map) {

        // Vars
        var bounds = new google.maps.LatLngBounds();

        // Loop through all markers and create bounds
        $.each(map.markers, function (i, marker) {
            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
            bounds.extend(latlng);
        });
        map.fitBounds(bounds);

    }
    $(document).ready(function () {
        var map = null;
        
        $('.map-canvas').each(function () {
            map = render_map($(this));
        });
        
        // Filtering links click handler, it uses the filtering values (data-filterby and data-filtervalue)
        // to filter the markers based on the filter (custom) property set when the marker is created.
        $(document).on('click', '.filters a', function (event) {
            event.preventDefault();
            var $target = $(event.target);
            var type = $target.data('filterby');
            var value = $target.data('filtervalue');
            
            $.each(map.markers, function () {
                if (this.filter[type] && this.filter[type].indexOf(value.toString()) >= 0) {
                    if (this.map == null) {
                        this.setMap(map);
                    }
                } else {
                    this.setMap(null);
                }
            });
        });
    });

});


// New Scrap
function Markers(color){

// map.closeInfoWindow();
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
var bounds = new GLatLngBounds();
// Create our "tiny" marker icon 
var baseIcon = new GIcon();
baseIcon.image = "http://labs.google.com/ridefinder/images/mm_20_red.png";
baseIcon.iconSize = new GSize(12, 20);
baseIcon.iconAnchor = new GPoint(6, 20);
baseIcon.infoWindowAnchor = new GPoint(5, 1);
//baseIcon.imageMap = [4,0,0,4,0,7,3,11,4,19,7,19,8,11,11,7,11,4,7,0]; 

var icons=[];

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
	
function createMarker(point, html, iconStr) {
   bounds.extend(point);
   var icon = coloredRideshareIcon(iconStr);
   var marker = new GMarker(point, {icon: icon});
   gmarkers.push(marker);
   marker.type = iconStr; 
   GEvent.addListener(marker, "click", function () {
      // FF 1.5 fix
      var text = "<div><div class=\"smalltext\">"+html +"</div></div>";
      marker.openInfoWindowHtml(text);
   });
   map.addOverlay(marker);
}

function makeMap() {
   map = new GMap(document.getElementById("map"));
   map.addControl(new GLargeMapControl());
   map.addControl(new GMapTypeControl());
//   map.centerAndZoom(new GPoint(-3.97729, 54.30000), 11);	
   map.setCenter(new GLatLng(39.0, -105.547222), 8);
   addMarkers();
   map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
}	

function addMarkers() {
var point = new GLatLng(39.718525, -105.017281);
var marker = createMarker(
  point,
  '<div id="infowindow">415 mary ave<br>Reedsburg, WI<br>Listed by:<a href=http://www.gavinbros.com>Gavin Brothers</a></div>',
'yellow');

var point = new GLatLng(39.679337, -104.987891);
var marker = createMarker(point, '<div id="infowindow" style="white-space: nowrap;">Reedsburg Public Library<br>370 Vine St<br>Reedsburg, WI<br><a href=http://www.scls.lib.wi.us/reedsburg/index.html>www.scls.lib.wi.us/reedsburg/index.html</a></div>','blue');

var point = new GLatLng(38.330489, -104.716092);
var marker = createMarker(point, '<div id="infowindow" style="white-space: nowrap;">VFW Post 1916 Reedsburg<br>200 Veterans Dr<br>Reedsburg, WI<br><a href=http://></a></div>','green');

var point = new GLatLng(39.711478, -105.002313);
var marker = createMarker(point, '<div id="infowindow" style="white-space: nowrap;">Reedsburg area high school<br>1100 s albert ave<br>Reedsburg, WI<br><a href=http://></a></div>','orange');

var point = new GLatLng(39.752584, -104.991667);
var marker = createMarker(point, '<div id="infowindow" style="white-space: nowrap;">Anna stone park<br>300 w 2nd st<br>Reedsburg, WI<br><a href=http://></a></div>','red');

var point = new GLatLng(39.750626, -105.000288);
var marker = createMarker(point, '<div id="infowindow" style="white-space: nowrap;">church of god<br>1225 n dewey ave<br>Reedsburg, WI<br><a href=http://></a></div>','purple');
}
