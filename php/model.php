<?php

require 'config.php';

function getIdPhotosAll()
{
    $stmt = $GLOBALS['db']->query('SELECT id FROM ' . $GLOBALS['schema'] . '.photos');
    $idP = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return $idP;
}

function getIdDossiersAll()
{
    $stmt = $GLOBALS['db']->query('SELECT id FROM ' . $GLOBALS['schema'] . '.dossier');
    $idD = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return $idD;
}

function getIdAlbumsAll()
{
    $stmt = $GLOBALS['db']->query('SELECT id FROM ' . $GLOBALS['schema'] . '.albums');
    $idA = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return $idA;
}

function getIdTagsAll()
{
    $stmt = $GLOBALS['db']->query('SELECT id FROM ' . $GLOBALS['schema'] . '.tags');
    $idT = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return $idT;
}

function getPhotosWhereNom($nom)
{
    $stmt = $GLOBALS['db']->prepare('SELECT id FROM ' . $GLOBALS['schema'] . '.photos WHERE nom = ?');
    $stmt->execute([$nom]);
    $photos = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return $photos;
}

function getPhotosInFolder($folder){
    $stmt = $GLOBALS['db']->prepare('SELECT id FROM ' . $GLOBALS['schema'] . '.photos WHERE id_dossier = ?');
    $stmt->execute([$folder]);
    $photos = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return $photos;
}

function dossierIsDef($nom){
    $stmt = $GLOBALS['db']->prepare('SELECT id FROM ' . $GLOBALS['schema'] . '.dossier WHERE nom = ?');
    $stmt->execute([$nom]);
    $dossier = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
    return count($dossier) != 0;
}
	