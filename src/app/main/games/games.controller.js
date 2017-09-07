(function() {
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', GamesController);

    /** @ngInject */
    function GamesController(SampleData) {
        var vm = this;

        // Data
        vm.helloText = SampleData.data.helloText;

        // Methods

        //////////
    }
})();