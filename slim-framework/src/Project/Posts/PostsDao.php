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

    public function getByUsername($username)
    {
        $sql = "SELECT * FROM Posts WHERE username = ? ORDER BY ID DESC";
        return $this->dbConnection->fetchAll($sql, array($username));
    }
    public function getById($id)
    {
        $sql = "SELECT * FROM Posts WHERE ID = ?";
        return $this->dbConnection->fetchAll($sql, array($id));
    }

    public function updatePost($id, $post)
    {
        $sql = "UPDATE Posts SET title = ?, description = ?, class = ? WHERE ID = ?";
        $this->dbConnection->execute($sql, array($post['title'], $post['description'],$post['class'], $id));

        return $this->getById($id);
    }

    public function getByClass($classe)
    {
        $sql = "SELECT * FROM Posts WHERE class = ? ORDER BY ID DESC";
        return $this->dbConnection->fetchAll($sql, array($classe));
    }

    public function getPhotosById($id)
    {
        $sql = "SELECT * FROM Imagenes WHERE ID = ?";
        return $this->dbConnection->fetchAll($sql, array($id));
    }

    public function createPost($post)
    {
        $sql = "INSERT INTO Posts (username, title, description, class) VALUES (?, ?, ?, ?)";
        $id = $this->dbConnection->insert($sql, array($post['username'], $post['title'], $post['description'],
            $post['classe']));

        $sql = "INSERT INTO Imagenes (ID, image) VALUES (?,?)";
        for ($x = 0; $x < count($post['images']); $x++) {
            $this->dbConnection->insert($sql,array($id,$post['images'][$x]));
        }

        return $id;
    }

    public function delete($id)
    {
        $sql = "DELETE FROM Posts WHERE id = ?";
        $this->dbConnection->execute($sql, array($id));
    }
}