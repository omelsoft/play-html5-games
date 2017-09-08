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
                url: '/games/:title/',
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
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/games');

    }
})();