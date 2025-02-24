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


    public function __destruct() {
        $this->pdo = null;
    }

    public function selectQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            return $queryPrepared->fetchAll();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }


    public function selectSingleQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            return $queryPrepared->fetch();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }


    public function executeQuery($query, $params) {
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

    public function startTransaction() {
        return $this->pdo->beginTransaction();
    }

    /**
     * Méthode permettant d'ajouter une requête à la transaction en cours
     * 
     * @return bool: true si la requête est fonctionnelle et qu'une transaction est bien en cours
     */
    public function addQueryToTransaction($query, $params) {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $maQuery = $this->pdo->prepare($query);
            $res = $maQuery->execute($params);
        }
        return $res;
    }

    /**
     * Méthode permettant de valider la transaction
     * 
     * @return bool: true si la validation s'est correctement déroulée et qu'une transaction était bien en cours
     */
    public function commitTransaction() {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $res = $this->pdo->commit();
        }
        return $res;
    }

    /**
     * Méthode permettant d'annuler la transaction
     * 
     * @return bool: true si la validation s'est correctement annulée et qu'une transaction était bien en cours
     */
    public function rollbackTransaction() {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $res = $this->pdo->rollBack();
        }
        return $res;
    }

}

?>