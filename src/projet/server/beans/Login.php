<?php 

class Login
{
    private $pk_login;
    private $username;
    private $password;
    private $role;

    public function __construct($pk_login, $username, $password, $role)
    {
        $this->pk_login = $pk_login;
        $this->username = $username;        
        $this->password = $password;
        $this->role = $role;
    }

    public function getPkLogin(){return $this->pk_login;}
    public function getUsername(){return $this->username;}
    public function getPassword(){return $this->password;}
    public function getRole(){return $this->role;}
    
    public function toArray() {
        return [
            'pk_login' => $this->pk_login,
            'username' => $this->username,
            'role' => $this->role
        ];
    }
}
?>
