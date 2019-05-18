<?php

namespace Project\Users;

class User
{
    public $username;
    public $mail;
    public $password;
    public $name;
    public $description;
    public $image;

    public function __construct($password, $username, $mail,$name,$description,$image)
    {
        $this->mail = $mail;
        $this->username = $username;
        $this->password = $password;
        $this->name = $name;
        $this->description = $description;
        $this->image = $image;
    }
}