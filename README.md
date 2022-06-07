# COS221_Prac5

## config.json

To use this program, please create a json file in the same directory as the js, php etc. directories.
The json file should have the following format:
`{
  "servername" : "127.0.0.1",
  "username" : "",
  "password" : "",
  "dbname" : "sports_db"
}`
Please do not include this file when pushing to the repository.

## knightschess.css

Use this stylesheet in your html pages to keep a constant style accross all pages.

## config.php

The dbQuery() function takes the SQL query as a parameter and returns an array of records if successful or a simple true or false in the case of an INSERT, UPDATE or DELETE query.

## knightschess.php

The knightschess.php file is where our api's will be sent to. 
It uses the "type" parameter to choose what to do.
Add your own case under the main switch statement in knightschess.php to use another php file (that you will have to create) to add functionality to the api.

## Hosting

Use any php server.
  - XAMPP or WAMP (For Windows)
  - MAMP (For Mac OS)
or LAMP stack on Linux.

## Using the website
### Register Users
Here you can register a user, or log in if one has already been created.

### Manage Players
Add new chess players here.

### Manage Locations
Add or remove Locations and Sites where chess events can be held

### Capture Match Results
Capture results for tournaments that have already been played.

### Upload Media
Add media for chess matches here. These will be stored on the server.

### Statistics
Insightful statistics regarding all chess matches that have been played.