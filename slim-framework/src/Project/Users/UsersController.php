<?php

namespace Project\Users;

use Project\Posts\Post;
use Project\Posts\PostsController;
use Project\Posts\PostsDao;
use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class UsersController
{
    private $dao;
    private $postDao;
    public function __construct(ContainerInterface $container)
    {
        $dbConnection = $container['dbConnection'];
        $this->dao = new UsersDao($dbConnection);
        $this->postDao = new PostsDao($dbConnection);
    }

    function getAll(Request $request, Response $response, array $args)
    {
        $users = $this->dao->getAll();
        return $response->withJson($users);
    }

    function getUserById(Request $request, Response $response, array $args)
    {
        $user = $this->dao->getById($args['id']);
        return $response->withJson($user);
    }

    function getUserByUsername(Request $request, Response $response, array $args)
    {
        $user = $this->dao->getByUsername($args['username']);
        if($user)
        {
            $posts = $this->postDao->getByUsername($args['username']);
            $user->posts = $posts;
            return $response->withJson($user);
        }

        else
            return $response->withStatus(404);
    }


    function updateUser(Request $request, Response $response, array $args)
    {
        $username = $args['username'];
        $body = $request->getParsedBody();
        $user = $this->dao->updateUser($username, $body);
        return $response->withJson($user);
    }

    function createUser(Request $request, Response $response, array $args)
    {
        $body = $request->getParsedBody();
        $user = $this->dao->createUser($body);
        return $response->withJson($user);
    }

    function loginUser(Request $request, Response $response, array $args)
    {
        $body = $request->getParsedBody();
        if ($user = $this->dao->loginUser($body)) {
            return $response->withJson($user);
        } else {
            return $response->withStatus(401);
        }
    }

    function deleteUser(Request $request, Response $response, array $args)
    {
        $username = $args['username'];
        $this->dao->delete($username);
        return $response->withStatus(201);
    }
}