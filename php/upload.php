<?php

$tmp = scandir('../tmp');

$folder = $_POST['folder'];

foreach ($tmp as $img){
    if($img[0] != '.') {
        rename('../tmp/' . $img, '../upload/' . $folder . '/' . $img);
    }
}