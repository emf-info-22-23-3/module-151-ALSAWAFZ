<?php

class Wrk
{
    public function getEquipesFromDB()
    {
        return array('Gotteron', 'SC Bern', 'Fribourg-Gottéron', 'HC Davos');
    }

    public function getEquipes()
    {
        $teamNames = $this->getEquipesFromDB();
        $teams = [];

        foreach ($teamNames as $name) {
            $teams[] = new Equipe($name); 
        }

        return $teams;
    }
}
?>
