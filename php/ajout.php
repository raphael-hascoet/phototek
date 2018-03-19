<?php
require 'config.php';

    function addTags($tabTags){ //en assumant que l'on envoie des arrays aux fonctions du modèle
        $GLOBALS['db']->exec('INSERT INTO ' . $GLOBALS['schema'] . '.tags VALUES (\''.$tabTags['label'].'\')');
    }

    function addPhoto($tabPhoto){ //en assumant que l'on envoie des arrays aux fonctions du modèle
        return $GLOBALS['db']->exec('INSERT INTO ' . $GLOBALS['schema'] . '.photos (nom, mime, id_dossier) VALUES (\''.$tabPhoto['nom'].'\',\''.$tabPhoto['mime'].'\',\''.$tabPhoto['id_dossier'].'\')');
    }

    function addDossier($tabDossier){ //en assumant que l'on envoie des arrays aux fonctions du modèle
        return $GLOBALS['db']->exec('INSERT INTO ' . $GLOBALS['schema'] . '.dossier (nom) VALUES (\''.$tabDossier['nom'].'\')');
    }

    function addAlbums($tabAlbums){ //en assumant que l'on envoie des arrays aux fonctions du modèle
        $timestamp=time();
        $GLOBALS['db']->exec('INSERT INTO ' . $GLOBALS['schema'] . '.albums VALUES (\''.$tabAlbums['nom'].'\',\''.$timestamp.'\',\''.$timestamp.'\',\''.$tabAlbums['description'].'\',\''.$tabAlbums['publique'].'\')');
    }

