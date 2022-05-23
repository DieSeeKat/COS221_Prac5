<?php

function signup($id, $key){
    $result = dbQuery("SELECT * FROM publisher WHERE id=" . $id . " AND key=" . $key);
    if (sizeof($result) >= 1){
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: User already exists."]
        ];

        return json_encode($returnMessage);
    }

    $result = dbQuery("INSERT into publisher (id, key) VALUES(" . $id . " , " . $key . ")");

    if ($result){
        $returnMessage = [
            "status" => "success",
            "timestamp" => time(),
            "data" => ["message" => "User created with id=" . $id . " and key=" . $key]
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