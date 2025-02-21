class Angriffs {
    constructor() {
        this.pk = null;
        this.fk_match_angriff = null;
        this.fk_player_angriff = null;
        this.balleErhalten = null;
        this.punkte = null;
        this.druckVoll = null;
        this.zuEasy = null;
        this.fehler = null;
        this.blockPunkt = null;
        this.block = null;
        this.ass = null;
    }

    setPk(pk) {
        this.pk = pk;
    }

    getPk() {
        return this.pk;
    }

    setFK_Match_Angriff(fk_match_angriff) {
        this.fk_match_angriff = fk_match_angriff;
    }

    getFK_Match_Angriff() {
        return this.fk_match_angriff;
    }

    setFK_Player_Angriff(fk_player_angriff) {
        this.fk_player_angriff = fk_player_angriff;
    }

    getFK_Player_Angriff() {
        return this.fk_player_angriff;
    }

    setBalleErhalten(balleErhalten) {
        this.balleErhalten = balleErhalten;
    }

    getBalleErhalten() {
        return this.balleErhalten;
    }

    setPunkte(punkte) {
        this.punkte = punkte;
    }

    getPunkte() {
        return this.punkte;
    }

    setDruckVoll(druckVoll) {
        this.druckVoll = druckVoll;
    }

    getDruckVoll() {
        return this.druckVoll;
    }

    setZuEasy(zuEasy) {
        this.zuEasy = zuEasy;
    }

    getZuEasy() {
        return this.zuEasy;
    }

    setFehler(fehler) {
        this.fehler = fehler;
    }

    getFehler() {
        return this.fehler;
    }

    setBlockPunkt(blockPunkt) {
        this.blockPunkt = blockPunkt;
    }

    getBlockPunkt() {
        return this.blockPunkt;
    }

    setBlock(block) {
        this.block = block;
    }

    getBlock() {
        return this.block;
    }

    setAss(ass) {
        this.ass = ass;
    }

    getAss() {
        return this.ass;
    }
}
