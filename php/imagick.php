<?php

$response->write(file_exists("../upload/1/1.jpg"));
$image = new Imagick($_SERVER['DOCUMENT_ROOT'] . "/phototek/upload/1/1.jpg");
for($i= 0; $i <= 15; $i++){
    $image->contrastImage(0);
}
$image->writeImage($_SERVER['DOCUMENT_ROOT'] . "/phototek/tmp/new.jpg");
