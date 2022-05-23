<?php

include_once "login.php";
include_once "signup.php";

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
    case "login":
        echo login($_POST["id"], $_POST["key"]);
        break;
    case "signup":
        echo signup($_POST["id"], $_POST["key"]);
        break;
    default:
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: No valid type was specified."]
        ];

        echo json_encode($returnMessage);
}