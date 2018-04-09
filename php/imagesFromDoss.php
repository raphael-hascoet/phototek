<?php

include "getImageInfo.php";
$dossierId = $args['id'];
echo json_encode(getImagesDossier($dossierId));

function getImagesDossier($Id){
    $stmt = $GLOBALS['db']->prepare('SELECT id, nom, mime FROM ' . $GLOBALS['schema'] . '.photos WHERE id_dossier = ?');
    $stmt->execute([$Id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}