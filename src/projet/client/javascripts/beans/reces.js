class Reces {
  constructor() {
    this.pk = null;
    this.fk_player_rece = null;
    this.fk_match_rece = null;
    this.perfekt = null;
    this.superInZone = null;
    this.neutral = null;
    this.schlecht = null;
    this.direktFehler = null;
    this.falscheEntscheidung = null;
  }

  setPk(pk) {
    this.pk = pk;
  }

  getPk() {
    return this.pk;
  }

  setFK_Match_Rece(fk_match_rece) {
    this.fk_match_rece = fk_match_rece;
  }

  getFK_Match_Rece() {
    return this.fk_match_rece;
  }

  setFK_Player_Rece(fk_player_rece) {
    this.fk_player_rece = fk_player_rece;
  }

  getFK_Player_Rece() {
    return this.fk_player_rece;
  }

  setPerfekt(perfekt) {
    this.perfekt = perfekt;
  }

  getPerfekt() {
    return this.perfekt;
  }

  setSuperInZone(superInZone) {
    this.superInZone = superInZone;
  }

  getSuperInZone() {
    return this.superInZone;
  }

  setNeutral(neutral) {
    this.neutral = neutral;
  }

  getNeutral() {
    return this.neutral;
  }

  setSchlecht(schlecht) {
    this.schlecht = schlecht;
  }

  getSchlecht() {
    return this.schlecht;
  }

  setDirektFehler(direktFehler) {
    this.direktFehler = direktFehler;
  }

  getDirektFehler() {
    return this.direktFehler;
  }

  setFalscheEntscheidung(falscheEntscheidung) {
    this.falscheEntscheidung = falscheEntscheidung;
  }

  getFalscheEntscheidung() {
    return this.falscheEntscheidung;
  }
}
