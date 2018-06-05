<?php
include 'getImageInfo.php';
include 'model.php';

$photoId = $args['id'];

$imagesNames = [];


$photo = getInfoPhoto($photoId);

$idImages = getPhotosInFolder($photo['id_dossier']);

$urlImages['folder'] = $photo['id_dossier'];

foreach ($idImages as $idImage){
    $infoPhoto = getInfoPhoto($idImage);
    @$exif = exif_read_data('../upload/' . $urlImages['folder'] . '/' . $infoPhoto['id'] . '.' . $infoPhoto['mime'], 'COMPUTED');
    //$exif['file'] = exif_read_data('../upload/' . $urlImages['folder'] . '/' . $infoPhoto['id'] . '.' . $infoPhoto['mime'], 'FILE');
    $exif['FileSize'] = formatSizeUnits($exif['FileSize']);
    $exif['FileDateForm'] = date('d/m/Y', $exif['FileDateTime']);
    $exif['FileHourForm'] = date('G:i', $exif['FileDateTime']);
    $newPhoto = $infoPhoto;
    $newPhoto['exif'] = $exif;
    $urlImages['photos'][] = $newPhoto;
}

copy('../upload/' . $urlImages['folder'] . '/' . $infoPhoto['id'] . '.' . $infoPhoto['mime'], '../tmp/tmpimage.jpg');

echo json_encode($urlImages);


function formatSizeUnits($bytes)
{
    if ($bytes >= 1073741824)
    {
        $bytes = number_format($bytes / 1073741824, 2) . ' GB';
    }
    elseif ($bytes >= 1048576)
    {
        $bytes = number_format($bytes / 1048576, 2) . ' MB';
    }
    elseif ($bytes >= 1024)
    {
        $bytes = number_format($bytes / 1024, 2) . ' KB';
    }
    elseif ($bytes > 1)
    {
        $bytes = $bytes . ' bytes';
    }
    elseif ($bytes == 1)
    {
        $bytes = $bytes . ' byte';
    }
    else
    {
        $bytes = '0 bytes';
    }

    return $bytes;
}