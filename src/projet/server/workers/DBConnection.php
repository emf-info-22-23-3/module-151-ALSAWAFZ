<?php


class DBConnection {
    private static $_instance = null;
    private $pdo;
    private $config;

    public static function getInstance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new DBConnection();
        }
        return self::$_instance;
    }

 
    private function __construct()
    {
        $this->config = new connectionConfig();

        try {

            $type = $this->config->getType();
            $host = $this->config->getHost();
            $name = $this->config->getName();
            $user = $this->config->getUser();
            $pass = $this->config->getPass();

            $this->pdo = new PDO($type . ':host=' . $host . ';dbname=' . $name, $user, $pass, array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                PDO::ATTR_PERSISTENT => true
            ));
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    

    public function SelectQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            return $queryPrepared->fetchAll();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }


    public function ExecuteQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryRes = $queryPrepared->execute($params);
            return $queryRes;
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getLastId($table) {
        try {
            $lastId = $this->pdo->lastInsertId($table);
            return $lastId;
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}

?>