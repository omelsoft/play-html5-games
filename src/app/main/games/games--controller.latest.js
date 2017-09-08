(function() {
    'use strict';

    angular
        .module('app.games.latest')
        .controller('GamesController', ['$cookies', '$state', '$rootScope', '$location', 'NewGames', 'ngMeta', 'Game', GamesController]);

    /** @ngInject */
    function GamesController($cookies, $state, $rootScope, $location, NewGames, ngMeta, Game) {
        var vm = this;

        ngMeta.init();
        ngMeta.setTitle('Find the Game of your life', ' | Omel Games');
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', 'http://placeholder.com/abc.jpg');
        ngMeta.setDefaultTag('author', 'Omel Games');

        // Data
        vm.isLoggedIn = false;
        vm.games = NewGames.games;

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login');
        } else {
            vm.isLoggedIn = true;
        }

        // Methods
        vm.viewGame = viewGame;

        /**
         * Function to view the game details.
         * 
         * @param {any} game 
         */
        function viewGame(game) {
            Game.set(game);
            $state.go('app.games_detail', {
                title: game.title.replace(/ /g, '-').toLowerCase()
            });
        }
    }
})();