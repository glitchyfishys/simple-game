
const absopick = [
    {
        id: 0,
        name: "time impower",
        for: "time",
        type: "mult",
        dec: "10x time for everytime you have gone absolute",
        effect: () => BN.pow(10, Math.min(player.reset.absolutism, Creality[5].effect() * 200 )),
        shown: () => true,
        cost: new BN(1),
        slotcost: 1
    },
    {
        id: 1,
        name: "gold impower",
        for: "gold",
        type: "mult",
        dec: "10x gold for everytime you have gone absolute",
        effect: () => BN.pow(10, Math.min(player.reset.absolutism, Creality[5].effect() * 200 )),
        shown: () => true,
        cost: new BN(1),
        slotcost: 1
    },
    {
        id: 2,
        name: "infinity impower",
        for: "IP",
        type: "mult",
        dec: "10x IP for everytime you have gone absolute",
        effect: () => BN.pow(10, Math.min(player.reset.absolutism, Creality[5].effect() * 200 )),
        shown: () => true,
        cost: new BN(1),
        slotcost: 1
    },
    {
        id: 3,
        name: "eternity impower",
        for: "EP",
        type: "mult",
        dec: "10x EP for everytime you have gone absolute",
        effect: () => BN.pow(10, Math.min(player.reset.absolutism, Creality[5].effect() * 200 )),
        shown: () => true,
        cost: new BN(1),
        slotcost: 1
    },
    {
        id: 4,
        name: "relic impower",
        for: "relics",
        type: "mult",
        dec: "10x relics for everytime you have gone absolute",
        effect: () => BN.pow(10, Math.min(player.reset.absolutism, Creality[5].effect() * 200 )),
        shown: () => true,
        cost: new BN(1),
        slotcost: 1
    },
    {
        id: 5,
        name: "golden switch",
        for: "time",
        type: "unlock",
        dec: "all golden sliders are at max value and eterni-I has no gold reqiurement",
        effect: () => BN.pow(10, player.reset.absolutism),
        shown: () => player.reset.absolutism > 2,
        cost: new BN(2),
        slotcost: 1
    },
    {
        id: 6,
        name: "automatum",
        for: "time",
        type: "unlock",
        dec: "unlock eternity and relic autobuyers and all autobuys are permanent",
        effect: () => BN.pow(10, player.reset.absolutism),
        shown: () => player.reset.absolutism > 2,
        cost: new BN(2),
        slotcost: 1
    },
    {
        id: 7,
        name: "challenge override",
        for: "time",
        type: "unlock",
        dec: "absolutism no longer resets challenges<br> (full comention when brought)",
        effect: () => BN.pow(10, player.reset.absolutism),
        shown: () => player.reset.absolutism > 2,
        cost: new BN(2),
        slotcost: 1
    },
    {
        id: 8,
        name: "prestigious",
        for: "time",
        type: "unlock",
        dec: "gain all of gold, IP and EP per second",
        effect: () => BN.pow(10, player.reset.absolutism),
        shown: () => player.reset.absolutism > 2,
        cost: new BN(2),
        slotcost: 1
    },
    {
        id: 9,
        name: "expansion",
        for: "DT",
        type: "mult",
        dec: "gain all of DT while in dilation per second when in dilation and gain more DT based on absolutes",
        effect: () => BN.pow(Math.min(player.reset.absolutism, Creality[5].effect() * 4000), 20),
        shown: () => player.reset.absolutism > 4,
        cost: new BN(2),
        slotcost: 2
    },
    {
        id: 10,
        name: "external",
        for: "relics",
        type: "mult",
        dec: "gain all relic per second and increase the gold goal of eterni-I based on the amount of times you have gone absolute",
        effect: () => BN.pow(player.reset.absolutism, 1),
        shown: () => player.reset.absolutism > 5,
        cost: new BN(5),
        slotcost: 2
    },
    {
        id: 11,
        name: "escape",
        for: "relics",
        type: "unlock",
        dec: "half the exponent requirement of the absolutism reset",
        effect: () => BN.pow(10, player.reset.absolutism),
        shown: () => player.reset.absolutism > 7,
        cost: new BN(5),
        slotcost: 3
    },
    {
        id: 12,
        name: "reality transporter",
        for: "relics",
        type: "unlock",
        dec: "unlock realitys",
        effect: () => BN.pow(10, player.reset.absolutism),
        shown: () => player.reset.absolutism > 10,
        cost: new BN(150),
        slotcost: 5
    },
    {
        id: 13,
        name: "slide enhance",
        for: "relics",
        type: "mult",
        dec: "sliders have a 15 times higher cap",
        effect: () => new BN(15),
        shown: () => Creality[1].complete,
        cost: new BN(500),
        slotcost: 3
    },
    {
        id: 14,
        name: "subatstic dilation",
        for: "relics",
        type: "pow",
        dec: "gain a power to DT based on absolutes",
        effect: () => BN.log(player.reset.absolutism, Creality[5].complete ? 5 : 15),
        shown: () => Creality[1].complete,
        cost: new BN(500),
        slotcost: 3
    },
    {
        id: 15,
        name: "power ride",
        for: "relics",
        type: "power",
        dec: "get a time power for every reality completed",
        effect: () => BN.pow(3, reality.completedAmount),
        shown: () => Creality[1].complete,
        cost: new BN(500),
        slotcost: 3
    },
]

var pick = [];

class picker {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.dec = data.dec;
        this.for = data.for;
        this.type = data.type;
        this.effect = data.effect;
        this.shown = data.shown;
        this.cost = data.cost;
        this.slotcost = data.slotcost;
        this.makeEle();
        setTimeout(() => this.update(true), 0);
    }

    id = 0;
    name = "oops";
    dec = "oops";
    for = "time";
    type = "add";
    effect = () => new BN(1);
    shown = () => true;
    cost = new BN(1);
    ele = document.createElement("div");
    id = -1;
    slotcost = 1;

    makeEle(){
        const picker = document.getElementById("picker");
        let c = picker.appendChild(document.createElement("div"));
        c.classList.add("pickerbutton", "void");
        c.onclick = () => this.buy();
        this.ele = c;
    }

    update(){
        this.ele.innerHTML = `${this.name} <br> cost: ${this.cost} absolutism fragments <br><br> ${this.dec} <span class='lower'> this will use ${this.usedslots} slots <br> ${this.type == "unlock" ? `currently ${this.brought ? "unlocked" : "locked"}` : `effect: ${this.effect()}`}</span>`;

        if(this.shown()) this.ele.classList.remove("void");

        if(this.brought) this.ele.style.backgroundColor = "#677dbc";
        else this.ele.style.backgroundColor = "";
    }

    buy(){
        if(this.brought) return;
        if(picker.totalusedslots < this.usedslots) return notify(`this upgrade will take up to many slots (${this.usedslots - picker.totalusedslots})`, 3, "#dd5555");
        if(player.money.absolutismfragments.gte(this.cost)){
            player.upgrades.absolutismbits += (2 ** this.id);
            player.money.absolutismfragments = player.money.absolutismfragments.sub(this.cost);
            this.update();
            this.onbuy();
        }
    }

    get usedslots(){
        if(this.id == 12 && Creality[3].complete) return 0;
        if(this.id < 5 && Creality[0].complete) return 0;
        return this.slotcost;
    }

    reset(){
        if(!this.brought || this.usedslots < 1) return;
        player.money.absolutismfragments.add(this.cost);
        player.upgrades.absolutismbits -= (2 ** this.id);
        this.update();
    }

    effectordefault(dif = 1,type = "time"){
        if(Array.isArray(this.for)){
            if(!this.brought) return dif;
            let index = this.for.indexOf(type);
            let e = this.scap(this.effect[index]());
            if(e.lt(dif) || e.isNaN() || e.m == 0) return new BN(dif);
            return e;
        }else{
            if(this.type == "unlock") return this.brought;
            let e = this.effect();
            if(e.lt(dif) || e.isNaN() || e.m == 0) return new BN(dif);
            if(this.brought || this.type == "reset") return e;
            return new BN(dif);
        }
    }

    onbuy(){
        if(this.id == 7){
            challenges.forEach(x => {
                x.competed = true
                x.showchallenge(true);
            });
        }
        else if (this.id == 12) glitchstrikes[10].trigger();
    }

    get brought(){
        return( player.upgrades.absolutismbits & (2 ** this.id)) != 0;
    }

    static clear(){
        document.getElementById("picker").innerHTML = "";
    }

    static get totalBrought(){
     return pick.filter(p => p.brought).length;   
    }

    static get totalusedslots(){
        let slots = picker.maxupgrades;
        pick.forEach(p => p.brought ? slots -= p.usedslots : 0);
        return slots;
    }

    static updateall(){
        pick.forEach(x => x.update());
    }

    static get maxupgrades(){
        if(Creality[4].complete) return 15;
        return 10;
    }
}
