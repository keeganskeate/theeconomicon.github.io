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
        center: new google.maps.LatLng(41.613889, -72.7725),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false,
        styles: style
    });
    var infoWindow = new google.maps.InfoWindow();
    var xml = parseXml(xmlStr);
    var markers = xml.documentElement.getElementsByTagName("marker");
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        var name = markers[i].getAttribute("name");
        var address = markers[i].getAttribute("address");
        var point = new google.maps.LatLng(
        parseFloat(markers[i].getAttribute("lat")),
        parseFloat(markers[i].getAttribute("lng")));
        bounds.extend(point);
        var type = markers[i].getAttribute("type");
        var html = "<b>" + name + "</b> <br/>" + address;
        var icon = customIcons[type] || {};
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon
        });
        markerGroups[type].push(marker);
        bindInfoWindow(marker, map, infoWindow, html);
    }
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
'<marker name="Business1" address="blank" lat="41.784969" lng="-73.319489" type="medical_center"/>'+
'<marker name="Business2" address="blank" lat="41.821751" lng="-73.296867" type="medical_center"/>'+
'<marker name="Business3" address="blank" lat="41.784969" lng="-73.319489" type="medical_center"/>'+
'<marker name="Business4" address="blank" lat="41.818535" lng="-73.368477" type="retail_store"/>'+
'<marker name="Business5" address="blank" lat="41.784969" lng="-73.319489" type="retail_store"/>'+
'<marker name="Business6" address="blank" lat="41.731030" lng="-73.490692" type="retail_store"/>'+
'<marker name="Business7" address="blank" lat="41.807705" lng="-73.391785" type="retail_store"/>'+
'<marker name="Business8" address="blank" lat="41.731030" lng="-73.490692" type="retail_store"/>'+
'<marker name="Business9" address="blank" lat="41.621277" lng="-71.815392" type="retail_store"/>'+
'<marker name="Business10" address="blank" lat="41.590752" lng="-71.881386" type="medical_center"/>'+
'</markers>';
