var Reces = function() {
};

Reces.prototype.setPk = function(pk) {
    this.pk = pk;
};

Reces.prototype.getPk = function() {
    return this.pk;
};


Reces.prototype.setFK_Match_Rece = function(fk_match_rece) {
    this.fk_match_rece = fk_match_rece;
};

Reces.prototype.getFK_Match_Rece = function() {
    return this.fk_match_rece;
};


Reces.prototype.setFK_Player_Rece = function(fk_player_rece) {
    this.fk_player_rece = fk_player_rece;
};

Reces.prototype.getFK_player_Rece = function() {
    return this.fk_player_rece;
};


Reces.prototype.setPerfekt = function(perfekt){
    this.perfekt = perfekt;
}
Reces.prototype.getPerfekt = function() {
    return this.perfekt;
};


Reces.prototype.setSuperInZone = function(superInZone){
    this.superInZone = superInZone;
}
Reces.prototype.getSuperInZone = function() {
    return this.superInZone;
};


Reces.prototype.setNeutral = function(neutral){
    this.neutral = neutral;
}
Reces.prototype.getNeutral = function() {
    return this.neutral;
};


Reces.prototype.setSchlecht = function(schlecht){
    this.schlecht = schlecht;
}
Reces.prototype.getSchlecht = function() {
    return this.schlecht;
};


Reces.prototype.setDirektFehler = function(direktFehler){
    this.direktFehler = direktFehler;
}
Reces.prototype.getDirektFehler = function() {
    return this.direktFehler;
};

Reces.prototype.setFalscheEntscheidung = function(falscheEntscheidung){
    this.falscheEntscheidung = falscheEntscheidung;
}
Reces.prototype.getFalscheEntscheidung = function() {
    return this.falscheEntscheidung;
};



Reces.prototype.toString = function () {
  return "idk rece";
};

