<?php
include_once "config.php";

//QUERIES
function playersRanked(): array
{
    return dbQuery("SELECT title, firstname, lastname, country, rating ".
        "FROM chess_player ".
        "ORDER BY rating DESC");
}


function playersAbleToJoinTournament():array
{
    return dbQuery("SELECT cp.title, cp.firstname, cp.lastname, cp.country, cp.rating, " .
        "ct.id AS tournamentID " .
        "FROM chess_player AS cp " .
        "INNER JOIN chess_tournament_participation AS ctp " .
        "ON cp.id=ctp.playerID " .
        "INNER JOIN chess_tournament AS ct " .
        "ON ctp.tournamentID=ct.id " .
        "WHERE (cp.rating<ct.ratingUpperLimit) AND (cp.rating>ct.ratingLowerLimit) " .
        "ORDER BY cp.lastname ASC");
}


function matchesPerTournament():array
{
    return dbQuery("SELECT id, "."
       (SELECT firstname
        FROM chess_player AS cp
        INNER JOIN chess_match AS cm
    on cp.id = cm.whitePlayerID) AS whiteName,
       (SELECT lastname
        FROM chess_player AS cp
        INNER JOIN chess_match AS cm
        on cp.id = cm.whitePlayerID) AS whiteSurname,
       (SELECT firstname
        FROM chess_player AS cp
        INNER JOIN chess_match AS cm
        on cp.id = cm.blackPlayerID) AS blackName,
       (SELECT lastname
        FROM chess_player AS cp
        INNER JOIN chess_match AS cm
        on cp.id = cm.blackPlayerID) AS blackSurname
        FROM chess_match");


}
//matchesPerTournament();

function playerOpenings():array
{
    return dbQuery("SELECT cp.title, cp.firstname, cp.lastname, cp.country, cp.rating, openingName ".
        "FROM chess_player AS cp " .
        "LEFT JOIN chess_match cm " .
        "ON cp.id = cm.blackPlayerID");

}


function openingUsedInMatch():array
{
    return dbQuery("SELECT cm.id, co.openingName, co.openingMove ".
        "FROM chess_match AS cm ".
        "INNER JOIN chess_opening co ".
        "ON cm.openingName = co.openingName");
}


function MatchAnalysis():array
{
    return dbQuery("SELECT cm.id, cm.type, "."
       (SELECT firstname
        FROM chess_player AS cp
        INNER JOIN chess_match AS cm
        on cp.id = cm.whitePlayerID) AS whitePlayer,
       (SELECT firstname
        FROM chess_player AS cp
        INNER JOIN chess_match AS cm
        on cp.id = cm.blackPlayerID) AS blackPlayer, 
       cm.victoryStatus, 
       cm.victoryReason,
       cm.gameTime
        FROM chess_match AS cm");
}


function mostCommonOpenings():array{
    return dbQuery("SELECT openingName, count(*) AS Count "." 
        FROM chess_match
        GROUP BY openingName
        ORDER BY count(*) DESC");

}


function createTable($array, $title){
    if (count($array) > 0):
        echo "<h2>".$title."</h2>";
        ?>
<table>
  <thead>
    <tr>
      <th><?php echo implode('</th><th>', array_keys(current($array))); ?></th>
    </tr>
  </thead>
  <tbody>
<?php foreach ($array as $row): array_map('htmlentities', $row); ?>
    <tr>
      <td><?php echo implode('</td><td>', $row); ?></td>
    </tr>
<?php endforeach; ?>
  </tbody>
</table>

<?php endif;
}

$playersRanked = playersRanked();
$playersAbleToJoinTournament = playersAbleToJoinTournament();
$playerOpenings = playerOpenings();
$openingUsedInMatch = openingUsedInMatch();
$MatchAnalysis = MatchAnalysis();
$mostCommonOpenings = mostCommonOpenings();


createTable($playersRanked, "Players Ranked");

createTable($playersAbleToJoinTournament, "Players able to join specific tournaments");

createTable($playerOpenings, "Which openings do players prefer");

createTable($openingUsedInMatch, "Which openings were used in which matches");

createTable($mostCommonOpenings, "Openings and how often they were used");

createTable($MatchAnalysis, "Deeper analysis of matches");


