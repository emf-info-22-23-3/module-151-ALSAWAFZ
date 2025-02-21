class Matchs {
    constructor() {
        this.pk = null;
        this.spiel = null;
        this.wochentag = null;
        this.datum = null;
        this.matchZeit = null;
        this.fk_Enemy_Team = null;
        this.halle = null;
    }

    setPk(pk) {
        this.pk = pk;
    }

    setSpiel(spiel) {
        this.spiel = spiel;
    }

    getSpiel() {
        return this.spiel;
    }

    setWochentag(wochentag) {
        this.wochentag = wochentag;
    }

    getWochentag() {
        return this.wochentag;
    }

    setDatum(datum) {
        this.datum = datum;
    }

    getDatum() {
        return this.datum;
    }

    setMatchZeit(matchZeit) {
        this.matchZeit = matchZeit;
    }

    getMatchZeit() {
        return this.matchZeit;
    }

    setFK_Enemy_Team(fk_Enemy_Team) {
        this.fk_Enemy_Team = fk_Enemy_Team;
    }

    getFK_Enemy_Team() {
        return this.fk_Enemy_Team;
    }

    setHalle(halle) {
        this.halle = halle;
    }

    getHalle() {
        return this.halle;
    }
}
