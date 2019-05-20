<?php

use Project\Posts\PostsController;
use Project\Users\UsersController;
use Slim\Http\Request;
use Slim\Http\Response;

$authentication = $app->getContainer()->get('authentication');

$app->get('/', PostsController::class . ':getAll');

$app->get('/profile/{username}', UsersController::class . ':getUserByUsername');

$app->put('/profile/{username}', UsersController::class . ':updateUser');

$app->post('/register', UsersController::class . ':createUser');

$app->post('/login', UsersController::class . ':loginUser');

$app->post('/uploadFiles/{username}',PostsController::class . ':createPost');

$app->get('/{classe}', PostsController::class . ':getByClass');

$app->delete('/profile/{id}',PostsController::class . ':deletePostById');

$app->delete('/profile/delete/{username}',UsersController::class . ':deleteUser');

$app->get('/profile/edit/{id}', PostsController::class . ':getPost');

$app->put('/profile/edit/{id}', PostsController::class . ':updatePost');

$app->get('/getPhotos/{id}', PostsController::class . ':getPhotos');

