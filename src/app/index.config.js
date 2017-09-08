(function() {
    'use strict';

    angular
        .module('omel-games')
        .config(config);

    /** @ngInject */
    function config($translateProvider, ngMetaProvider) {
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
    }

})();