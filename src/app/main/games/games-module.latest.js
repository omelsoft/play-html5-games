(function() {
    'use strict';

    angular
        .module('app.games.latest', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider
            .state('app.games', {
                url: '/games',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/games/games.latest.html',
                        controller: 'GamesController as vm'
                    }
                },
                resolve: {
                    NewGames: function(msApi) {
                        return msApi.resolve('games@get');
                    }
                },
                data: {
                    meta: {
                        'title': 'New Games',
                        'description': 'Find the Latest Games'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/games');

        // Api
        msApiProvider.register('games', ['app/data/games/games.old.json']);

    }
})();