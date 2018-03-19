<?php
	use \Psr\Http\Message\ServerRequestInterface as Request;
	use \Psr\Http\Message\ResponseInterface as Response;

	require '../vendor/autoload.php';

	$app = new \Slim\App;
	$app->get('/image/{name}', function (Request $request, Response $response) {
		$name = $request->getAttribute('name');
		$response->getBody()->write("Hello, $name");
		return $response;
	});
	$app->get('/dossier/{name}', function (Request $request, Response $response) {
		$name = $request->getAttribute('name');
		$response->getBody()->write("Hello, $name");
		return $response;
	});
	$app->run();
?>
