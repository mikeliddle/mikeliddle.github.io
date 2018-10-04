<!DOCTYPE html>
<html ng-app="quickLaughApp">
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
<script>
    function checkStatus(){
        var query = window.location.search.substring(1);
        console.log(query);
        var vars = query.split("=");

        var flag = vars[0];
        var status = vars[1];

        if(flag == 's' && status == 1){
            alert("Successfully submitted question!");
        }
    }
</script>
<body ng-controller="quickLaughController as vm" ng-cloak>
<div class="login">
    <div class="alert alert-success alert-dismissable" ng-show="vm.success">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <p>Question successfully submitted!</p>
    </div>
    <h1>QUICK LAUGH!</h1>
    <br />
    <div>
        <p><a href="play.php"><h2><button class="button button1">Play</button></h2></a></p>
        <p><a href="host.php"><h2><button class="button button1">Host</button></h2></a></p>
        <p><a href="question.php"><h2><button class="button button1">Submit Question</button></h2></a></p>
    </div>
    <div class="alert alert-danger alert-dismissable" ng-show="vm.hasError">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <p>{{vm.errorMessage}}</p>
    </div>
</div>
</body>
</html>

