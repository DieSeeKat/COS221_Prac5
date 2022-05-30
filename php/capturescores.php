<?php

if(isset($_POST["submit"])){
include_once "config.php";



    $insert = "INSERT INTO chess_match(type, endMaterialDifference, avgMaterialDifference, time, increment, numMoves, victoryStatus, victoryReason, gameTime, whiteTimeLeft, blackTimeLeft, openingName, tournamentID, whitePlayerID, blackPlayerID)
    VALUES (’".$_POST["type"]."’,’".$_POST["material_difference_end"]."’,’".$_POST["material_difference_avg"]."’,’".$_POST["total_time"]."’,’".$_POST["increment"]."’,’".$_POST["total_moves"]."’,’".$_POST["victory_status"]."’,’".$_POST["victory_reason"]."’,’".$_POST["given_time"]."’,’".$_POST["white_time"]."’,’".$_POST["black_time"]."’,’".$_POST["opening_name"]."’,’".$_POST["ID_tournament"]."’,’".$_POST["ID_whitePlayer"]."’,’".$_POST["ID_blackPlayer"]."’)";

    if ($insert){
        echo "<script type= ’text/javascript’>alert(’Match scores updated successfully’);</script>";
    }
    else {
        echo "<script type= ’text/javascript’>alert(’Error: " . $insert . "<br>" . "unable to connect’);</script>";
    }
}
?>