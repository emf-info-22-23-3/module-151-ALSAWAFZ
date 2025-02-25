<?php 

  class Players
  {

    private $pk_player;
    private $spielerNr;
    private $name;
    private $familyName;
    private $adresse;
    private $fk_place;
    private $natel;
    private $email;
    private $geburstag;
    private $lizenz;
    private $schreiber;
    private $schiri;
    private $js;
    private $fk_login;
    private $spielerKarte;

    public function __construct($pk_player, $spielerNr, $name, $familyName, $adresse, $fk_place, $natel, $email, $geburstag, $lizenz, $schreiber, $schiri, $js, $fk_login, $spielerKarte)
    {
      $this->pk_player = $pk_player;
      $this->spielerNr = $spielerNr;        
      $this->name = $name;
      $this->familyName = $familyName;
      $this->adresse = $adresse;
      $this->fk_place = $fk_place;
      $this->natel = $natel;
      $this->email = $email;
      $this->geburstag = $geburstag;
      $this->lizenz = $lizenz;
      $this->schreiber = $schreiber;
      $this->schiri = $schiri;
      $this->js = $js;
      $this->fk_login = $fk_login;
      $this->spielerKarte = $spielerKarte;
    }
    
    public function getPkPlayer(){return $this->pk_player;}
    public function getSpielerNr(){return $this->spielerNr;}
    public function getName(){return $this->name;}
    public function getFamilyName(){return $this->familyName;}
    public function getAdresse(){return $this->adresse;}
    public function getFKPlace(){return $this->fk_place;}
    public function getNatel(){return $this->natel;}
    public function getEmail(){return $this->email;}
    public function getGeburstag(){return $this->geburstag;}
    public function getLIZENZ(){return $this->lizenz;}
    public function getSchreiber(){return $this->schreiber;}
    public function getSchiri(){return $this->schiri;}
    public function getJS(){return $this->js;}
    public function getFKLogin(){return $this->fk_login;}
    public function getSpielerKarte(){return $this->spielerKarte;}



    public function toXML()
    {
      $result = '<players>';
      $result = $result . '<pk_player>'.$this->getPkPlayer().'</pk_player>';
      $result = $result . '<spielerNr>'.$this->getSpielerNr().'</spielerNr>';
      $result = $result . '<name>'.$this->getName().'</name>';
      $result = $result . '<familyName>'.$this->getFamilyName().'</familyName>';
      $result = $result . '<adresse>'.$this->getAdresse().'</adresse>';
      $result = $result . '<fk_place>'.$this->getFKPlace().'</fk_place>';
      $result = $result . '<natel>'.$this->getNatel().'</natel>';
      $result = $result . '<email>'.$this->getEmail().'</email>';
      $result = $result . '<geburstag>'.$this->getGeburstag().'</geburstag>';
      $result = $result . '<lizenz>'.$this->getLIZENZ().'</lizenz>';
      $result = $result . '<schreiber>'.$this->getSchreiber().'</schreiber>';
      $result = $result . '<schiri>'.$this->getSchiri().'</schiri>';
      $result = $result . '<js>'.$this->getJS().'</js>';
      $result = $result . '<fk_login>'.$this->getFKLogin().'</fk_login>';
      $result = $result . '<spielerKarte>'.$this->getSpielerKarte().'</spielerKarte>';

      $result = $result . '</players>';
      return $result;
    }
  }
?>