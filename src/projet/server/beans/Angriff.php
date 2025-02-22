<?php 

  class Angriff
  {

    private $pk_angriff;
    private $fk_match_angriff;
    private $fk_player_angriff;
    private $balleErhalten;
    private $punkte;
    private $druckvoll;
    private $zuEasy;
    private $fehler;
    private $blockPunkt;
    private $block;
    private $ass;



    public function __construct($pk_angriff, $fk_match_angriff, $fk_player_angriff, $balleErhalten, $punkte, $druckvoll, $zuEasy, $fehler, $blockPunkt, $block, $ass)
    {
      $this->pk_angriff = $pk_angriff;
      $this->fk_match_angriff = $fk_match_angriff;        
      $this->fk_player_angriff = $fk_player_angriff;
      $this->balleErhalten = $balleErhalten;
      $this->punkte = $punkte;
      $this->druckvoll = $druckvoll;
      $this->zuEasy = $zuEasy;
      $this->fehler = $fehler;
      $this->blockPunkt = $blockPunkt;
      $this->block = $block;
      $this->ass = $ass;
    }
    
    public function getPKAngriff(){return $this->pk_angriff;}
    public function getFKMatchAngriff(){return $this->fk_match_angriff;}
    public function getFKPlayerAngriff(){return $this->fk_player_angriff;}
    public function getBalleErhalten(){return $this->balleErhalten;}
    public function getPunkte(){return $this->punkte;}
    public function getDruckvoll(){return $this->druckvoll;}
    public function getZuEasy(){return $this->zuEasy;}
    public function getFehler(){return $this->fehler;}
    public function getBlockPunkt(){return $this->blockPunkt;}
    public function getBlock(){return $this->block;}
    public function getAss(){return $this->ass;}


    public function toXML()
    {
      $result = '<angriffs>';
      $result = $result . '<pk_angriff>'.$this->getPKAngriff().'</pk_angriff>';
      $result = $result . '<fk_match_angriff>'.$this->getFKMatchAngriff().'</fk_match_angriff>';
      $result = $result . '<fk_player_angriff>'.$this->getFKPlayerAngriff().'</fk_player_angriff>';
      $result = $result . '<balleErhalten>'.$this->getBalleErhalten().'</balleErhalten>';
      $result = $result . '<punkte>'.$this->getPunkte().'</punkte>';
      $result = $result . '<druckvoll>'.$this->getDruckvoll().'</druckvoll>';
      $result = $result . '<zuEasy>'.$this->getZuEasy().'</zuEasy>';
      $result = $result . '<fehler>'.$this->getFehler().'</fehler>';
      $result = $result . '<blockPunkt>'.$this->getBlockPunkt().'</blockPunkt>';
      $result = $result . '<block>'.$this->getBlock().'</block>';
      $result = $result . '<ass>'.$this->getAss().'</ass>';
      $result = $result . '</angriffs>';
      return $result;
    }
  }
?>