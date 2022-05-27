<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <link rel="stylesheet" href="../css/knightschess.css">
    <link rel="stylesheet" href="../css/Analytics.css">
    <link rel="icon" href="../img/Knights%20Chess.png">
</head>
<body>
<div class="container">
    <img src="../img/Knights%20Chess-logos_transparent.png" class="logo" alt="Sorry, this image could not be loaded...">
    <div class="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label class="menu__btn" for="menu__toggle">
            <span></span>
        </label>

        <ul class="menu__box">
            <li><a class="menu__item" href="../html/home.html">Register Users</a></li>
            <li><a class="menu__item" href="#">Manage Players</a></li>
            <li><a class="menu__item" href="#">Manage Locations</a></li>
            <li><a class="menu__item" href="#">Capture Match Results </a></li>
            <li><a class="menu__item" href="#">Upload Media</a></li>
            <li><a class="menu__item" href="Analytics.php">Analytics</a></li>
        </ul>
    </div>
    <div class="queries">
        <?php include_once "config.php"?>

    </div>
    <form>
        <?php include_once "statistics.php" ?>

    </form>




</div>

</body>