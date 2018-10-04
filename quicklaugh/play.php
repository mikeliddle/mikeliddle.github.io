<!DOCTYPE html>
<html ng-app="quickLaughApp">
<title>Quicklaugh</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
<link rel="stylesheet" href="assets/mainStyle.css">
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/quickLaughApp.js"></script>
<script src="js/quickLaughController.js"></script>
<link rel="icon" type="image/png" href="assets/icon.png" />

<body ng-controller="quickLaughController as vm" ng-cloak>
    <div class="login">
        <h1>QUICK LAUGH!</h1>
        <div ng-hide="vm.hasName">
            <form ng-submit="vm.validateName()">
                <H1>Name: <input class="roomCode" maxlength="15" type="text" ng-model="vm.name" /></H1>
                <h2><button class="button button1" type="submit" ng-click="vm.validateName()">Ready</button></h2>
            </form>
        </div>
        <div ng-show="vm.hasName && vm.notWaiting">
            <form ng-submit="vm.changeIfRoomCodeMatch()">
                <h1>Welcome {{vm.name.toUpperCase()}}!</h1>
                <H1>Room Code: <input class="roomCode" maxlength="10" type="text" ng-model="vm.roomCode" /></H1>
                <h2><button class="button button1" type="submit" ng-click="vm.changeIfRoomCodeMatch()">Join!</button></h2>
            </form>
        </div>
        <div ng-hide="vm.notWaiting">
            <h1>Waiting for others to join.</h1>
            <br />
            <img class="bearGif" src="assets/dancing-bear-o.gif" />
        </div>
        <div class="alert alert-danger alert-dismissable" ng-show="vm.hasError">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <p>{{vm.errorMessage}}</p>
        </div>
    </div>
</body>
</html>

