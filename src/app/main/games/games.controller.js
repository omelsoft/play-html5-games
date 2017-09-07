(function() {
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', ['$cookies', '$rootScope', '$location', 'NewGames', GamesController]);

    /** @ngInject */
    function GamesController($cookies, $rootScope, $location, NewGames) {
        var vm = this;

        // Data
        vm.isLoggedIn = false;
        vm.games = NewGames.games;

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login');
        } else {
            vm.isLoggedIn = true;
        }

    }
})();