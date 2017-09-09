(function() {
    'use strict';

    angular
        .module('app.games.latest')
        .controller('GamesController', ['$window', '$cookies', '$state', '$timeout', '$rootScope', '$scope', '$location', 'NewGames', 'ngMeta', 'Game', GamesController]);

    /** @ngInject */
    function GamesController($window, $cookies, $state, $timeout, $rootScope, $scope, $location, NewGames, ngMeta, Game) {
        var vm = this;

        // $window.location.reload();

        // Data
        vm.isLoggedIn = false;
        vm.games = NewGames.games;

        $rootScope.games = vm.games;
        $rootScope.currentPage = $rootScope.currentPage ? $rootScope.currentPage : 1;

        ngMeta.init();
        ngMeta.setTitle('Find the Game of your life', ' | Omel Games');
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', vm.games[0].teaserBig);
        ngMeta.setTag('description', vm.games[0].description);
        ngMeta.setDefaultTag('author', 'Omel Games');

        var currentUser = $cookies.getObject('currentUser');
        if (!currentUser) {
            $location.path('/login/');
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
            $rootScope.splashing = true;
            $state.transitionTo('app.games_detail', { title: game[3] }, { reload: true, inherit: true, notify: true });
            // $state.go('app.games_detail', {
            //     title: game[3]
            // });
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