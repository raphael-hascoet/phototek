<?php
$files = array();
/* Getting file name */

foreach ($_FILES as $f) {
    $filename = $f['name'];

    $filesize = $f['size'];

    $location = "../upload/" . $filename;

    $return_arr = array();

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