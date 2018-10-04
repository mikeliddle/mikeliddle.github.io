"use strict";

quickLaughApp.controller('quickLaughController',
    function quickLaughController($scope, $window) {
        var vm = this;

        //message must be in all caps, limit of 10 characters.
        vm.message = "JOE COOL";
        vm.roomCode = "";
        vm.name = "";
        vm.errorMessage = "";

        vm.question = "";

        vm.hasName = false;
        vm.hasError = false;
        vm.notWaiting = true;
        vm.success = false;
        vm.roomCodeSubmitted = false;

        vm.changeIfRoomCodeMatch = function () {
            if (vm.roomCode.toUpperCase() == vm.message) {
                vm.hasError = false;
                vm.notWaiting = false;
                vm.changePage();
            }
            else {
                vm.errorMessage = "Invalid Room Code!";
                vm.hasError = true;
            }
        };

        vm.updateRoomCode = function () {
            if(vm.roomCode.toUpperCase() != ""){
                vm.roomCodeSubmitted = true;
                vm.roomCode = vm.roomCode.toUpperCase();
                //send roomcode to server.
            } else {
                vm.roomCodeSubmitted = false;
                vm.hasError = true;
            }
        };

        vm.checkStatus = function () {
            var query = $window.location.search.substring(1);
            var vars = query.split("=");

            var flag = vars[0];
            var status = vars[1];

            if(flag == 's' && status == 1){
                vm.success = true;
            } else if(flag == 'q' && status == 1){
                vm.success = false;
                vm.hasError = true;
                vm.errorMessage = "Question already exists in Database.";
            }
        };

        vm.checkStatus();

        vm.validateName = function () {
            if (vm.name != "") {
                vm.hasName = true;
            }
            else {
                vm.hasName = false;
            }
        };
        vm.changePage = function () {
            vm.hasName = true;
        };

    });