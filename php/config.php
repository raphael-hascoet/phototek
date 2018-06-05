<?php
$dbname = "";
$host = "";

$user = "";
$pass = "";

$GLOBALS['db'] = connectionDB($dbname, $host, $user, $pass);

$GLOBALS['schema'] = "phototek";