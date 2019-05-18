<?php

namespace Project\Users;

use DateTime;

use Firebase\JWT\JWT;
use phpDocumentor\Reflection\Types\Null_;
use phpDocumentor\Reflection\Types\String_;
use Project\Utils\ProjectDao;

class UsersDao
{
    private $dbConnection;

    public function __construct(ProjectDao $dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getAll()
    {
        $sql = "SELECT * FROM USERS";
        return $this->dbConnection->fetchAll($sql);
    }

    public function getById($id)
    {
        $sql = "SELECT * FROM USERS WHERE id = ?";
        return $this->dbConnection->fetch($sql, array($id));
    }
    public function getByUsername($username)
    {
        $sql = "SELECT * FROM Users WHERE Username = ?";
        return $this->dbConnection->fetch($sql, array($username));
    }
    public function updateUser($username, $user)
    {
        $sql = "UPDATE Users SET name = ?, description = ?, image = ? WHERE username = ?";
        $this->dbConnection->execute($sql, array($user['name'], $user['description'], $user['image'], $username));

        return $this->getByUsername($username);
    }

    public function createUser($user)
    {
        $sql = "INSERT INTO Users (username, mail, password) VALUES (?, ?, ?)";
        if(!$this->getByUsername($user['username']))
        {
            $hash = password_hash($user['password'], PASSWORD_DEFAULT);
            $id = $this->dbConnection->insert($sql, array($user['username'], $user['mail'], $hash));
            return $id;
        }
        else
        {
            //Este error hay que detectarlo para mandar una alerta
            return "Usuario ya existente";
        }

    }
    public function loginUser($body)
    {
        $username = $body['username'];
        $password = $body['password'];
        $sql = "SELECT * FROM Users WHERE Username = ?";
        $user = $this->dbConnection->fetch($sql, array($username));
        if (password_verify($password,$user->password)) {
            $user->token = $this->generateToken($user->ID);
            return $user;
        } else {
            return false;
        }
    }

    public function delete($id)
    {
        $sql = "DELETE FROM USERS WHERE id = ?";
        $this->dbConnection->execute($sql, array($id));
    }

    public function generateToken($username)
    {
        $now = new DateTime();
        $future = new DateTime("now +1 year");

        $payload = [
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "jti" => base64_encode(random_bytes(16)),
            'iss' => 'localhost:80',  // Issuer
            "id" => $username,
        ];

        $secret = 'mysecret';
        $token = JWT::encode($payload, $secret, "HS256");

        return $token;
    }
}