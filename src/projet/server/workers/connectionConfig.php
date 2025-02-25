<?php

/**
 * Class connectionConfig
 *
 * Stores database connection configuration parameters.
 */
class connectionConfig
{
    private $type;
    private $host;
    private $name;
    private $user;
    private $pass;

    /**
     * Constructor for the database connection configuration.
     *
     * @param string $type The database type (default: mysql).
     * @param string $host The database host (default: mysql).
     * @param string $name The database name (default: DB_finalTVMurten).
     * @param string $user The database username (default: root).
     * @param string $pass The database password (default: root).
     */
    public function __construct($type = 'mysql', $host = 'mysql', $name = 'DB_finalTVMurten', $user = 'root', $pass = 'root')
    {
        $this->type = $type;
        $this->host = $host;
        $this->name = $name;
        $this->user = $user;
        $this->pass = $pass;
    }

    public function getType() { return $this->type; }
    public function getHost() { return $this->host; }
    public function getName() { return $this->name; }
    public function getUser() { return $this->user; }
    public function getPass() { return $this->pass; }
}
?>
