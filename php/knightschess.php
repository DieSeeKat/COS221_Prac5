<?php

if (!isset($_POST["type"])){

    $returnMessage = [
        "status" => "failed",
        "timestamp" => time(),
        "data" => ["message" => "ERROR: No type was specified."]
    ];

    echo json_encode($returnMessage);

    return;
}

switch ($_POST["type"]){
    //Add cases below
    default:
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: No valid type was specified."]
        ];

        echo json_encode($returnMessage);
}