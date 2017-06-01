var markerGroups = {
    "parking": [],
    "trail": [],
    "shelter": []
};
var customIcons = {
    shelter: {
        icon: 'http://backpackingconnecticut.com/images/shelter_picnic.png'
    },
    parking: {
        icon: 'http://backpackingconnecticut.com/images/parking.png'
    }
};
var map;
function load() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(41.613889, -72.7725),
        zoom: 9,
        mapTypeId: 'terrain'
    });
    var infoWindow = new google.maps.InfoWindow();
    // downloadUrl("phpsqlajax_genxml.php", function(data) {
    var xml = parseXml(xmlStr); // data.responseXML;
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
    // });
    map.fitBounds(bounds);
}

function bindInfoWindow(marker, map, infoWindow, html) {
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}

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

function doNothing() {}

function toggleGroup(type) {
    for (var i = 0; i < markerGroups[type].length; i++) {
        // alert(markerGroups[type][i]);
        var marker = markerGroups[type][i];
        if (!marker.getVisible()) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    }
}
google.maps.event.addDomListener(window, 'load', load);

function parseXml(str) {
    if (window.ActiveXObject) {
        var doc = new ActiveXObject('MicrosoftXMLDOM');
        doc.loadXML(str);
        return doc;
    } else if (window.DOMParser) {
        return (new DOMParser).parseFromString(str, 'text/xml');
    }
}

var xmlStr = '<markers><marker name="Mattatuck Trail Parking 1" address="" lat="41.784969" lng="-73.319489" type="parking"/><marker name="Mattatuck Trail Parking 2" address="" lat="41.821751" lng="-73.296867" type="parking"/><marker name="Mattatuck Trail Parking 3" address="" lat="41.784969" lng="-73.319489" type="parking"/><marker name="Mohawk Trail Parking 1" address="" lat="41.818535" lng="-73.368477" type="parking"/><marker name="Mohawk Trail Parking 2" address="" lat="41.784969" lng="-73.319489" type="parking"/><marker name="Appalacian Trail Parking 1" address="" lat="41.731030" lng="-73.490692" type="parking"/><marker name="Appalacian Trail Parking 2" address="" lat="41.807705" lng="-73.391785" type="parking"/><marker name="Appalacian Trail PArking 3" address="" lat="41.731030" lng="-73.490692" type="parking"/><marker name="Dawley Pond Shelter" address="" lat="41.621277" lng="-71.815392" type="shelter"/><marker name="Pachaug Dry Resevoir Shelter" address="" lat="41.590752" lng="-71.881386" type="shelter"/></markers>';
