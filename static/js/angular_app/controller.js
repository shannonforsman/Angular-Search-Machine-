/**
 * Created by ing on 09.02.15.
 */
(function() {
    'use strict';

angular
    .module('App')
    .controller('AppController', function($scope, $filter,Storage) {

        //Initializing Variables//

        $scope.currentPage = 0;
        $scope.pageSize = 35;
        $scope.search = {
            'properties': {}
        };

        //Initializing Geojson From Factory//

        Storage.get(function (data){
           $scope.source = data.features;
            $scope.data_table = angular.copy($scope.source);
            $scope.data_map =   angular.copy($scope.source);
        });

        //Function For Filtering//

        $scope.FilteredGeojson = function (Data, Source) {
            Data = $filter('filter')(Source, $scope.search);
            Data = $filter('offset')(Data, $scope.currentPage * $scope.pageSize);
            Data = $filter('limitTo')(Data, $scope.pageSize);

            return Data;
        };


        //Watch on scope initialized in view, which stores result of FilteredGeojson() //

        $scope.$watch('ResultOfFilteredGeojson', function (newVal, oldVal) {

            if (newVal !== oldVal) {
                $scope.data_map = $scope.ResultOfFilteredGeojson;
            }
        }, true);

        });

})();