(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('playGame', playGameDirective)
        .directive('closeGame', closeGameDirective);

    /** @ngInject */
    function playGameDirective() {
        return {
            restrict: 'A',
            scope: {
                gameWrapper: '@',
                button: '@'
            },
            link: function(scope, elem, attrs) {
                angular.element(elem).bind('click', function(e) {
                    angular.element(scope.gameWrapper).addClass('show');
                    angular.element(scope.button).addClass('hide');
                });
            }
        };
    }

    /** @ngInject */
    function closeGameDirective() {
        return {
            restrict: 'A',
            scope: {
                gameWrapper: '@',
                button: '@'
            },
            link: function(scope, elem, attrs) {
                angular.element(elem).bind('click', function(e) {
                    angular.element(scope.gameWrapper).removeClass('show');
                    angular.element(scope.button).removeClass('hide');
                });
            }
        };
    }
})();