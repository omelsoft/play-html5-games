(function() {
    'use strict';
    angular
        .module('omel-games')
        .factory('Auth', ['$firebaseAuth', AuthService]);

    /** @ngInject */
    function AuthService($firebaseAuth) {
        return $firebaseAuth();
    }

})();