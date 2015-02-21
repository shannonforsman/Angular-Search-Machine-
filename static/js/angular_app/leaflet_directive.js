/**
 * Created by ing on 10.02.15.
 */
(function() {
    'use strict';


    angular
        .module('App')
        .directive('leafletDirective', function () {
            return {
                restrict: 'EA',
                scope: {
                    data:'='
                },
                template:'<div></div>',
                link: function (scope,element, attrs) {

                    //Layers//

                    var BaseMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        maxZoom: 18
                    });

                    var CycleMap = L.tileLayer( 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.opencyclemap.org/">OpenCycleMap</a>',
                        maxZoom:18
                    });

                    var TransportMap = L.tileLayer( 'http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {
                        attribution:'&copy; <a href="http://www.opencyclemap.org/">OpenCycleMap</a>',
                        maxZoom:18
                    });

                    //More Free Layers Here http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames //

                    var BaseMaps = {
                      "Openstreet Map": BaseMap,
                        "Opencycle Map": CycleMap,
                        "Opentransport Map": TransportMap
                    };

                    var map = L.map('map', {
                        center: [40.766964,-73.930453],
                        zoom: 8,
                        layers:[BaseMap]
                    });

                    L.control.layers(BaseMaps).addTo(map);


                    /*Adding Geojson Data and adding functionality to markers by
                    onEachFeature function */

                    function onEachFeature(feature, layer) {
                            layer.bindPopup(feature.properties.NAME + '<br/>' +
                            feature.properties.CITY + '<br/>' +
                            feature.properties.ADDRESS + '<br/>')
                    }

                    /*If it goes about style of marker, the marker which is loaded by leaflet is
                     image, so there is not too much we could do to change color, we could use css filters,
                     In my opinion the best option would be to take leaflet marker and change it color in graphic
                     program and then use leaflet method icon, where we can load any static file
                       */

                    var geojsonLayer = L.geoJson(scope.data, {
                        onEachFeature:onEachFeature
                    }).addTo(map);

                    scope.$watch('data', function (newVal, oldVal) {
                        if (newVal !== oldVal) {

                            geojsonLayer.clearLayers();
                            geojsonLayer.addData(scope.data);
                        }
                    }, true);

                }

            };
        });

})();
