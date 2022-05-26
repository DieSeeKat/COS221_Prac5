<?php

include_once "config.php";

function createLocationAddressPair($building, $street, $country){
    dbQuery("INSERT into locations (country_code) VALUES ('".$country."')");
    $locations = dbQuery("SELECT id FROM locations");
    $location_id = $locations[sizeof($locations)-1]["id"];
    dbQuery("INSERT INTO addresses (location_id, building, street, country) VALUES ('".$location_id."','".$building."','".$street."','".$country."')");
    return $location_id;
}

$target_dir = "assets/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

$publishers = dbQuery("SELECT id FROM publishers WHERE publisher_key = '" . $_POST["publisher"] . "'");
if (sizeof($publishers) == 0){
    $returnMessage = [
        "status" => "failed",
        "timestamp" => time(),
        "data" => ["message" => "ERROR: No such publisher exists."]
    ];

    echo json_encode($returnMessage);
}
$publisher_id = $publishers[0]["id"];

$locations = dbQuery("SELECT locations.id FROM locations INNER JOIN addresses a on locations.id = a.location_id WHERE building='".$_POST["building"]."' AND street='".$_POST["street"]."' AND country='".$_POST["country"]."'");
$location_id = 0;
if (sizeof($locations) == 0){
    $location_id = createLocationAddressPair($_POST["building"], $_POST["street"], $_POST["country"]);
}else{
    $location_id = $locations[0]["id"];
}

dbQuery("INSERT into source (path) VALUES ('".$target_file."')");
$source_id  = dbQuery("SELECT id FROM source WHERE path = '" . $target_file . "'")[0]["id"];

dbQuery("INSERT into media (source_id, publisher_id, credit_id, creation_location_id) VALUES (".$source_id.",".$publisher_id.",".$publisher_id.",".$location_id.")");

$type = 0;
if ($_POST["type"] == "tournament"){
    $events = dbQuery("SELECT events.id FROM chess_tournament INNER JOIN events on chess_tournament.event = events.id WHERE chess_tournament.name = '". $_POST["name"] ."'");
    if (sizeof($events) == 0){
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: No such tournament exists."]
        ];

        echo json_encode($returnMessage);
    }
    $type = $events[0]["id"];
}else{
    //Get first and last name

    $names = explode(" ", $_POST["name"]);

    $persons = dbQuery("SELECT id FROM chess_player INNER JOIN persons on chess_player.personID = persons.id WHERE firstname = '".$names[0]."' and lastname = '".$names[1]."'");
    if (sizeof($persons) == 0){
        $returnMessage = [
            "status" => "failed",
            "timestamp" => time(),
            "data" => ["message" => "ERROR: No such player exists."]
        ];

        echo json_encode($returnMessage);
    }
    $type = $persons[0]["id"];
}

//Find media_id
$media_id = dbQuery("SELECT id FROM media WHERE source_id= ". $source_id)[0]["id"];

if ($_POST["type"] == "tournament") {
    dbQuery("INSERT into events_media (event_id, media_id) VALUES (" . $type . "," . $media_id . ")");
}else{
    dbQuery("INSERT into persons_media (person_id, media_id) VALUES (" . $type . "," . $media_id . ")");
}

//Add file to path
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

if (!isset($_POST["tournament"])) {
    $returnMessage = [
        "status" => "failed",
        "timestamp" => time(),
        "data" => ["message" => "ERROR: No tournament is specified."]
    ];

    echo json_encode($returnMessage);
    return;
}

$check = getimagesize($_FILES["file"]["tmp_name"]);
if($check == false) {
    $returnMessage = [
        "status" => "failed",
        "timestamp" => time(),
        "data" => ["message" => "ERROR: No image was chosen."]
    ];

    echo json_encode($returnMessage);
    return;
}

move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

//Return

$returnMessage = [
    "status" => "success",
    "timestamp" => time(),
    "data" => ["message" => "Media uploaded"]
];

echo json_encode($returnMessage);