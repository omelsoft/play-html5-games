(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('Game', ['$cookies', '$rootScope', GameService]);

    /** @ngInject */
    function GameService($cookies, $rootScope) {
        var service = {
            set: set,
            get: get,
            uniqueID: uniqueID
        };

        return service;

        /**
         * Set the selected game
         * 
         * @param {any} game 
         */
        function set(game) {
            $cookies.putObject('selectedGame', game);
        }

        /**
         * Returns the details of the selected game
         * 
         * @returns object
         */
        function get() {
            return $cookies.getObject('selectedGame');
        }

        /**
         * Generates random ID
         * 
         * @returns random ID's
         */
        function uniqueID() {
            return new Date().getUTCMilliseconds();
        }

    }

})();