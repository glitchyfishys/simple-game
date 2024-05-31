
const mmm ={
    name:"place holder",
    cost: new BN(1,1e308),
    effect: () => 1,
    id: 0,
    decription: "none",
    reqire:false,
    ugkey:"timebits",
    type:"add",
    for:"time",
}

class upgrade{
    constructor(data = mmm){
        this.name = data.name;
        this.cost = data.cost;
        this.currencykey = data.currencykey;
        this.effect = data.effect;
        this.bitid = data.id;
        this.decription = data.decription;
        this.reqire = data.reqire;
        this.ugkey = data.ugkey;
        this.type = data.type;
        this.for = data.for;
        if(data.softcap instanceof BN) this.softcap = data.softcap;
        if(data.cap instanceof BN) this.cap = data.cap;
        if(this.type == "reset") this.reset = data.reset;
    }

    element = document.createElement("button");
    name = "";
    decription = "";
    cost = new BN;
    brought = false;
    currencykey = "time";
    effect = () => new BN(1,0);
    funct = () => this.buy(this.currencykey)
    bitid = 0;
    ugkey = "";
    reqire = false;
    type = "add";
    for = "time";
    reset = () => false;
    softcap = new BN(1,1e308);
    cap = new BN(1,1e308);

    buy(){
        if(this.brought) return false;
        
        if(this.cost.length != undefined && this.cost.length != 0){
            for (let i = 0; i < this.cost.length; i++) {
                if(!player.money[this.currencykey[i]].gte(((typeof this.cost != "object" ? this.cost[i]() : this.cost[i])))) {
                    return false
                }
            }
            if(this.type == "reset"){
                this.brought = true;
                return true;
            }
            for (let i = 0; i < this.cost.length; i++) {
                player.money[this.currencykey[i]].sub(((typeof this.cost != "object" ? this.cost[i]() : this.cost[i])));
            }

        }else{
            if(player.money[this.currencykey].lt(((typeof this.cost != "object" ? this.cost() : this.cost)))) return false;
            if(this.type == "reset"){
                this.brought = true;
                return true;
            }
            player.money[this.currencykey].sub(((typeof this.cost != "object" ? this.cost() : this.cost)));
        }

        this.brought = true;
        return true;
    }

    buyable(){
        if(this.type == "reset") this.checkreset();

        this.ugtext();

        if(this.brought) {
            this.element.classList.add("brought");
            this.element.classList.remove("buyable");
            return false;
        }
        if(this.canbebrought()) {
            this.element.classList.add("buyable");
            this.element.classList.remove("unbuyable");
            return true;
        }
        this.element.classList.add("unbuyable");
        this.element.classList.remove("buyable");
        this.element.classList.remove("brought");
        return false;
    }

    ugtext(){
        this.displayed();
        let text = this.name;
        if(this.cost.length != undefined && this.cost.length != 0){
            text += "<br/>cost: ";
            for (let i = 0; i < this.cost.length; i++) {
                
                text += (typeof this.cost[i] === "function" ? this.cost[i]().toString(1) : this.cost[i].toString(1)) + " " + this.currencykey[i];
                if(this.cost.length != i) text += ", "; 
            }
        }else{
            text += "<br/>cost:" + ((typeof this.cost != "object" ? this.cost().toString(1) : this.cost.toString(1)) + " " + this.currencykey);
        }

        text +=  "<br/>" + this.decription;
        if(this.type == "unlock"){
            text +=  "<br />unlocked: " + this.effectordefault(1).toString();
        }else{
            this.type == "reset" ? text +=  "<br/>reset for: " + this.effectordefault(1).toString() :
            text +=  "<br/>effect: " + this.effectordefault(1).toString();
        }
        this.element.firstChild.innerHTML = text;
        return text;
    }

    canbebrought(){
        if(this.brought) return false;
        let check = true;
        if(this.cost.length != undefined && this.cost.length != 0){
            for (let i = 0; i < this.cost.length; i++) {
                if(!player.money[this.currencykey[i]].gte(((typeof this.cost != "object" ? this.cost[i]() : this.cost[i])))) {
                    check = false;
                    break
                }
            }
            return check;
        }else{
            if(player.money[this.currencykey].lt(((typeof this.cost != "object" ? this.cost() : this.cost)))) return false;
            return true;
        }
    }

    effectordefault(dif = 1,type = "time"){
        if(Array.isArray(this.for)){
            if(!this.brought) return dif;
            let index = this.for.indexOf(type);
            let e = this.scap(this.effect[index]());
            if(e.lt(dif) || e.isNaN() || e.m == 0) return new BN(dif);
            return e;
        }else{
            //if(this.bitid == 19 && this.type == "reset") console.log(this.scap(this.effect()))
            if(this.type == "unlock") return this.brought;
            let e = this.effect();
            if(e.lt(dif) || e.isNaN() || e.m == 0) return new BN(dif);
            if(this.brought || this.type == "reset") return this.scap(e);
            return new BN(dif);
        }
    }

    tick(){
        this.buyable()
    }

    displayed(){
        if( typeof this.reqire == "function" ? this.reqire() : this.reqire){
            this.element.classList.remove("hidden")
        }
        else{
            this.element.classList.add("hidden")
        }
    }

    checkreset(){
        if(this.element.classList.contains("buyable")) this.element.classList.add("reset");
        else this.element.classList.remove("reset");
        if(this.brought) this.reset();
        this.brought = false;
    }

    scap(effect){
        if(this.type == "unlock") return this.brought;
        if(effect.gt(this.softcap)) {
            //remember to add to eff (the logs X + 1) so that big change doesn't break the game
            let eff = (new BN(effect,0,false)).div(this.softcap).add(2);
            let sc =  eff.log(3);
            return this.hcap(effect.div(sc));
        }
        return effect;
    }

    hcap(effect){
        if(this.type == "unlock") return this.brought;
        if(effect.gt(this.cap)) return this.cap;
        return effect;
    }

}
