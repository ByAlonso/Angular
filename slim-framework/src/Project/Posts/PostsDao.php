<?php
/**
 * Created by PhpStorm.
 * User: alonso
 * Date: 2019-05-18
 * Time: 14:27
 */

namespace Project\Posts;
use Project\Utils\ProjectDao;
use Firebase\JWT\JWT;

class PostsDao
{
    private $dbConnection;

    public function getAll()
    {
        $sql = "SELECT * FROM Posts ORDER BY ID DESC";
        return $this->dbConnection->fetchAll($sql);
    }

    public function __construct(ProjectDao $dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getByID($username)
    {
        $sql = "SELECT * FROM Users WHERE Username = ?";
        return $this->dbConnection->fetch($sql, array($username));
    }

    public function getByClass($classe)
    {
        $sql = "SELECT * FROM Posts WHERE class = ?";
        return $this->dbConnection->fetchAll($sql, array($classe));
    }

    public function createPost($post)
    {
        $sql = "INSERT INTO Posts (username, title, description, class) VALUES (?, ?, ?, ?)";
        $id = $this->dbConnection->insert($sql, array($post['username'], $post['title'], $post['description'],
            $post['classe']));
        return $id;
        //falta añadir las fotos de los posts
    }
}