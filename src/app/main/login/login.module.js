(function() {
    'use strict';

    angular
        .module('app.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider) {
        // State
        $stateProvider.state('app.login', {
            url: '/login',
            views: {
                'main@': {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller: 'MainController as vm'
                },
                'content@app.login': {
                    templateUrl: 'app/main/login/login.html',
                    controller: 'LoginController as vm'
                }
            },
            bodyClass: 'login',
            data: {
                meta: {
                    'title': 'Login | Omel Games',
                    'description': 'Login to Omel-Games to find the game that will bring happiness and took out the stress in your life.'
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/login');
    }

})();