/*
 * Bean "Membre".
 *
 * @author Zeina Alsawaf
 * @project Exercice 6
 * @version 1.0 / 13-SEP-2013
 */

var Membre = function() {
};

/**
 * Setter pour le nom
 * @param String nom
 * @returns {undefined}
 */
Membre.prototype.setNom = function(nom) {
  this.nom = nom;
};

/**
 * Setter pour le nombre de age du membre
 * @param int age
 * @returns {undefined}
 */
Membre.prototype.setAge = function(age) {
  this.age = age;
};

/**
 * Retourne le pays en format texte
 * @returns Le pays en format texte
 */
Membre.prototype.toString = function () {
  return this.nom;
};

/**
 * Retourne le nombre de age du membre
 * @returns Le nombre de age du membre
 */
Membre.prototype.getAge = function () {
  return this.age;
};