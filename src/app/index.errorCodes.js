(function() {
    'use strict';

    angular
        .module('omel-games')
        .factory('ErrorCodes', ErrorCodes);

    /** @ngInject */
    function ErrorCodes() {
        var codes = [{
                code: 'auth/invalid-email',
                title: 'Invalid Email'
            },
            { code: 'auth/user-disabled', title: 'User Disabled' },
            { code: 'auth/user-not-found', title: 'User Not Found' },
            { code: 'auth/wrong-password', title: 'Wrong Password' },
            { code: 'auth/account-exists-with-different-credential', title: 'Account Exists' },
            { code: 'auth/auth-domain-config-required', title: 'Auth Domain Config Required' },
            { code: 'auth/cancelled-popup-request', title: 'Popup Request Cancelled' },
            { code: 'auth/operation-not-allowed', title: 'Operation not Allowed' },
            { code: 'auth/operation-not-supported-in-this-environment', title: 'Operation not Supported' },
            { code: 'auth/popup-blocked', title: 'Popup Blocked' },
            { code: 'auth/popup-closed-by-user', title: 'Popup Closed by User' },
            { code: 'auth/unauthorized-domain', title: 'Un-authorized Domain' },
            { code: 'auth/credential-already-in-use', title: 'Credential Already in Use' },
            { code: 'auth/email-already-in-use', title: 'Email Already in Use' },
            { code: 'auth/timeout', title: 'Timeout' },
            { code: 'auth/invalid-credential', title: 'Invalid Credential' },
            { code: 'auth/invalid-verification-code', title: 'Invalid Verification Code' },
            { code: 'auth/invalid-verification-id', title: 'Invalid Verification ID' },
            { code: 'auth/internal-error', title: 'Internal Error' }
        ];

        var service = {};
        service.convertCodeToTitle = convertCodeToTitle;

        return service;

        function convertCodeToTitle(code) {
            var title = codes.filter(function(codes) {
                return codes.code === code;
            }).map(function(codex) {
                return codex.title;
            });
            return title ? title[0] : 'Error';
        }
    }

})();