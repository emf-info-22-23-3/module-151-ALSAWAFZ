<?php
class LoginBDManager
{
    public function checkLogin($username)
    {
        $db = DBConnection::getInstance();
        $sql = "
            SELECT PK_Login, Username, Password, Role 
            FROM t_Login 
            WHERE Username = ?
        ";
        
        $result = $db->SelectQuery($sql, array($username));

        if ($result && isset($result[0])) {
            return new Login(
                $result[0]['PK_Login'],
                $result[0]['Username'],
                $result[0]['Password'],
                $result[0]['Role']
            );
        }
        return false;
    }
}
?>
