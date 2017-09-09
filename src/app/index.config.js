(function() {
    'use strict';

    angular
        .module('omel-games')
        .config(config);

    /** @ngInject */
    function config($translateProvider, $httpProvider, ngMetaProvider, $provide) {
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

        $httpProvider.interceptors.push(function($q, $rootScope, $templateCache) {
            var AjaxLoadingCount = 0;
            return {
                request: function(config) {
                    // console.log("[config.interceptorService] request config", config);
                    if (++AjaxLoadingCount === 1) {
                        if (!$templateCache.get(config.url)) {
                            $rootScope.$broadcast('AjaxLoading:Progress');
                        }
                    }
                    return config || $q.when(config);
                },
                requestError: function(rejection) {
                    // console.log("[config.interceptorService] requestError rejection", rejection);
                    if (--AjaxLoadingCount === 0) $rootScope.$broadcast('AjaxLoading:Finish');
                    return $q.reject(rejection);
                },
                response: function(response) {
                    // console.log("[config.interceptorService] response response", response);
                    if (--AjaxLoadingCount === 0) $rootScope.$broadcast('AjaxLoading:Finish');
                    return response || $q.when(response);
                },
                responseError: function(rejection) {
                    // console.log("[config.interceptorService] responseError rejection", rejection);
                    if (--AjaxLoadingCount === 0) $rootScope.$broadcast('AjaxLoading:Finish');
                    return $q.reject(rejection);
                }
            };
        });

    }

})();