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
