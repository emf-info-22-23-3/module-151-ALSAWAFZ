var Membre = function() {
};

Membre.prototype.setNom = function(nom) {
  this.nom = nom;
};

Membre.prototype.setAge = function(age) {
  this.age = age;
};

Membre.prototype.toString = function () {
  return this.nom;
};

Membre.prototype.getAge = function () {
  return this.age;
};