<?php

namespace Project\Users;

use DateTime;

use Firebase\JWT\JWT;
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

    public function updateUser($userId, $user)
    {
        $sql = "UPDATE USERS SET name = ?, mail = ?, token = ? WHERE id = ?";
        $this->dbConnection->execute($sql, array($user['name'], $user['mail'], $user['token'], $userId));

        return $this->getById($userId);
    }

    public function createUser($user)
    {
        $sql = "INSERT INTO Users (Username, Mail, Password) VALUES (?, ?, ?)";
        $id = $this->dbConnection->insert($sql, array($user['username'], $user['mail'], $user['password']));

        $user = $this->getById($id);
        $user->token = $this->generateToken($user->id);
        return $user;
    }

    public function loginUser($body)
    {
        $mail = $body['mail'];
        $password = $body['password'];
        $sql = "SELECT * FROM USERS WHERE mail = ?";
        $user = $this->dbConnection->fetch($sql, array($mail));
        if ($user->password === $password) {
            $user->token = $this->generateToken($user->id);
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
            'iss' => 'localhost:8888',  // Issuer
            "id" => $username,
        ];

        $secret = 'mysecret';
        $token = JWT::encode($payload, $secret, "HS256");

        return $token;
    }
}