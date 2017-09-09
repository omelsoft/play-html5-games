(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('leaderboardAdTop', ['$timeout', '$window', leaderboardAdTopDirective]);

    /** @ngInject */
    function leaderboardAdTopDirective($timeout, $window) {
        return {
            restrict: 'A',
            scope: {},
            link: function(scope, elem, attr) {
                $timeout(function() {
                    var d = document,
                        jsid = 'chitikaJSLBAd';
                    var u = '<div id="chitikaAdBlock-0"></div>';
                    var s = d.createElement('script');
                    s.id = jsid;
                    s.type = 'text/javascript';
                    s.src = '//cdn.chitika.net/getads.js';

                    angular.element(elem).append(u);
                    $timeout(function() {
                        angular.element(elem).append(s);
                    }, 100);
                });
            }
        };


    }
})();