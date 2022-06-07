<?php

include_once "config.php";
if(isset($_POST["submit"])){


    $type = $_POST["type"];
    $endMaterialDifference = $_POST["material_difference_end"];
    $avgMaterialDifference = $_POST["material_difference_avg"];
    $time = $_POST["total_time"];
    $increment = $_POST["increment"];
    $numMoves = $_POST["total_moves"];
    $victoryStatus = $_POST["victory_status"];
    $victoryReason = $_POST["victory_reason"];
    $gameTime = $_POST["given_time"];
    $whiteTimeLeft = $_POST["white_time"];
    $blackTimeLeft = $_POST["black_time"];
    $openingName = $_POST["opening_name"];
    $tournamentID = $_POST["ID_tournament"];
    $whitePlayerID = $_POST["ID_whitePlayer"];
    $blackPlayerID = $_POST["ID_blackPlayer"];


    $sql = "INSERT INTO chess_match(type, endMaterialDifference, avgMaterialDifference, time, increment, numMoves, victoryStatus, victoryReason, gameTime, whiteTimeLeft, blackTimeLeft, openingName, tournamentID, whitePlayerID, blackPlayerID)
    VALUES ('$type','$endMaterialDifference','$avgMaterialDifference','$time','$increment','$numMoves','$victoryStatus','$victoryReason','$gameTime','$whiteTimeLeft','$blackTimeLeft','$openingName','$tournamentID','$whitePlayerID','$blackPlayerID')";

    if ($sql){
        echo "<script type= ’text/javascript’>alert(’Match scores updated successfully’);</script>";
    }
    else {
        echo "<script type= ’text/javascript’>alert(’Error: " . $sql . "<br>" . "unable to connect’);</script>";
    }
}
