<?php

include 'getImageInfo.php';

$photo = getInfoPhoto($args['id']);
$valsOpts = $_POST;

$pathTmp = $_SERVER['DOCUMENT_ROOT'] . '/phototek/tmp/tmpimage.jpg';
$pathImage = $_SERVER['DOCUMENT_ROOT'] . '/phototek/upload/' . $photo['id_dossier'] . '/' . $photo['id'] . '.' . $photo['mime'];
$image = new Imagick($pathImage);

$valueCont = $valsOpts["contraste"];
if ($valueCont > 0) {
    for ($i = 0; $i <= $valueCont; $i++) {
        $image->contrastImage(1);
    }
} else if ($valueCont < 0) {
    for ($i = 0; $i <= abs($valueCont); $i++) {
        $image->contrastImage(0);
    }
}
print_r($valsOpts);
$valueSat = $valsOpts["saturation"];
$valueLum = $valsOpts["luminosite"];
$valueTein = $valsOpts["teinte"];

$image->modulateImage($valueLum, $valueSat, $valueTein);

/*try {
    $image->colorizeImage(new ImagickPixel("rgb(255,0,0)"), 0.2, true);
} catch (ImagickException $e) {
    echo $e->getMessage();
}*/


$image->writeImage($_SERVER['DOCUMENT_ROOT'] . "/phototek/tmp/tmpimage.jpg");
