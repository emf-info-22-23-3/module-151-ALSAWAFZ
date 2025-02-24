<?php 

  class Rece
  {

    private $pk_rece;
    private $fk_match_rece;
    private $fk_player_rece;
    private $perfekt;
    private $superInZone;
    private $neutral;
    private $schlecht;
    private $direktFehler;
    private $falscheEntscheidung;
 



    public function __construct($pk_rece, $fk_match_rece, $fk_player_rece, $perfekt, $superInZone, $neutral, $schlecht, $direktFehler, $falscheEntscheidung)
    {
      $this->pk_rece = $pk_rece;
      $this->fk_match_rece = $fk_match_rece;        
      $this->fk_player_rece = $fk_player_rece;
      $this->perfekt = $perfekt;
      $this->superInZone = $superInZone;
      $this->neutral = $neutral;
      $this->schlecht = $schlecht;
      $this->direktFehler = $direktFehler;
      $this->falscheEntscheidung = $falscheEntscheidung;
    }
    
    public function getPKRece()
    {
      return $this->pk_rece;
    }

    public function getFKMatchRece()
    {
      return $this->fk_match_rece;
    }

    public function getFKPlayerRece()
    {
        return $this->fk_player_rece;
    }
    public function getPerfekt()
    {
        return $this->perfekt;
    }
    public function getSuperZone(){
        return $this->superInZone;
    }
    public function getNeutral(){
        return $this->neutral;
    }

    public function getSchlecht(){
        return $this->schlecht;
    }

    public function getDirektFehler(){
        return $this->direktFehler;
    }

    public function getFalscheEntscheidung(){
        return $this->falscheEntscheidung;
    }


    public function toXML()
    {
      $result = '<reces>';
      $result = $result . '<pk_rece>'.$this->getPKRece().'</pk_rece>';
      $result = $result . '<fk_player_rece>'.$this->getFKPlayerRece().'</fk_player_rece>';
      $result = $result . '<fk_match_rece>'.$this->getFKMatchRece().'</fk_match_rece>';
      $result = $result . '<perfekt>'.$this->getPerfekt().'</perfekt>';
      $result = $result . '<superInZone>'.$this->getSuperZone().'</superInZone>';
      $result = $result . '<neutral>'.$this->getNeutral().'</neutral>';
      $result = $result . '<schlecht>'.$this->getSchlecht().'</schlecht>';
      $result = $result . '<direktFehler>'.$this->getDirektFehler().'</direktFehler>';
      $result = $result . '<falscheEntscheidung>'.$this->getFalscheentscheidung().'</falscheEntscheidung>';
      $result = $result . '</reces>';
      return $result;
    }
  }
?>