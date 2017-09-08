(function() {
    'use strict';

    angular.module('app.core')
        .directive('backButton', ['$window', '$state', backButton]);

    /** @ngInject */
    function backButton($window, $state) {
        return {
            restrict: 'A',
            scope: {
                backTo: '@',
                params: '='
            },
            link: function(scope, elem, attrs) {
                elem.bind('click', function() {
                    if (scope.backTo) {
                        if (scope.params) {
                            $state.go(scope.backTo, scope.params);
                        } else
                            $state.go(scope.backTo);
                    } else {
                        $window.history.back();
                    }
                });
            }
        };
    }

})();