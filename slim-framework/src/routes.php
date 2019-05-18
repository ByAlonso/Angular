<?php

use Project\Users\UsersController;
use Slim\Http\Request;
use Slim\Http\Response;

$authentication = $app->getContainer()->get('authentication');

$app->get('/users', UsersController::class . ':getAll');

$app->get('/profile/{username}', UsersController::class . ':getUserByUsername');

$app->put('/profile/{username}', UsersController::class . ':updateUser');//->add($authentication);

$app->post('/register', UsersController::class . ':createUser');

$app->post('/login', UsersController::class . ':loginUser');
$app->delete('/user/{id}', UsersController::class . ':deleteUser');

