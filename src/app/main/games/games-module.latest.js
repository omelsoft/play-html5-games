(function() {
    'use strict';

    angular
        .module('app.games.latest', [])
        .config(['$stateProvider', '$translatePartialLoaderProvider', 'msApiProvider', config]);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {

        // State
        $stateProvider
            .state('app.games', {
                url: '/latest/',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/games/games.latest.html',
                        controller: 'GamesController as vm'
                    }
                },
                bodyClass: 'games latest',
                resolve: {
                    NewGames: function(msApi) {
                        return msApi.resolve('games@get');
                    }
                }
            })
            .state('app.games_page', {
                url: '/latest/page-:page',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/games/games.latest.html',
                        controller: 'GamesPageController as vm'
                    }
                },
                bodyClass: 'games paged',
                resolve: {
                    NewGames: function(msApi) {
                        return msApi.resolve('games@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/games');

        // Api
        msApiProvider.register('games', ['app/data/games/games.json']);

    }
})();