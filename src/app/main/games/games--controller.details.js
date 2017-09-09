(function() {
    'use strict';

    angular
        .module('app.games.detail')
        .controller('GamesDetailsController', ['$window', '$cookies', '$scope', '$rootScope', '$location', '$state', 'ngMeta', 'NewGames', 'Game', GamesDetailsController]);

    /** @ngInject */
    function GamesDetailsController($window, $cookies, $scope, $rootScope, $location, $state, ngMeta, NewGames, Game) {
        var vm = this;


        // Data
        vm.games = NewGames.games;
        vm.game = Game.get();
        vm.params = $state.params;

        $rootScope.splashing = true;
        $rootScope.games = vm.games;
        $scope.uniqueID = Game.uniqueID();

        ngMeta.init();
        ngMeta.setTitle('Play ' + vm.game.title, ' | Omel Games');
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', vm.game.teaserBig);
        ngMeta.setTag('description', vm.game.description);
        ngMeta.setDefaultTag('author', 'Omel Games');

        // Data
        vm.isLoggedIn = false;

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login/');
        } else {
            vm.isLoggedIn = true;
        }

        $scope.$on('$viewContentLoaded', function() {
            $rootScope.splashing = false;
        });
    }
})();