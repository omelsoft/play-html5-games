(function() {
    'use strict';

    angular
        .module('omel-games')
        .run(['$rootScope', '$window', '$timeout', '$state', '$location', '$cookies', runBlock]);

    /** @ngInject */
    function runBlock($rootScope, $window, $timeout, $state, $location, $cookies) {
        // Set public pages
        var publicPages = [
            '/home/'
        ];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;


        var locationChangeSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $timeout(function() {
                // clear the CHITIKA object whenever the chate changes
                $window.CHITIKA = undefined;
                var unit = {};

                if (angular.isUndefined($window.CHITIKA)) {
                    $window.CHITIKA = {
                        'units': []
                    };
                    unit = {
                        'calltype': 'async[2]',
                        'publisher': 'omelsoft',
                        'width': 728,
                        'height': 90,
                        'sid': 'Chitika Default'
                    };
                } else {
                    unit = angular.copy($window.CHITIKA.units);
                    $window.CHITIKA = undefined;
                    $window.CHITIKA = {
                        'units': []
                    };
                }
                $window.CHITIKA.units.push(unit);
            });
        });

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function() {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function() {
            $timeout(function() {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Evaluate user if logged in
        var currentUser = $cookies.getObject('currentUser');

        if (!currentUser && restrictedPage) {
            $location.path('/home/');
        } else {
            $state.go('app.games');
        }

        // Cleanup
        $rootScope.$on('$destroy', function() {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
            locationChangeSuccess();
        });
    }
})();