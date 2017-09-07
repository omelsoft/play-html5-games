(function() {
    'use strict';

    angular
        .module('app.games')
        .controller('GamesController', GamesController);

    /** @ngInject */
    function GamesController(NewGames) {
        var vm = this;

        // Data
        vm.games = NewGames.games;
        console.log(vm.games);
        // Methods


    }
})();