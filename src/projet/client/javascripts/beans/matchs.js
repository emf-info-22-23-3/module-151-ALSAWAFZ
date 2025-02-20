var Matchs = function() {
};

Matchs.prototype.setPk = function(pk) {
  this.pk = pk;
};

Matchs.prototype.setSpiel = function(spiel) {
    this.spiel = spiel;
};

Matchs.prototype.getSpiel = function() {
    return this.spiel;
};

Matchs.prototype.setWochentag = function(wochentag){
    this.wochentag = wochentag;
}

Matchs.prototype.getWochentag = function(){
    return this.wochentag;
}

Matchs.prototype.setDatum = function(datum){
    this.datum = datum;
}

Matchs.prototype.getDatum = function(){
    return this.datum;
}

Matchs.prototype.setMatchZeit = function(matchZeit){
    this.matchZeit = matchZeit;
}

Matchs.prototype.getMatchZeit = function(){
    return this.matchZeit;
}

Matchs.prototype.setFK_Enemy_Team = function(fk_Enemy_Team){
    this.fk_Enemy_Team = fk_Enemy_Team;
}

Matchs.prototype.getFK_Enemy_Team = function(){
    return this.fk_Enemy_Team;
}

Matchs.prototype.setHalle = function(halle){
    this.halle = halle;
}

Matchs.prototype.getHalle = function(){
    return this.halle;
}

Matchs.prototype.toString = function () {
  return "VS. " + this.fk_Enemy_Team +', IN: ' + this.halle;
};


