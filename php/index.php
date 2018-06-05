<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

require 'connexionDB.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(['settings' => $config]);

$app->post('/config', function () {
    include 'config.php';
});

$app->post('/uploadtmp', function (Request $request, Response $response, array $args) {
    include 'uploadtmp.php';
});


$app->post('/upload/{folder}', function (Request $request, Response $response, array $args){
    include 'upload.php';
});

$app->post('/rmtmp', function (Request $request, Response $response, array $args) {
    include 'rmtmp.php';
});

$app->post('/imagesfolder/{id}', function (Request $request, Response $response, array $args) {
    include 'imagesfolder.php';
});

$app->post('/imagick', function (Request $request, Response $response, array $args) {
    include 'imagick.php';
});

$app->get('/dossiers', function (Request $request, Response $response, array $args) {
    include 'getDossiers.php';
});

$app->get('/images/{id}', function (Request $request, Response $response, array $args) {
    include 'imagesFromDoss.php';
});

$app->post('/modif_image/{id}', function (Request $request, Response $response, array $args) {
    include 'modif_image.php';
});

$app->post('/rmtmpimage', function (Request $request, Response $response, array $args) {
    include 'rmtmpimage.php';
});

$app->post('/savemodifs/{id}', function (Request $request, Response $response, array $args) {
    include 'savemodifs.php';
});

$app->run();