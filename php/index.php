<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

require 'connexionDB.php';


$app = new \Slim\App;

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

$app->run();