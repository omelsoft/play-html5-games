(function() {
    'use strict';

    angular
        .module('app.games', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider
            .state('app.games', {
                url: '/games',
                views: {
                    'content@app': {
                        templateUrl: 'app/main/games/games.html',
                        controller: 'GamesController as vm'
                    }
                },
                resolve: {
                    SampleData: function(msApi) {
                        return msApi.resolve('games@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/games');

        // Api
        msApiProvider.register('games', ['https://publishers.softgames.com/categories/new_games.json?p=pub-13656-13936']);

    }
})();