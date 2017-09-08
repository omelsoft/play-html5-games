(function() {
    'use strict';

    angular
        .module('omel-games')
        .config(config);

    /** @ngInject */
    function config($translateProvider, ngMetaProvider, $provide) {
        // Put your common app configurations here

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        ngMetaProvider.useTitleSuffix(true);
        ngMetaProvider.setDefaultTitle('Find the Game of your life');
        ngMetaProvider.setDefaultTitleSuffix(' | Omel Games');
        ngMetaProvider.setDefaultTag('author', 'Omel Games');

        $provide.decorator('masonryDirective', function($delegate) {
            var directive = $delegate[0];
            directive.link.post = directive.link.pre;
            delete(directive.link.pre);
            return $delegate;
        });
    }

})();