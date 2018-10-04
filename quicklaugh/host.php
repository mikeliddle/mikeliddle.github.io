<!DOCTYPE html>
<html ng-app="quickLaughApp">
<head>
    <title>Quicklaugh</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/mainStyle.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/quickLaughApp.js"></script>
    <script src="js/quickLaughController.js"></script>
    <link rel="icon" type="image/png" href="assets/icon.png" />
</head>
<body ng-controller="quickLaughController as vm" ng-cloak>
    <div class="waiting">
        <h1>QUICK LAUGH</h1>
        <div ng-show="vm.roomCodeSubmitted">
            <h2>Room Code: <strong>{{vm.roomCode | uppercase }}</strong></h2>
            <h3>Click "START!" when you are ready to start.</h3>
            <h3><button class="button button1" type="submit" ng-click="">START!</button></h3>
        </div>
        <div ng-hide="vm.roomCodeSubmitted">
            <form ng-submit="vm.updateRoomCode()">
                <h3>Enter a Room Code(Limit 10 characters): </h3>
                <h3><input class="roomCode" maxlength="10" type="text" ng-model="vm.roomCode" /></h3>
                <h3><button class="button button1" type="submit" ng-click="vm.updateRoomCode()">Enter!</button></h3>
            </form>
        </div>
    </div>
</body>
</html>

