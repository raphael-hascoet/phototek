<?php
include 'getImageInfo.php';
include 'model.php';

$photoId = $args['id'];

$imagesNames = [];


$photo = getInfoPhoto($photoId);

$idImages = getPhotosInFolder($photo['id_dossier']);

$urlImages = [];

foreach ($idImages as $idImage){
    $urlImages[] = $photo['id_dossier'] . "/" . $idImage . "." . getInfoPhoto($idImage)['mime'];
}

echo json_encode($urlImages);