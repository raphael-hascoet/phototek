<?php

include "getImageInfo.php";


$imgId = $args['id'];;

$exif = getExifPhoto($imgId);
$tags = getTagsPhoto($imgId);
$photo = getInfoPhoto($imgId);

$width = $exif['COMPUTED']['Width'];
$height = $exif['COMPUTED']['Height'];

$nom = $photo['nom'];
$image = ['nom' => $nom,'width' => $width,'height' => $height,'taille' => formatSizeUnits($exif['FileSize']), 'date' => date('d/m/Y', $exif['FileDateTime']), 'tags' => $tags];

echo json_encode($image);


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