<?php

use Project\Users\UsersController;
use Slim\Http\Request;
use Slim\Http\Response;

$authentication = $app->getContainer()->get('authentication');
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});
$app->get('/users', UsersController::class . ':getAll');
$app->get('/user/{id}', UsersController::class . ':getUserById');
$app->put('/user/{id}', UsersController::class . ':updateUser')->add($authentication);

$app->post('/register', UsersController::class . ':createUser');




$app->post('/login', UsersController::class . ':loginUser');
$app->delete('/user/{id}', UsersController::class . ':deleteUser');
