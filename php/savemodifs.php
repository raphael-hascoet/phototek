<?php

include 'getImageInfo.php';

$photo = getInfoPhoto($args['id']);

$pathTmp = $_SERVER['DOCUMENT_ROOT'] . '/phototek/tmp/tmpimage.jpg';
$pathImage = $_SERVER['DOCUMENT_ROOT'] . '/phototek/upload/' . $photo['id_dossier'] . '/' . $photo['id'] . '.' . $photo['mime'];

copy($pathTmp, $pathImage);

echo $photo['id_dossier'] . '/' . $photo['id'] . '.' . $photo['mime'];
