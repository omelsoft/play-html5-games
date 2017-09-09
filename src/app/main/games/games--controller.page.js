(function() {
    'use strict';

    angular
        .module('app.games.latest')
        .controller('GamesPageController', ['$cookies', '$state', '$rootScope', '$scope', '$location', '$timeout', 'NewGames', 'ngMeta', 'Game', GamesPageController]);

    /** @ngInject */
    function GamesPageController($cookies, $state, $rootScope, $scope, $location, $timeout, NewGames, ngMeta, Game) {
        var vm = this;
        vm.params = $state.params;

        ngMeta.init();
        ngMeta.setTitle('Find the Game of your life', ' | Page ' + vm.params.page);
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', vm.games[0].teaserBig);
        ngMeta.setTag('url', $location.$$absUrl);
        ngMeta.setTag('description', vm.games[0].description);
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
         * @param {any} item 
         */
        function viewGame(item) {
            var game = item.link.split('/');
            Game.set(item);
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
    }
})();