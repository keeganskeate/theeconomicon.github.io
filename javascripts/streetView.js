var contentString = '<div id="content" style="width:200px;height:200px;"></div>';
        infowindow = new google.maps.InfoWindow({content: contentString});
      // Street View
google.maps.event.addListener(storedmarker, "click", function () {
   infowindow.open(map, storedmarker);
                var pano = null;
                google.maps.event.addListener(infowindow, 'domready', function () {
                    if (pano != null) {
                        pano.unbind("position");
                        pano.setVisible(false);
                    }
                    pano = new google.maps.StreetViewPanorama(document.getElementById("content"), {
                        navigationControl: true,
                        navigationControlOptions: { style: google.maps.NavigationControlStyle.ANDROID },
                        enableCloseButton: false,
                        addressControl: false,
                        linksControl: false
                    });
                    pano.bindTo("position", storedmarker);
                    pano.setVisible(true);
                });
                google.maps.event.addListener(infowindow, 'closeclick', function () {
                    pano.unbind("position");
                    pano.setVisible(false);
                    pano = null;
                });
      });
