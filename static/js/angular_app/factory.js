/**
 * Created by ing on 09.02.15.
 */
(function() {
    'use strict';


angular
    .module('App')
    .factory('Storage', function ($resource) {
    return $resource("/geo", {}, {
        get: {
            method: "GET",
            cache: true,
            isArray:false
        }
    });


});

})();