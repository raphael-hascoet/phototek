<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->post('/uploadtmp', function (Request $request, Response $response, array $args) {
    $files = array();
    /* Getting file name */

    foreach ($_FILES as $f) {
        $filename = $f['name'];

        $filesize = $f['size'];

        $location = "../tmp/" . $filename;

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
});

$app->post('/upload/{folder}', function (Request $request, Response $response, array $args) {
    $tmp = scandir('../tmp');

    $folder = $args['folder'];

    if(!is_dir('../upload/' . $folder)){
        mkdir('../upload/' . $folder);
    }

    foreach ($tmp as $img){
        if($img[0] != '.') {
            copy('../tmp/' . $img, '../upload/' . $folder . '/' . $img);
        }
    }
});

$app->post('/rmtmp', function (Request $request, Response $response, array $args) {
    $files = glob('../tmp/*');
    foreach($files as $file){
        if(is_file($file)) {
            unlink($file);
        }
    }
});

$app->run();