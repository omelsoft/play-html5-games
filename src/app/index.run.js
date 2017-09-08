(function() {
    'use strict';

    angular
        .module('omel-games')
        .run(['$rootScope', '$timeout', '$state', '$location', '$cookies', runBlock]);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, $location, $cookies) {
        // Set public pages
        var publicPages = [
            '/login/'
        ];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;

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
            $location.path('/login/');
        } else {
            $state.go('app.games');
        }

        // Cleanup
        $rootScope.$on('$destroy', function() {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();