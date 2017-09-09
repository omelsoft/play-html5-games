(function() {
    'use strict';

    angular
        .module('app.games.latest')
        .controller('GamesController', ['$cookies', '$state', '$timeout', '$rootScope', '$scope', '$location', 'NewGames', 'ngMeta', 'Game', GamesController]);

    /** @ngInject */
    function GamesController($cookies, $state, $timeout, $rootScope, $scope, $location, NewGames, ngMeta, Game) {
        var vm = this;

        ngMeta.init();
        ngMeta.setTitle('Find the Game of your life', ' | Omel Games');
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', 'http://placeholder.com/abc.jpg');
        ngMeta.setDefaultTag('author', 'Omel Games');

        removeBodyClass();

        // Data
        vm.isLoggedIn = false;
        vm.games = NewGames.games;

        $rootScope.games = vm.games;
        $rootScope.currentPage = $rootScope.currentPage ? $rootScope.currentPage : 1;

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login');
        } else {
            vm.isLoggedIn = true;
        }

        $scope.$watch('$viewContentLoaded', function() {
            $timeout(function() {
                $rootScope.loadingProgress = false;
            });
        });

        // Methods
        vm.viewGame = viewGame;
        vm.updatePagination = updatePagination;

        /**
         * Function to view the game details.
         * 
         * @param {any} game 
         */
        function viewGame(game) {
            var game = game.link.split('/');
            Game.set(game);
            $state.go('app.games_detail', {
                title: game[3]
            });
        }

        /**
         * Update pagination on page change
         * 
         * @param {any} newPageNumber 
         * @param {any} oldPageNumber 
         */
        function updatePagination(newPageNumber, oldPageNumber) {
            $rootScope.loadingProgress = true;
            $rootScope.currentPage = newPageNumber;
            $state.go('app.games_page', {
                page: newPageNumber
            });
        }

        /**
         * Removes the game class on home page
         */
        function removeBodyClass() {
            $('body').removeClass('game');
        }
    }
})();