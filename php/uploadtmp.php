<?php

ini_set( 'memory_limit', '40M' );
ini_set('upload_max_filesize', '40M');
ini_set('post_max_size', '40M');
ini_set('max_input_time', 300);
ini_set('max_execution_time', 300);
$files = array();
/* Getting file name */

//print_r($_FILES);

foreach ($_FILES as $f) {
    $filename = $f['name'];

    $filesize = $f['size'];

    $location = "../tmp/" . $filename;

    if (move_uploaded_file($f['tmp_name'], $location)) {
        $src = "default.png";

// checking file is image or not
        if (is_array(getimagesize($location))) {
            $src = $location;
        }
        $return_arr = array("name" => $filename, "size" => $filesize, "src" => $src);

        $files[] = $return_arr;
    }
}
echo json_encode($files);