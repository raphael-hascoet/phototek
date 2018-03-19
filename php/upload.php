<?php

include 'ajout.php';
include 'model.php';

$db = $GLOBALS['db'];

$tmp = scandir('../tmp');

$folder = $args['folder'];

if (!dossierIsDef($folder)) {
    if(addDossier(array("nom" => $folder))) {
        $folderId = $db->lastInsertId();
        mkdir('../upload/' . $folderId);
        echo "Création du dossier " . $folder . ", id ". $folderId . "\n";
    } else {
        echo "Erreur sur la création de dossier";
        echo print_r($db->errorInfo());
        exit;
    }
}

foreach ($tmp as $img) {
    if ($img[0] != '.') {
        $mime = explode(".", $img)[1];
        $photo = array("nom" => $img, "mime" => $mime, "id_dossier" => $folderId);
        if(addPhoto($photo)){
            rename('../tmp/' . $img, '../upload/' . $folderId . '/' . $db->lastInsertId() . '.' . $mime);
            echo "Ajout de la photo " . $img . ", id " . $db->lastInsertId() . ' dans le dossier ' . $folderId . "\n";
        } else {
            echo "Erreur sur l'ajout de photos depuis tmp";
            echo print_r($db->errorInfo());
        }
    }
}
