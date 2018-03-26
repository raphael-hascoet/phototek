<?php
include 'getImageInfo.php';
include 'model.php';

$photoId = $args['id'];

$imagesNames = [];


$photo = getInfoPhoto($photoId);

$idImages = getPhotosInFolder($photo['id_dossier']);

$urlImages['folder'] = $photo['id_dossier'];

foreach ($idImages as $idImage){
    $urlImages['photos'][] = getInfoPhoto($idImage);
}

echo json_encode($urlImages);