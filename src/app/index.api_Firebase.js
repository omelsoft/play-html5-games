(function() {
    'use strict';

    angular
        .module('omel-games')
        .factory('Firebase', ['$window', Firebase]);

    /** @ngInject */
    function Firebase($window) {
        var config = {
            apiKey: 'AIzaSyCGVCx0zSXqdSiqu5svNOXTl1bfddFXGVw',
            authDomain: 'omel-games.firebaseapp.com',
            databaseURL: 'https://omel-games.firebaseio.com',
            projectId: 'omel-games',
            storageBucket: 'omel-games.appspot.com',
            messagingSenderId: '312367626496'
        };
        if (!$window.firebase.apps.length) {
            $window.firebase.initializeApp(config);
        }

        return $window.firebase;
    }

})();