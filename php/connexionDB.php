<?php

function connectionDB($dbname, $host, $user, $pass)
{
    if (isset($dbname) && isset($host) && isset($user) && isset($pass)) {
        try {
            $db = new PDO("mysql:dbname=" . $dbname . ";host=" . $host, $user, $pass);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            $db = null;
            print ("Erreur !: " . $e->getMessage());
            die();
        }
    } else {
        $db = null;
    }
    return $db;
}