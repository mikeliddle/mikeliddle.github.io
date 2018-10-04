<?php

session_start();

$question = $_POST["q"];

$serverName = "localhost";
$databaseName = "mikelidd_quicklaugh";
$userName = "mikelidd_quest";
$password = "question757575";

$mysqli = new mysqli($serverName, $userName, $password, $databaseName);

if ($mysqli->connect_errno) {
    echo "DB connection failed.<br>";
    exit();
}

$insertQuery = "INSERT into questions (Question, UseCount, Category) VALUES ('" . $question . "','0','1')";

if (!$addedtoqueue = $mysqli->query($insertQuery)) {
    header('Location: http://quicklaugh.mikeliddle.com/question.php?question=2');
    $mysqli->close();
    exit();
}

$mysqli->close();
header('Location: http://quicklaugh.mikeliddle.com/home.php?s=1');
exit();

//echo json_encode($output);

?>