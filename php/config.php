<?php

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "";

    readConfigFile("../config.json");

    $GLOBALS["conn"] = new mysqli($servername, $username, $password, $dbname);

    //Function to connect and send query and return results
    function dbQuery($query){
        $result = $GLOBALS["conn"]->query($query);

        if ($result instanceof mysqli_result) {

            $out_array = [];

            while ($row = $result->fetch_assoc()) {

                $out_array[] = $row;

            }

            return $out_array;

        }else{
            return $result;
        }
    }

    function readConfigFile($filename){
        if (file_exists($filename)) {
            $strJSONFileContents = file_get_contents($filename);
            $jsonArray = json_decode($strJSONFileContents, true);

            global $servername;
            global $username;
            global $password;
            global $dbname;

            $servername = $jsonArray["servername"];
            $username = $jsonArray["username"];
            $password = $jsonArray["password"];
            $dbname = $jsonArray["dbname"];
        }else {
            echo "Error: Config file not found...";
        }
    }