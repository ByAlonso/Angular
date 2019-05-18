<?php
/**
 * Created by PhpStorm.
 * User: alonso
 * Date: 2019-05-18
 * Time: 13:41
 */

namespace Project\Posts;


class Post
{
    public $id;
    public $username;
    public $title;
    public $description;
    public $images;
    public $classe;

    public function __construct($id,$username, $title, $description,$images,$classe)
    {
        $this->id = $id;
        $this->username = $username;
        $this->title = $title;
        $this->description = $description;
        $this->images = $images;
        $this->classe = $classe;

    }
}