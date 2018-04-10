//======================mainController.js======================//
//                                                             //
//  Author:    Michael A Liddle                                //
//  Email:     mike@mikeliddle.com                             //
//  Website:   http://www.mikeliddle.com                       //
//                                                             //
//  The copyright to the source code and computer program(s)   //
//  herein is the property of Mike Liddle.The source code      //
//  and program(s) may be used and/or copied only with the     //
//  written permission of Mike Liddle or in accordance with    //
//  the terms and conditions stipulated in the                 //
//  agreement/contract under which the source code and         //
//  program(s) have been supplied.                             //
//                                                             //
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