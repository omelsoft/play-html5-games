(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('leaderboardAdTop', ['$timeout', leaderboardAdTopDirective]);

    /** @ngInject */
    function leaderboardAdTopDirective($timeout) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, elem, attr) {
                angular.element(elem).append('<div id="chitikaAdBlock-0"></div>');
            }
        };


    }
})();