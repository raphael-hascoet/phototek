<?php
$dbname = "dbtest";
$host = "localhost";

$user = "root";
$pass = "";

$GLOBALS['db'] = connectionDB($dbname, $host, $user, $pass);

$GLOBALS['schema'] = "phototek";