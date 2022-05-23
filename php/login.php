<?php

function login($id, $key){
    //$result = dbQuery("SELECT * FROM publisher WHERE id=" . $id . " AND key=" . $key);
    $result = [];
    if (sizeof($result) >= 1){
        $returnMessage = [
            "status" => "success",
            "timestamp" => time(),
            "data" => ["message" => "Logged in with id=".$id." key=".$key]
        ];

    }else{
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: Failed to log in with id=".$id." key=".$key]
        ];

    }

    return json_encode($returnMessage);

}