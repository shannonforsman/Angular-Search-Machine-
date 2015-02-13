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
                    var map = L.map('map', {
                        center: [40.766964,-73.930453],
                        zoom: 8
                    });
                    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        maxZoom: 18
                    }).addTo(map);

                    var geojsonLayer = L.geoJson(scope.data).addTo(map);

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