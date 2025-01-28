var Equipe = function() {
};

Equipe.prototype.setNom = function(nom) {
  this.nom = nom;
};

Equipe.prototype.setPk = function(pk) {
  this.pk = pk;
};

Equipe.prototype.toString = function () {
  return this.nom;
};

Equipe.prototype.getPk = function () {
  return this.pk;
};


