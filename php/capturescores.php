<?php
include_once "config.php";


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


    $sql = dbQuery("INSERT INTO chess_match(type, endMaterialDifference, avgMaterialDifference, time, increment, numMoves, victoryStatus, victoryReason, gameTime, whiteTimeLeft, blackTimeLeft, openingName, tournamentID, whitePlayerID, blackPlayerID)
    VALUES ('$type','$endMaterialDifference','$avgMaterialDifference','$time','$increment','$numMoves','$victoryStatus','$victoryReason','$gameTime','$whiteTimeLeft','$blackTimeLeft','$openingName','$tournamentID','$whitePlayerID','$blackPlayerID')");

    if ($sql){
        $returnMessage = [
            "status" => "success",
            "timestamp" => time(),
            "data" => ["message" => "Match results successfully recorded."]
        ];

        echo json_encode($returnMessage);
    }
    else {
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: Problem while recording match results."]
        ];

        echo json_encode($returnMessage);
}
