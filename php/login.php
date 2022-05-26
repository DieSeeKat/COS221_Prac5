<?php

include_once "config.php";

function login($name, $key){
    $result = dbQuery("SELECT * FROM publishers WHERE publisher_name='" . $name . "' AND publisher_key='" . $key . "'");
    if (sizeof($result) >= 1){
        $returnMessage = [
            "status" => "success",
            "timestamp" => time(),
            "data" => ["message" => "Logged in with name=".$name." key=".$key]
        ];

    }else{
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: Failed to log in with name=".$name." key=".$key]
        ];

    }

    return json_encode($returnMessage);

}