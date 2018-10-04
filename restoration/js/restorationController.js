"use strict";

restorationApp.controller('restorationController', 
     function restorationController($scope) {
          var vm = this;
          
          vm.boyJoseph = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.firstVision = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.moroni = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.translation = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.churchToday = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.goldPlates = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.aaronicPriesthood = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };
          vm.melchizedekPriesthood = { value: true, button: "fa fa-large fa-plus-circle", text: "Read More..." };

          vm.actionClick = function(testValue){
               testValue.value = !testValue.value;
               if(testValue.value){
                    testValue.button = "fa fa-large fa-plus-circle";
                    testValue.text = "Read More...";
               } else {
                    testValue.button = "fa fa-large fa-minus-circle";
                   testValue.text = "Read Less...";
               }
          }
});