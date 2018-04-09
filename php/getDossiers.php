<?php
require 'config.php';

function getDossier(){
    $stmt = $GLOBALS['db']->prepare('SELECT id, nom FROM ' . $GLOBALS['schema'] . '.dossier');
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode(getDossier());