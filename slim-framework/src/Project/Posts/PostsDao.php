<?php
/**
 * Created by PhpStorm.
 * User: alonso
 * Date: 2019-05-18
 * Time: 14:27
 */

namespace Project\Posts;
use Project\Utils\ProjectDao;

class PostsDao
{
    private $dbConnection;

    public function __construct(ProjectDao $dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getByID($username)
    {
        $sql = "SELECT * FROM Users WHERE Username = ?";
        return $this->dbConnection->fetch($sql, array($username));
    }

    public function createPost($post)
    {
        $sql = "INSERT INTO Posts (username, title, description, class) VALUES (?, ?, ?, ?)";
        $id = $this->dbConnection->insert($sql, array($post['username'], $post['title'], $post['description'],
            $post['class']));
        return $id;
        //falta añadir las fotos de los posts
    }
}