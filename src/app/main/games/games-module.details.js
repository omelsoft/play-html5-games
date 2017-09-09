(function() {
    'use strict';

    angular
        .module('app.games.detail', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider
            .state('app.games_detail', {
                url: '/game/:title/',
                params: {
                    title: null
                },
                views: {
                    'content@app': {
                        templateUrl: 'app/main/games/games.details.html',
                        controller: 'GamesDetailsController as vm'
                    }
                },
                bodyClass: 'games play',
                resolve: {
                    NewGames: function(msApi) {
                        return msApi.resolve('games@get');
                    }
                }
            })
            .state('app.games_play', {
                url: '/game/:title/play',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/games/games.details.html',
                        controller: 'GamePlayController as vm'
                    }
                },
                bodyClass: 'games play',
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