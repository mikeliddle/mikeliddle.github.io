/**
 * Created by Mike Liddle on 11-Feb-17.
 */
"use strict";

mainApp.controller('mainController',
    function mainController($scope) {
        var vm = this;

        vm.resume = { value: true, button: "fa fa-large fa-plus-circle w3-margin-right w3-text-deep-orange", text: "See More..." };

        vm.actionClick = function(testValue){
            testValue.value = !testValue.value;
            if(testValue.value){
                testValue.button = "fa fa-large fa-plus-circle w3-margin-right w3-text-deep-orange";
                testValue.text = "See More...";
            } else {
                testValue.button = "fa fa-large fa-minus-circle w3-margin-right w3-text-deep-orange";
                testValue.text = "See Less...";
            }
        }
    });