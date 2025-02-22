class Players {
    constructor() {
        this.pk_player = null;
        this.spielerNr = null;
        this.name = null;
        this.familyName = null;
        this.adresse = null;
        this.matchZeit = null;
        this.fk_place = null;
        this.natel = null;
        this.email = null;
        this.geburstag = null;
        this.lizenz = null;
        this.schreiber = null;
        this.schiri = null;
        this.js = null;
        this.fk_login = null;
        this.spielerKarte = null;
    }

    setPk(pk_player) { this.pk_player = pk_player; }
    getPk() { return this.pk_player; }


    setSpielerNr(spielerNr) { this.spielerNr = spielerNr; }
    getSpielerNr() { return this.spielerNr; }

    setName(name) { this.name = name; }
    getName() { return this.name; }

    setFamilyName(familyName) { this.familyName = familyName; }
    getFamilyName() { return this.familyName; }

    setAdresse(adresse) { this.adresse = adresse; }
    getAdresse() { return this.adresse; }

    setMatchZeit(matchZeit) { this.matchZeit = matchZeit; }
    getMatchZeit() { return this.matchZeit; }

    setFk_place(fk_place) { this.fk_place = fk_place; }
    getFk_place() { return this.fk_place; }

    setNatel(natel) { this.natel = natel; }
    getNatel() { return this.natel; }

    setEmail(email) { this.email = email; }
    getEmail() { return this.email; }

    setGeburstag(geburstag) { this.geburstag = geburstag; }
    getGeburstag() { return this.geburstag; }

    setLizenz(lizenz) { this.lizenz = lizenz; }
    getLizenz() { return this.lizenz; }

    setSchreiber(schreiber) { this.schreiber = schreiber; }
    getSchreiber() { return this.schreiber; }

    setSchiri(schiri) { this.schiri = schiri; }
    getSchiri() { return this.schiri; }

    setJS(js) { this.js = js; }
    getJS() { return this.js; }

    setFk_login(fk_login) { this.fk_login = fk_login; }
    getFk_login() { return this.fk_login; }

    setSpielerKarte(spielerKarte) { this.spielerKarte = spielerKarte; }
    getSpielerKarte() { return this.spielerKarte; }
}
