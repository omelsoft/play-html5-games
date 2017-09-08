(function() {
    'use strict';

    angular
        .module('app.games', [
            'app.games.detail',
            'app.games.latest'
        ])
        .config(config);

    /** @ngInject */
    function config() {}
})();