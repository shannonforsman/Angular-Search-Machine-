/**
 * Created by ing on 09.02.15.
 */
(function() {
    'use strict';

angular
    .module('App')
    .filter('offset', offset);

    function offset() {

        return function (input, start) {
            if (!angular.isArray(input)) {
                return [];
            }
            start = +start;
            return input.slice(start);
        };
}

})();
