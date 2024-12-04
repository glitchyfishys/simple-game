const realitys = [
    {
        id: 0,
        name: "Tasdom's reality",
        show: () => true,
        effect: () => new BN(1e5),
        icon: "ξ",
        discription: "reward: the first five absolute upgrades don't use slots, also lower the dilation penalty",
        color: "blue",
        forced: () => Creality[6].active || Creality[7].active || Creality[9].active,
        nerfs: {
            time: 0.8,
            gold: 0.8,
            IP: 0.8,
            EP: 0.8,
            relics: 0.8,
        }
    },
    {
        id: 1,
        name: "Raadun's reality",
        show: () => Creality[0].complete,
        effect: () => new BN(1e5),
        icon: "Ψ",
        discription: "reward: unlock 3 absolutism upgrades and the softcap removing upgrade can be bought with a redused effect",
        color: "red",
        forced: () => Creality[8].active || Creality[9].active,
        nerfs: {
            time: 0.625,
            gold: 0.4,
            IP: 0.4,
            EP: 0.6,
            norelics: "no relics",
        }
    },
    {
        id: 2,
        name: "Exrindal's reality",
        show: () => Creality[1].complete,
        effect: () => new BN(1e5),
        icon: "λ",
        discription: "reward: gain DT outside of dilation with ABSO-UG 9 (expansion)",
        color: "green",
        forced: () => Creality[6].active || Creality[9].active,
        nerfs: {
            time: 0.2,
            gold: 0.2,
            IP: 0.2,
            EP: 0.2,
            relics: 1.85,
            noDT: "no dilated time",
        }
    },
    {
        id: 3,
        name: "Nilanda's reality",
        show: () => Creality[2].complete,
        effect: () => BN.root( player.reset.absolutism, 3),
        icon: "ϗ",
        discription: "reward: make reality transporter free, you also get a time power based on absolutes",
        color: "#aaaa00",
        forced: () => Creality[7].active || Creality[9].active,
        nerfs: {
            time: 0.25,
            gold: 0.25,
            IP: 0.05,
            EP: 0.05,
            DT: () => BN.min(0.15 + Math.log10(player.money.eternitypoints.e+1) / 2.75 , 0.75),
            DTscale: "DT ^0.15 but scales based on EP",
            norelics: "no relics",
        }
    },
    {
        id: 4,
        name: "Huda's reality",
        show: () => Creality[3].complete || Creality[9].active,
        effect: () => 5,
        icon: "ϖ",
        discription: "reward: you have five more cores",
        color: "#00aaff",
        forced: () => Creality[7].active || Creality[9].active,
        nerfs: {
            time: () => BN.min( Math.log10(player.money.time.e+3) ** 0.7 / 30 , 0.75),
            gold: () => BN.min(Math.log10(player.money.gold.e+3) ** 0.7 / 30, 0.75),
            IP: () => BN.min(Math.log10(player.money.infinitypoints.e+3) ** 0.7 / 25, 0.75),
            EP: () => BN.min(Math.log10(player.money.eternitypoints.e+3) ** 0.8 / 20, 0.75),
            DT: () => BN.min(Math.log10(player.money.dilatedtime.e+3) ** 2.2 / 15, 0.75),
            relics: () => BN.min(Math.log10(player.money.relics.e+3) ** 1.95 / 10, 0.75),
            scale: "all resorces start at ^0 but scale based on their amount",
        }
    },
    {
        id: 5,
        name: "Zedom's reality",
        show: () => Creality[4].complete,
        effect: () => !Creality[5].complete ? 1 : 500 * ((reality.completedHardAmount+1) ** 2),
        icon: "Ϟ",
        discription: "reward: unlock hard realitys that force others to be active and gain a multiplier to aboslutisms for completing hard realitys, along with imporving absolutism upgrades",
        color: "#aaaaff",
        forced: () => false,
        nerfs: {
            time: () => BN.log(player.money.dilatedtime, 27).div(11200),
            noTimescale: "no normal time?",
        }
    },
    {
        id: 6,
        name: "Yaron's reality",
        show: () => Creality[5].complete,
        effect: () => 5,
        icon: "ε",
        discription: "",
        color: "#ffaa33",
        forced: () => false,
        nerfs: {
            tasdom: "Tasdom's reality",
            exrindal: "Exrindal's reality"
        }
    },
    {
        id: 7,
        name: "Myrin's reality",
        show: () => Creality[5].complete,
        effect: () => 5,
        icon: "δ",
        discription: "",
        color: "#33aaaa",
        forced: () => Creality[8].active,
        nerfs: {
            tasdom: "Tasdom's reality",
            huda: "Huda's reality",
            nilanda: "Nilanda's reality"
        }
    },
    {
        id: 8,
        name: "Krinly's reality",
        show: () => Creality[5].complete,
        effect: () => 5,
        icon: "Ξ",
        discription: "",
        color: "#ff33ff",
        forced: () => false,
        nerfs: {
            myrin: "Myrin's reality",
            raadun: "Raadun's reality"
        }
    },
    {
        id: 9,
        name: "Alpha's reality",
        show: () => reality.completedHardAmount > 2,
        effect: () => 5,
        icon: "⨀",
        discription: "reward: unlock two upgrades",
        color: "black",
        forced: () => false,
        nerfs: {
            all: "first five realitys",
            oddscale: "something is odd about this reality",
            oddbits: () => `you have found ${game.alphabits}/15 odditys`
        }
    },
    {
        id: 10,
        name: "The Multiverse",
        show: () => ups[62].brought,
        effect: () => 5,
        icon: "⩈",
        discription: "reward: destroy the Multiverse and end the game",
        color: "black",
        forced: () => false,
        nerfs: {
            time: 1e-10,
            gold: 5e-4,
            IP: 2.5e-4,
            EP: 1e-3,
            DT: 0.1125,
            relics: 1.622e-4,
        }
    },
]

var Creality = [];

class reality{
    constructor(data){
        this.effect = data.effect;
        this.show = data.show;
        this.forced = data.forced;
        this.name = data.name;
        this.id = data.id;
        this.discription = data.discription;
        this.nerfs = data.nerfs;

        this.ele = makenewreality(data);
        this.ele.children[1].onclick = () => this.start(this.id);
    }

    effect = () => new BN(5,1);
    show = () => true;
    forced = () => true;

    id = 0;
    name = "";
    ele = document.createElement("div");
    discription = "";
    goaldiscription = "";
    nerfs = {time: 0.1};

    update(){
        if(this.show()) this.ele.classList.remove("void");
        if(this.complete) this.ele.style.borderColor = this.id > 5 ? "red" : "lime";
    }

    get active() {
        return this.forced() || player.challenge.currentreality == this.id;
    }

    start(){
        player.challenge.currentreality = -1;
        absolutism(false);
        player.challenge.currentreality = this.id;
        if(this.id < 6) glitchstrikes[12 + (this.id * 2 - 1)].trigger();
        if(this.id == 9) glitchstrikes[23].trigger();
    }

    finish(){
        if(this.complete) return;
        player.challenge.RealitysComplete += (2 ** this.id);
        if(this.id < 6) glitchstrikes[12 + (this.id * 2)].trigger();
        if(this.id == 9) glitchstrikes[25].trigger();
        if(this.id == 10) glitchstrikes[28].trigger();
    }

    remove(){
        if(!this.complete) return;
        player.challenge.RealitysComplete -= (2 ** this.id);
    }

    get complete(){
        return (player.challenge.RealitysComplete & (2 ** this.id)) != 0;
    }

    get nerflist(){
        let effects = [];
        Object.keys(this.nerfs).forEach(k => {
            if(typeof this.nerfs[k] == "string") {
                if (!k.includes("scale")) effects.push(this.nerfs[k]);
            }
            else if (typeof this.nerfs[k] == "number" || this.nerfs[k] instanceof BN){
                effects.push( k + " ^" + this.nerfs[k])
            }
            else if (typeof this.nerfs[k] == "function"){
                if(typeof this.nerfs[k]() == "string") effects.push(this.nerfs[k]());
                else effects.push( k + " ^" + this.nerfs[k]());
            }
            else{
                effects.push(this.nerfs[k]);
            }
        })
        return makeEnumeration(effects);
    }

    static complete(){
        if(player.challenge.currentreality == -1) return;
        Creality[player.challenge.currentreality].finish();
        if(this.id < player.challenge.currentreality) glitchstrikes[12 + (Creality[player.challenge.currentreality].id * 2)].trigger();
    }

    static get completedAmount(){
        let c=0;
        Creality.forEach(x => x.complete ? c++ : false);
        return c
    }

    static get completedHardAmount(){
        let c=0;
        Creality.forEach(x => (x.id > 5 && x.complete) ? c++ : false);
        return c
    }

    static updateall(){
        Creality.forEach(x => x.update());
    }
}

function makenewreality(data){
    const para = document.createElement("div");
    const sp = document.createElement("span");

    const element = document.getElementById("reality");
    let child = element.appendChild(para);
    child.innerHTML = data.name;
    child.classList.add("reality");
    child.classList.add("void");
    child.style.backgroundColor = data.color;
    child.appendChild(sp);

    const c = document.createElement("div");
    c.classList.add("reality-icon");
    c.innerHTML = `<span class='Ricon'> ${data.icon} </span>`;
    child.appendChild(c);

    let effects = [];
    Object.keys(data.nerfs).forEach(k => {
        if(typeof data.nerfs[k] == "string") {
            effects.push(data.nerfs[k]);
        }
        else if (typeof data.nerfs[k] == "number" || data.nerfs[k] instanceof BN){
            effects.push( k + " ^" + data.nerfs[k])
        }
        else if (typeof data.nerfs[k] == "function"){}
        else{
            effects.push(data.nerfs[k]);
        }
    })

    child.innerHTML += `<div style='position: absolute; top: 140px;'>${data.discription}</div> <br> <div class='lower' style='left: 5px; bottom: 5px;'>nerfs: ${makeEnumeration(effects)}</div>`;

    return child;
}

function makeEnumeration(items) {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    const commaSeparated = items.slice(0, items.length - 1).join(", ");
    const last = items[items.length - 1];
    return `${commaSeparated}, and ${last}`;
  };