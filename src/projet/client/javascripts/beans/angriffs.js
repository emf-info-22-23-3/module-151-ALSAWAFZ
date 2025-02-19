var Angriffs = function() {
};

Angriffs.prototype.setPk = function(pk) {
    this.pk = pk;
};

Angriffs.prototype.getPk = function() {
    return this.pk;
};


Angriffs.prototype.setFK_Match_Angriff = function(fk_match_angriff) {
    this.fk_match_angriff = fk_match_angriff;
};

Angriffs.prototype.getFK_Match_Angriff = function() {
    return this.fk_match_angriff;
};


Angriffs.prototype.setFK_Player_Angriff = function(fk_player_angriff) {
    this.fk_player_angriff = fk_player_angriff;
};

Angriffs.prototype.getFK_player_Angriff = function() {
    return this.fk_player_angriff;
};


Angriffs.prototype.setBalleErhalten = function(balleErhalten){
    this.balleErhalten = balleErhalten;
}
Angriffs.prototype.getBalleErhalten = function() {
    return this.balleErhalten;
};


Angriffs.prototype.setpunkte = function(punkte){
    this.punkte = punkte;
}
Angriffs.prototype.getpunkte = function() {
    return this.punkte;
};


Angriffs.prototype.setDruckVoll = function(druckVoll){
    this.druckVoll = druckVoll;
}
Angriffs.prototype.getDruckVoll = function() {
    return this.druckVoll;
};


Angriffs.prototype.setZuEasy = function(zuEasy){
    this.zuEasy = zuEasy;
}
Angriffs.prototype.getZuEasy = function() {
    return this.zuEasy;
};


Angriffs.prototype.setFehler = function(fehler){
    this.fehler = fehler;
}
Angriffs.prototype.getFehler = function() {
    return this.fehler;
};

Angriffs.prototype.setBlockPunkt = function(blockPunkt){
    this.blockPunkt = blockPunkt;
}
Angriffs.prototype.getBlockPunkt = function() {
    return this.blockPunkt;
};

Angriffs.prototype.setBlock = function(block){
    this.block = block;
}
Angriffs.prototype.getBlock = function() {
    return this.block;
};

Angriffs.prototype.setAss = function(ass){
    this.ass = ass;
}
Angriffs.prototype.getAss = function() {
    return this.ass;
};


Angriffs.prototype.toString = function () {
  return "idk angriff";
};

