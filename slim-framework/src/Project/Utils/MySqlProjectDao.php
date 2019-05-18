<?php
/**
 * Created by PhpStorm.
 * User: ricardocampos
 * Date: 3/3/19
 * Time: 2:29 PM
 */

namespace Project\Utils;


class MySqlProjectDao implements ProjectDao
{
    private $connection;

    public function __construct(\PDO $connection)
    {
        $this->connection = $connection;
    }

    public function fetchAll($sql, $params = null)
    {
        $stm = $this->connection->prepare($sql);
        $stm->execute($params);
        return $stm->fetchAll();
    }

    public function fetch($sql, $params = null)
    {
        $stm = $this->connection->prepare($sql);
        $stm->execute($params);
        return $stm->fetch();
    }

    public function execute($sql, $params = null)
    {
        $stm = $this->connection->prepare($sql);
        $stm->execute($params);
    }

    public function insert($sql, $params = null)
    {
        $stm = $this->connection->prepare($sql);
        $stm->execute($params);
        return $this->connection->lastInsertId();
    }
}