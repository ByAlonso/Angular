<?php
/**
 * Created by PhpStorm.
 * User: alonso
 * Date: 2019-05-18
 * Time: 13:52
 */

namespace Project\Posts;

use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;


class PostsController
{
    private $dao;

    public function __construct(ContainerInterface $container)
    {
        $dbConnection = $container['dbConnection'];
        $this->dao = new PostsDao($dbConnection);
    }

    function createPost(Request $request, Response $response, array $args)
    {
        $body = $request->getParsedBody();
        $user = $this->dao->createPost($body);
        return $response->withJson($user);
    }

}