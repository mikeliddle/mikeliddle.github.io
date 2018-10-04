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
<script>
    function resizeTextArea(){

        var textArea = document.getElementById('questionBox');
        var length = textArea.value.length;
        var cols = textArea.offsetWidth / 11;
        textArea.rows = length/cols + 1;
        if(textArea.rows == 1){
            textArea.rows = 2;
        }
    }

    function validateForm() {
        if(document.getElementById('questionBox').value == ""){
            return false;
        }
        return true;
    }
</script>

<body ng-controller="quickLaughController as vm" ng-cloak>
<div class="container">
    <h1>QUICK LAUGH!</h1>
    <div class="qContainer" ng-hide="vm.hasName">
        <form ng-submit="vm.submitQuestion()" action="submitQuestion.php" onsubmit="return validateForm()" method="post">
            <h1>Enter Question: </h1>
            <br/>
            <textarea name="q" class="question" id="questionBox" type="text" ng-model="vm.question" onkeypress="resizeTextArea()" ></textarea>
            <h2><button class="button button1" type="submit" ng-click="vm.submitQuestion()">Submit!</button></h2>
        </form>
    </div>
    <div class="alert alert-danger alert-dismissable" ng-show="vm.hasError">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <p>{{vm.errorMessage}}</p>
    </div>
    <div></div>
</div>
</body>
</html>

