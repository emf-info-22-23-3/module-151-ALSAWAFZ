<?php 

  class Matchs
  {

    private $pk_player;
    private $spielerNr;
    private $name;
    private $familyName;
    private $address;
    private $fk_place;
    private $natel;
    private $email;
    private $geburstag;
    private $LIZENZ;
    private $Schreiber;
    private $Schiri;
    private $JS;
    private $fk_login;

    public function __construct($pk_player, $spielerNr, $name, $familyName, $address, $fk_place, $natel, $email, $geburstag, $LIZENZ, $Schreiber)
    {
      $this->pk_player = $pk_player;
      $this->spielerNr = $spielerNr;        
      $this->name = $name;
      $this->familyName = $familyName;
      $this->address = $address;
      $this->fk_place = $fk_place;
      $this->natel = $natel;
      $this->natel = $natel;
      $this->natel = $natel;
      $this->natel = $natel;
      $this->natel = $natel;
      $this->natel = $natel;
      $this->natel = $natel;
      $this->natel = $natel;
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