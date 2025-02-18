var Reces = function() {
};

Reces.prototype.setPk = function(pk) {
  this.pk = pk;
};

Reces.prototype.setFK_Match_Rece = function(fk_match_rece) {
    this.fk_match_rece = fk_match_rece;
};

Reces.prototype.setFK_Player_Rece = function(fk_player_rece) {
    return this.fk_player_rece;
};

Reces.prototype.setPerfekt = function(perfekt){
    this.perfekt = perfekt;
}

Reces.prototype.getSuperInZone = function(superInZone){
    return this.superInZone;
}

Reces.prototype.setNeutral = function(neutral){
    this.neutral = neutral;
}

Reces.prototype.setSchlecht = function(direktFehler){
    this.neutral = neutral;
}

Reces.prototype.setDirektFehler = function(direktFehler){
    this.direktFehler = direktFehler;
}

Reces.prototype.setFalsxheEntscheidung = function(falscheEntscheidung){
    this.falscheEntscheidung = falscheEntscheidung;
}

get
get
get
Reces.prototype.toString = function () {
  return "VS. " + this.fk_Enemy_Team +', IN: ' + this.halle;
};

