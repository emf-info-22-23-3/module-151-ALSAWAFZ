<?php 

  class Matchs
  {

    private $pk_matchs;
    private $spiel;
    private $wochentag;
    private $datum;
    private $matchZeit;
    private $fk_enemy_team;
    private $halle;

    public function __construct($pk_matchs, $spiel, $wochentag, $datum, $matchZeit, $fk_enemy_team, $halle)
    {
      $this->pk_matchs = $pk_matchs;
      $this->spiel = $spiel;        
      $this->wochentag = $wochentag;
      $this->datum = $datum;
      $this->matchZeit = $matchZeit;
      $this->fk_enemy_team = $fk_enemy_team;
      $this->halle = $halle;
    }
    
    public function getSpiel()
    {
      return $this->spiel;
    }

    public function getPkMatchs()
    {
      return $this->pk_matchs;
    }

    public function getWochentag()
    {
        return $this->wochentag;
    }
    public function getDatum()
    {
        return $this->datum;
    }
    public function getMatchZeit(){
        return $this->matchZeit;
    }
    public function getFKEnemyTeam(){
        return $this->fk_enemy_team;
    }

    public function getHalle(){
        return $this->halle;
    }


    public function toXML()
    {
      $result = '<matchs>';
      $result = $result . '<pk_matchs>'.$this->getPkMatchs().'</pk_matchs>';
      $result = $result . '<spiel>'.$this->getSpiel().'</spiel>';
      $result = $result . '<wochentag>'.$this->getWochentag().'</wochentag>';
      $result = $result . '<datum>'.$this->getDatum().'</datum>';
      $result = $result . '<matchZeit>'.$this->getMatchZeit().'</matchZeit>';
      $result = $result . '<fk_enemy_team>'.$this->getFKEnemyTeam().'</fk_enemy_team>';
      $result = $result . '<halle>'.$this->getHalle().'</halle>';
      $result = $result . '</matchs>';
      return $result;
    }
  }
?>