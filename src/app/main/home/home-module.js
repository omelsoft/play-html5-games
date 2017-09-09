(function() {
    'use strict';

    angular
        .module('app.home', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider) {
        // State
        $stateProvider.state('app.home', {
            url: '/home/',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.home': {
                    templateUrl: 'app/main/home/home.html',
                    controller: 'HomeController as vm'
                }
            },
            bodyClass: 'login home',
            resolve: {
                HomeGame: function(msApi) {
                    return msApi.resolve('home@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/home');

        // Api
        msApiProvider.register('home', ['app/data/games/home.json']);
    }

})();