(function() {
    'use strict';

    angular
        .module('app.games.detail', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider) {
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
                data: {
                    meta: {
                        'title': 'New Games',
                        'description': 'Find the Latest Games'
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
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/games');

    }
})();