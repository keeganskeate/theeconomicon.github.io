var map;
var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;
var style= [{
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
var markerGroups = {
    "medical_center": [],
    "retail_store": [],
};
var customIcons = {
    medical_center: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png'
    },
    retail_store: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
    }
};
function load() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(39.00, -105.547222),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        styles: style
    });
    var infoWindow = new google.maps.InfoWindow();
    var xml = parseXml(xmlStr);
    var markers = xml.documentElement.getElementsByTagName("marker");
    var bounds = new google.maps.LatLngBounds();
    var trialmarkers = [];
    for (var i = 0; i < markers.length; i++) {
        var DBA = markers[i].getAttribute("DBA");
        var licensee = markers[i].getAttribute("licensee");
        var center_type = markers[i].getAttribute("center_type");
        var license_number = markers[i].getAttribute("license_number");
        var street = markers[i].getAttribute("street");
        var city = markers[i].getAttribute("city");
        var point = new google.maps.LatLng(
        	parseFloat(markers[i].getAttribute("lat")),
        	parseFloat(markers[i].getAttribute("lng")));
        	bounds.extend(point);
        var type = markers[i].getAttribute("type");
        var html = "<b>" + DBA + "<br/>" + licensee + "</b> <br/>" + center_type + "<br/>" + license_number + "<br/>" + street + "<br/>" + city;
        var icon = customIcons[type] || {};
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon
        });
        markerGroups[type].push(marker);
        trialmarkers.push(marker);
        bindInfoWindow(marker, map, infoWindow, html);  
    }
    // Cluster Markers
    var mcOptions = {
      styles:[{url: "https://googlemaps.github.io/js-marker-clusterer/images/m1.png", width: 53, height:53, textColor:"#fff"}],
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'};
      //var markerCluster = new MarkerClusterer(map, trialmarkers, mcOptions);
    var medical_center_markerCluster = new MarkerClusterer(map, markerGroups["medical_center"], mcOptions);
    var retail_store_markerCluster = new MarkerClusterer(map, markerGroups["retail_store"], mcOptions);
    // Set Bounds
    map.fitBounds(bounds);
}
function bindInfoWindow(marker, map, infoWindow, html) {
		// Attach info
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
        // Close info on map click
        google.maps.event.addListener(map, 'click', function() {
    			infoWindow.close();
    		});
    });   
}
function toggleGroup(type) {
    for (var i = 0; i < markerGroups[type].length; i++) {
        var marker = markerGroups[type][i];
        if (!marker.getVisible()) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    }
}
google.maps.event.addDomListener(window, 'load', load);
function doNothing() {}
function downloadUrl(url, callback) {
    var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };
    request.open('GET', url, true);
    request.send(null);
}
function parseXml(str) {
    if (window.ActiveXObject) {
        var doc = new ActiveXObject('MicrosoftXMLDOM');
        doc.loadXML(str);
        return doc;
    } else if (window.DOMParser) {
        return (new DOMParser).parseFromString(str, 'text/xml');
    }
}

var xmlStr = '<markers>' +
'<marker type="medical_center" lat="39.718525" lng="-105.017281" DBA="Business1" licensee="licensee" center_type="Medical Center" license_number="" street = "Street" city="City, CO ZIP" />'+
'<marker type="medical_center" lat="39.679337" lng="-104.987891" DBA="Business2" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'<marker type="medical_center" lat="38.330489" lng="-104.716092" DBA="Business3" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'<marker type="retail_store" lat="39.711478" lng="-105.002313" DBA="Business4" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'<marker type="retail_store" lat="39.752584" lng="-104.991667" DBA="Business5" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'<marker type="retail_store" lat="39.750626" lng="-105.000288" DBA="Business6" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'<marker type="retail_store" lat="39.5" lng="-104.5" DBA="Business7" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'<marker type="retail_store" lat="38.5" lng="-104.25" DBA="Business8" licensee="licensee" center_type="Medical Center" license_number="#" street = "Street #" city="City, CO ZIP" />'+
'</markers>';
