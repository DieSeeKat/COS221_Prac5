<?php

include_once "config.php";

function signup($name, $key){
    $result = dbQuery("SELECT * FROM publishers WHERE publisher_name='".$name."' AND publisher_key='".$key."'");
    if (sizeof($result) >= 1){
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: User already exists."]
        ];

        return json_encode($returnMessage);
    }

    $result = dbQuery("INSERT into publishers (publisher_name, publisher_key) VALUES('" . $name . "' ,'" . $key . "')");

    if ($result){
        $returnMessage = [
            "status" => "success",
            "timestamp" => time(),
            "data" => ["message" => "User created with id=" . $name . " and key=" . $key]
        ];

    }else {
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: An unexpected database error occurred."]
        ];

    }

    return json_encode($returnMessage);

}