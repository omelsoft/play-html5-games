(function() {
    'use strict';

    angular
        .module('app.games.detail')
        .controller('GamesDetailsController', ['$cookies', '$scope', '$rootScope', '$location', '$state', 'ngMeta', 'Game', GamesDetailsController]);

    /** @ngInject */
    function GamesDetailsController($cookies, $scope, $rootScope, $location, $state, ngMeta, Game) {
        var vm = this;


        // Data
        vm.game = Game.get();
        $scope.uniqueID = Game.uniqueID();
        vm.params = $state.params;

        ngMeta.init();
        ngMeta.setTitle(vm.game.title, ' | Omel Games');
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', 'http://placeholder.com/abc.jpg');
        ngMeta.setDefaultTag('author', 'Omel Games');

        // Data
        vm.isLoggedIn = false;

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login');
        } else {
            vm.isLoggedIn = true;
        }

        // Methods
        vm.viewGame = viewGame;

        function viewGame(game) {
            console.log(game);
        }
    }
})();