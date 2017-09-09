(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('mobileToolbarToggle', mobileToolbarToggleDirective);

    /** @ngInject */
    function mobileToolbarToggleDirective() {
        return {
            restrict: 'E',
            scope: {
                selector: '@'
            },
            template: '<md-button class="md-icon-button md-no-ink" aria-label="Toggle"><md-icon class="material-icons list"></md-icon></md-button>',
            compile: function(tElement, attrs) {
                window.mobileTooglbarToggled = false;
                // Add class
                tElement.addClass('ms-toolbar-toggle');
                angular.element(tElement).bind('click', function(e) {
                    if (window.mobileTooglbarToggled) {
                        var selector = attrs.selector;
                        angular.element('.games.play #' + selector).removeClass('show-toolbar').addClass('hide-toolbar');
                        angular.element(this).removeClass('move-down').addClass('move-up');
                        window.mobileTooglbarToggled = false;
                    } else {
                        var selector = attrs.selector;
                        angular.element('.games.play #' + selector).removeClass('hide-toolbar').addClass('show-toolbar');
                        window.setTimeout(function() {
                            angular.element(tElement).removeClass('move-up').addClass('move-down');
                        }, 300);
                        window.mobileTooglbarToggled = true;
                    }
                });
            }
        };


    }
})();