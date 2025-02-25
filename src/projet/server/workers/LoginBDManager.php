<?php
/**
 * Class LoginBDManager
 * Manages login-related database operations.
 */
class LoginBDManager
{
    /**
     * Checks login credentials by retrieving user data from the database.
     *
     * @param string $username The username to check.
     * @return Login|false Returns a Login object if found, otherwise false.
     */
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

    /**
     * Verifies the provided password against the stored password.
     * If the stored password is not hashed, it hashes and updates it in the database.
     *
     * @param string $username The username to check.
     * @param string $inputPassword The password to verify.
     * @return Login|false Returns the Login object if the password is correct, otherwise false.
     */
    public function verifyPassword($username, $inputPassword)
    {
        $user = $this->checkLogin($username);
        if (!$user) {
            return false;
        }

        $storedPassword = $user->getPassword();
        $db = DBConnection::getInstance();

        // If the stored password is hashed, verify it
        if (password_verify($inputPassword, $storedPassword)) {
            return $user;
        }

        // If stored password is NOT hashed, hash it now and update the database
        if (!password_get_info($storedPassword)['algo']) { // Check if it's hashed
            $hashedPassword = password_hash($inputPassword, PASSWORD_DEFAULT);

            $updateSql = "UPDATE t_Login SET Password = ? WHERE Username = ?";
            $db->ExecuteQuery($updateSql, array($hashedPassword, $username));
            
            return $user;
        }

        return false;
    }
}
?>
