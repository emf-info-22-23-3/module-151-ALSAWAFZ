<?php 
include_once('DBConnection.php');
include_once('beans/Player.php');

/**
 * Class PlayerBDManager
 * Manages database operations related to players.
 */
class PlayerBDManager
{
    /**
     * Retrieves all players from the database.
     *
     * @return array An array of Player objects.
     */
    public function getPlayers()
    {
        $count = 0;
        $liste = array();
        $connection = DBConnection::getInstance();
        $query = $connection->selectQuery("
            SELECT p.*, t.Name AS PlaceName 
            FROM DB_FinalTVMurten.t_Player p 
            INNER JOIN t_Place t ON p.FK_Place = t.PK_Place
            ORDER BY p.PK_Player
        ", array());

        foreach ($query as $data) {
            $schiri = ($data['Schiri'] == 1) ? "ja" : "nein";
            $js = ($data['JS'] == 1) ? "ja" : "nein";
            $schreiber = ($data['Schreiber'] == 1) ? "ja" : "nein";

            $players = new Players(
                $data['PK_Player'],
                $data['SpielerNr'],
                $data['Name'],
                $data['FamilyName'],
                $data['Adresse'],
                $data['PlaceName'],
                $data['Natel'],
                $data['Email'],
                $data['Geburstag'],
                $data['LIZENZ'],
                $schreiber,
                $schiri,
                $js,
                $data['FK_Login'],
                $data['SpielerKarte']
            );

            $liste[$count++] = $players;
        }    
        return $liste;    
    }

    /**
     * Converts the list of players to an XML format.
     *
     * @return string The XML representation of players.
     */
    public function getInXML()
    {
        $listPlayers = $this->getPlayers();
        $result = '<listPlayers>';
        for ($i = 0; $i < sizeof($listPlayers); $i++) {
            $result .= $listPlayers[$i]->toXML();
        }
        $result .= '</listPlayers>';
        return $result;
    }
}
?>
