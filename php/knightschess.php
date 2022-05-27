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
        echo login($_POST["name"], $_POST["key"]);
        break;
    case "signup":
        echo signup($_POST["name"], $_POST["key"]);
        break;
    case "locations_list":
        echo json_encode(dbQuery("SELECT * FROM locations"));
        break;
    case "sites_list":
        echo json_encode(dbQuery("SELECT * FROM sites"));
        break;
    case "getKeyID":
        echo json_encode(dbQuery("SELECT id FROM publishers WHERE publisher_key = '".$_POST['key']."'"));
        break;
    case "insert_location":
        echo json_encode(dbQuery("INSERT INTO locations (city, state, country, timezone, latitude, longitude, country_code) VALUES ('".$_POST['city']."', '".$_POST['state']."', '".$_POST['country']."', '".$_POST['timezone']."', '".$_POST['latitude']."', '".$_POST['longitude']."', '".$_POST['country_code']."')"));
        break;
    case "remove_location":
        echo json_encode(dbQuery("DELETE FROM locations WHERE (city='".$_POST['city']."' AND state='".$_POST['state']."' AND country='".$_POST['country']."' AND timezone='".$_POST['timezone']."' AND latitude='".$_POST['latitude']."' AND longitude='".$_POST['longitude']."' AND country_code='".$_POST['country_code']."')"));
        break;
    default:
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: No valid type was specified."]
        ];

        echo json_encode($returnMessage);
}