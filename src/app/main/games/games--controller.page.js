(function() {
    'use strict';

    angular
        .module('app.games.latest')
        .controller('GamesPageController', ['$cookies', '$state', '$rootScope', '$location', 'NewGames', 'ngMeta', 'Game', GamesPageController]);

    /** @ngInject */
    function GamesPageController($cookies, $state, $rootScope, $location, NewGames, ngMeta, Game) {
        var vm = this;
        vm.params = $state.params;

        ngMeta.init();
        ngMeta.setTitle('Find the Game of your life', ' | Page ' + vm.params.page);
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', 'http://placeholder.com/abc.jpg');
        ngMeta.setDefaultTag('author', 'Omel Games');

        // Data
        vm.isLoggedIn = false;
        vm.games = NewGames.games;

        $rootScope.games = vm.games;
        $rootScope.currentPage = vm.params.page;

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login');
        } else {
            vm.isLoggedIn = true;
        }

        // Methods
        vm.viewGame = viewGame;
        vm.updatePagination = updatePagination;

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

        /**
         * Update pagination on page change
         * 
         * @param {any} newPageNumber 
         * @param {any} oldPageNumber 
         */
        function updatePagination(newPageNumber, oldPageNumber) {
            $rootScope.currentPage = newPageNumber;
            $state.go('app.games_page', {
                page: newPageNumber
            });
            console.log(newPageNumber, oldPageNumber);
        }
    }
})();