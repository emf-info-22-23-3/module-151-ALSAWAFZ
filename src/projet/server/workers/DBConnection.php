<?php

/**
 * Class DBConnection
 * This class implements a singleton pattern for managing a database connection using PDO.
 */
class DBConnection {
    private static $_instance = null; // Singleton instance
    private $pdo; // PDO instance
    private $config; // Configuration object

    /**
     * Returns the singleton instance of DBConnection.
     * If it does not exist, it creates a new instance.
     * 
     * @return DBConnection The singleton instance.
     */
    public static function getInstance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new DBConnection();
        }
        return self::$_instance;
    }

    /**
     * Private constructor to initialize the PDO connection using configuration settings.
     * Uses a persistent connection and sets UTF-8 encoding.
     */
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

    /**
     * Destructor that closes the PDO connection.
     */
    public function __destruct() {
        $this->pdo = null;
    }

    /**
     * Executes a SELECT query and returns multiple results.
     * 
     * @param string $query The SQL query string.
     * @param array $params The parameters for the query.
     * @return array The fetched results as an associative array.
     */
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

    /**
     * Executes a SELECT query and returns a single result.
     * 
     * @param string $query The SQL query string.
     * @param array $params The parameters for the query.
     * @return mixed The fetched row as an associative array or false if no result is found.
     */
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

    /**
     * Executes an INSERT, UPDATE, or DELETE query.
     * 
     * @param string $query The SQL query string.
     * @param array $params The parameters for the query.
     * @return bool True if the query executed successfully, false otherwise.
     */
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

    /**
     * Retrieves the last inserted ID in a specific table.
     * 
     * @param string $table The table name.
     * @return int|string The last inserted ID.
     */
    public function getLastId($table) {
        try {
            $lastId = $this->pdo->lastInsertId($table);
            return $lastId;
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    /**
     * Starts a database transaction.
     * 
     * @return bool True if the transaction starts successfully, false otherwise.
     */
    public function startTransaction() {
        return $this->pdo->beginTransaction();
    }

    /**
     * Adds a query to the current transaction.
     * 
     * @param string $query The SQL query string.
     * @param array $params The parameters for the query.
     * @return bool True if the query executed successfully and a transaction is active, false otherwise.
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
     * Commits the current transaction, making changes permanent.
     * 
     * @return bool True if the transaction was successfully committed, false otherwise.
     */
    public function commitTransaction() {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $res = $this->pdo->commit();
        }
        return $res;
    }

    /**
     * Rolls back the current transaction, undoing all changes.
     * 
     * @return bool True if the transaction was successfully rolled back, false otherwise.
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
