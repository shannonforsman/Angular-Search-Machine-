/**
 * Created by ing on 09.02.15.
 */
(function() {
    'use strict';


angular
    .module('App')
    .factory('Storage', function ($resource) {
    return $resource("/json/json.json", {}, {
        get: {
            method: "GET",
            cache: true,
            isArray:false
        }
    });


});

})();
