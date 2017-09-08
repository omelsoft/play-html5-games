(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', ['$cookies', '$location', 'Firebase', 'Auth', '$mdDialog', 'ErrorCodes', 'ngMeta', LoginController]);

    /** @ngInject */
    function LoginController($cookies, $location, Firebase, Auth, $mdDialog, ErrorCodes, ngMeta) {
        var vm = this;

        var currentUser = $cookies.getObject('currentUser');

        if (currentUser) {
            $location.path('games');
        }

        ngMeta.init();
        ngMeta.setTitle('Login to find the Game of your life', ' | Omel Games');
        ngMeta.setTag('author', 'Omel Games');
        ngMeta.setTag('image', 'http://placeholder.com/abc.jpg');
        ngMeta.setDefaultTag('author', 'Omel Games');

        // any time auth state changes, add the user data to scope
        Auth.$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {

                var user = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    providerId: firebaseUser.providerData[0].providerId,
                    group: 'user'
                };

                $cookies.putObject('currentUser', user);
                $location.path('/games');
            }
        });

        // Methods
        vm.signInWithGoogle = signInWithGoogle;
        vm.signInWithFacebook = signInWithFacebook;
        vm.showAlertDialog = showAlertDialog;

        /**
         * Sign-in using Google Account
         * 
         */
        function signInWithGoogle() {
            var provider = new Firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            Firebase.auth().signInWithPopup(provider).then(function(firebaseUser) {

                // The signed-in user info.
                var user = {
                    uid: firebaseUser.user.uid,
                    email: firebaseUser.user.email,
                    displayName: firebaseUser.user.displayName,
                    photoURL: firebaseUser.user.photoURL,
                    providerId: firebaseUser.user.providerData[0].providerId,
                    group: 'user'
                };

                $cookies.putObject('currentUser', user);

            }).catch(function(error) {
                // Handle Errors here.
                vm.showAlertDialog(ErrorCodes.convertCodeToTitle(error.code), error.message);
            });
        }

        /**
         * Sign-in using Facebook account
         * 
         */
        function signInWithFacebook() {
            var provider = new Firebase.auth.FacebookAuthProvider();
            provider.addScope('email');
            provider.addScope('user_friends');
            provider.addScope('public_profile');

            Firebase.auth().signInWithPopup(provider).then(function(firebaseUser) {
                // The signed-in user info.
                var user = {
                    uid: firebaseUser.user.uid,
                    email: firebaseUser.user.email,
                    displayName: firebaseUser.user.displayName,
                    photoURL: firebaseUser.user.photoURL,
                    providerId: firebaseUser.user.providerData[0].providerId,
                    group: 'user'
                };

                $cookies.putObject('currentUser', user);

            }).catch(function(error) {
                vm.showAlertDialog(ErrorCodes.convertCodeToTitle(error.code), error.message);
            });
        }

        /**
         * Shows an alert message
         * 
         * @param {any} title 
         * @param {any} message 
         */
        function showAlertDialog(title, message) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title(title)
                .textContent(message)
                .ariaLabel('Alert Dialog')
                .ok('OK')
            );
        }
    }
})();