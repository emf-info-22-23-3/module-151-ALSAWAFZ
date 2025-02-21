<?php 
include_once('DBConnection.php');
include_once('beans/Match.php');

class MatchBDManager
{
    public function getMatchs()
    {
        $db = DBConnection::getInstance();

        $sql = "
            SELECT m.PK_Match, m.Spiel, m.Wochentag, m.Datum, m.MatchZeit, t.Name AS TeamName, m.Halle
            FROM DB_finalTVMurten.t_Match m
            INNER JOIN t_Team t ON m.FK_Team_Enemy = t.PK_Teams
            ORDER BY m.Datum
        ";

        $result = $db->selectQuery($sql, []); 

        $matches = [];
        foreach ($result as $row) {
            $matches[] = new Matchs(
                $row['PK_Match'] ?? null,
                $row['Spiel'] ?? '',
                $row['Wochentag'] ?? '',
                $row['Datum'] ?? '',
                $row['MatchZeit'] ?? '',
                $row['TeamName'] ?? '',
                $row['Halle'] ?? ''
            );
        }
        return $matches;
    }

    public function getInXML()
    {
        $matches = $this->getMatchs();
        $result = '<matches>';
        foreach ($matches as $match) {
            $result .= $match->toXML();
        }
        $result .= '</matches>';
        return $result;
    }
}
?>
