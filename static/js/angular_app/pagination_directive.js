/**
 * Created by ing on 09.02.15.
 */

(function() {
    'use strict';

    angular
        .module('App')
        .directive('paginationDirective', function($filter) {

            return {
                restrict: 'EA',
                scope: {
                    currentPage: '=',
                    pageSize: '=',
                    data: '=',
                    search: '='
                },
                template: '<ul id="pagination">' +
                '<li id="first">' +
                '<a href ng-click="firstPage()">« First</a>' +
                '</li>' +
                '<li id="prev" ng-class="prevPageDisabled()">' +
                '<a href ng-click="prevPage()">« Prev</a>' +
                '</li>' +
                '<li class="numbers" ng-repeat="n in range(pageSize.length, currentPage, currentPage + gap)" ng-class="{active: n == currentPage}" ng-click="setPage(n)">' +
                ' <a href="#">{{n+1}}</a>' +
                '  </li>' +
                ' <li id="next" ng-class="nextPageDisabled()">' +
                ' <a href ng-click="nextPage()">Next »</a>' +
                '</li>' +
                ' <li id="last">' +
                '<a href ng-click="lastPage()">Last »</a>' +
                '</li>' +
                '</ul>',
                link: function ($scope) {

                    $scope.numberOfPages = (function () {

                        var myFilteredData = $filter('filter')($scope.data, $scope.search);
                        if (!angular.isArray(myFilteredData)) {
                            return [];
                        }
                        return Math.ceil(myFilteredData.length / $scope.pageSize);
                    });
                    $scope.range = function () {
                        var rangeSize = 5;
                        var ret = [];
                        var start;
                        start = $scope.currentPage;
                        if (start > $scope.numberOfPages() - rangeSize) {
                            start = $scope.numberOfPages() - rangeSize;
                            if (start < 0) {
                                start = 0;
                            }
                        }
                        for (var i = start; i < start + rangeSize && i < $scope.numberOfPages(); i++) {
                            ret.push(i);
                        }
                        return ret;
                    };
                    $scope.prevPage = function () {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                        }
                    };
                    $scope.prevPageDisabled = function () {
                        return $scope.currentPage === 0 ? "disabled" : "";
                    };
                    $scope.nextPage = function () {
                        if ($scope.currentPage < $scope.numberOfPages() - 1) {
                            $scope.currentPage++;
                        }
                    };
                    $scope.nextPageDisabled = function () {
                        return $scope.currentPage === $scope.numberOfPages() ? "disabled" : "";
                    };
                    $scope.setPage = function (n) {
                        $scope.currentPage = n;
                    };
                    $scope.firstPage = function () {
                        return $scope.currentPage = 0;
                    };
                    $scope.lastPage = function () {
                        return $scope.currentPage = $scope.numberOfPages() - 1;
                    };

                }


            };

        });



        })();
