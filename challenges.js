
const challengedata = [
    {
        id: 0,
        name: "limiting-I",
        effect : () => new BN(2,0),
        req: "reach e10000 time and 1e160 gold at once",
        type: "pow",
        challengetype: "infinity",
        for: "gold",
        bordercolor: "blue",
        discription: "time gain is redused by ^0.5 <br> reward: gold ^ 2",
        goaldiscription: "reach e480 time and 1e15 gold",
        goal: () => player.money.time.gt(new BN(1,480)) && player.money.gold.gt(1e15),
        show: () => player.money.time.gt(new BN(1,10000)) && player.money.gold.gt(1e160),
        finish: () => infinity(),
    },
    {
        id: 1,
        name: "alpha-I",
        effect : () => new BN(1,3),
        req: "reach e31000 time and 1e740 gold at once",
        type: "mult",
        challengetype: "infinity",
        for: "IP",
        bordercolor: "green",
        discription: "gold gain is redused by ^0.5 <br> reward 1000 times IP",
        goaldiscription: "reach e10000 time and 1e155 gold",
        goal: () => player.money.time.gt(new BN(1,10000)) && player.money.gold.gt(new BN(1,155)),
        show: () => player.money.time.gt(new BN(1,31000)) && player.money.gold.gt(new BN(1,740)),
        finish: () => infinity(),
    },
    {
        id: 2,
        name: "gamma-I",
        effect : () => BN.log(player.money.infinitypoints, 1.5),
        req: "reach e45000 time and e1200 gold at once",
        type: "mult",
        challengetype: "infinity",
        for: "time",
        bordercolor: "cyan",
        discription: "gold and time gain is redused by ^0.5 <br> reward time mult by IP",
        goaldiscription: "reach e1150 time and 1e45 gold",
        goal: () => player.money.time.gt(new BN(1,1150)) && player.money.gold.gt(new BN(1,45)),
        show: () => player.money.time.gt(new BN(1,45000)) && player.money.gold.gt(new BN(1,1200)),
        finish: () => infinity(),
    },
    {
        id: 3,
        name: "omaga-I",
        effect : () => new BN(3,0),
        req: "reach e45000 time and e1200 gold at once",
        type: "pow",
        challengetype: "infinity",
        for: "IP",
        bordercolor: "indianred",
        discription: "gold mults are disabled <br> reward IP ^ 3",
        goaldiscription: "reach 1e75 time and 10000 gold",
        goal: () => player.money.time.gt(new BN(1,75)) && player.money.gold.gt(new BN(1,4)),
        show: () => player.money.time.gt(new BN(1,45000)) && player.money.gold.gt(new BN(1,1200)),
        finish: () => infinity(),
    },
    {
        id: 4,
        name: "indoran-I",
        effect : () => new BN(1.25,0),
        req: "reach e48000 time and e1300 gold at once",
        type: "pow",
        challengetype: "infinity",
        for: "time",
        bordercolor: "red",
        discription: "time ^ 1.5 but gold ^0.25 <br> reward time ^1.25",
        goaldiscription: "reach e39000 time and 1e300 gold",
        goal: () => player.money.time.gt(new BN(1,39000)) && player.money.gold.gt(new BN(1,300)),
        show: () => player.money.time.gt(new BN(1,48000)) && player.money.gold.gt(new BN(1,1300)),
        finish: () => infinity(),
    },
    {
        id: 5,
        name: "arondurnum-I",
        effect : () => new BN(1.25,0),
        req: "reach e92000 time and e1600 gold at once",
        type: "pow",
        challengetype: "infinity",
        for: "gold",
        bordercolor: "lime",
        discription: "time ^ 0.3 but gold ^1.5 <br> reward gold ^1.25",
        goaldiscription: "reach e1250 time and 1e130 gold",
        goal: () => player.money.time.gt(new BN(1,1250)) && player.money.gold.gt(new BN(1,130)),
        show: () => player.money.time.gt(new BN(1,92000)) && player.money.gold.gt(new BN(1,1600)),
        finish: () => infinity(),
    },
    {
        id: 6,
        name: "eterni-I",
        effect : () => new BN(5,1),
        req: "reach e1.15e5 time",
        type: "pow",
        challengetype: "infinity",
        for: "IP",
        bordercolor: "purple",
        discription: "time ^ 0.5 but gold ^5: IP ^ 50",
        goaldiscription: () => {
            if(ups[30].brought) return (player.challenge.doomed ? "reach e14000 time and the e5000 gold goal has been destabilized" : "reach e14000 time and the e1000 gold goal has been destabilized");
            return (player.challenge.doomed ? "reach e14000 time and lessthan e5000 gold" : "reach e14000 time and lessthan e1000 gold");
        },
        goal: () => player.money.time.gt(new BN(1,14000)) && (player.money.gold.lt(new BN(1,1000)) || ups[30].brought ||(player.challenge.doomed && player.money.gold.lt(new BN(1,5000)))),
        show: () => player.money.time.gt(new BN(1,1.15e5)),
        finish: () => infinity(),
    },
    {
        id: 7,
        name: "delta-E",
        effect : () => BN.pow(player.money.eternitypoints,2.5),
        req: "reach e7000 IP",
        type: "mult",
        challengetype: "eternity",
        for: "IP",
        bordercolor: "#3a46a1",
        discription: "time, gold, IP ^.5 <br> reward IP mult by EP",
        goaldiscription: "reach e3333 IP",
        goal: () => player.money.infinitypoints.gt(new BN(1,3333)),
        show: () => player.money.infinitypoints.gt(new BN(1,7000)),
        finish: () => eternity(),
    },
    {
        id: 8,
        name: "altoro-E",
        effect : () => BN.log(player.money.gold,100).pow(2),
        req: "reach e3e6 time",
        type: "mult",
        challengetype: "eternity",
        for: "EP",
        bordercolor: "#c506e4",
        discription: "gold, IP ^0 <br> reward EP mult by gold",
        goaldiscription: "reach 1e200 time",
        goal: () => player.money.time.gt(new BN(1,200)),
        show: () => player.money.time.gt(new BN(1,3e6)),
        finish: () => eternity(),
    },
    {
        id: 9,
        name: "extra-E",
        effect : () => BN.root(player.money.gold,100).pow(2),
        req: "reach e3.66e6 time",
        type: "mult",
        challengetype: "eternity",
        for: "IP",
        bordercolor: "#cb0c95",
        discription: "gold, IP ^0.05 <br> reward IP mult by gold",
        goaldiscription: "reach 1e875 IP",
        goal: () => player.money.infinitypoints.gt(new BN(1,875)),
        show: () => player.money.time.gt(new BN(1,3.66e6)),
        finish: () => eternity(),
        softcap: new BN(1,1000),
        cap: new BN(1,1e5),
    },
    {
        id: 10,
        name: "otarnode-E",
        effect : () => BN.root(player.money.gold,100),
        req: "reach e27500 gold",
        type: "unlock",
        challengetype: "eternity",
        for: "IP",
        bordercolor: "#aadfc6",
        discription: "gold ^0.0333 <br> reward unlock a slider for EP",
        goaldiscription: "reach e88888 time with 1 or less infinites",
        goal: () => player.reset.infinites <= 1 && player.money.time.gt(new BN(1,88888)),
        show: () => player.money.gold.gt(new BN(1,27500)) && player.reset.eternites > 0,
        finish: () => eternity(),
        softcap: new BN(1,1000),
        cap: new BN(1,1e5),
    },
    {
        id: 11,
        name: "dilium-E",
        effect : () => new BN(3.1,0),
        req: "reach 1e100 EP",
        type: "pow",
        challengetype: "eternity",
        for: "EP",
        bordercolor: "#aae992",
        discription: "IP ^0.01 <br> reward EP ^ 3.1",
        goaldiscription: "reach e3.2e6 time",
        goal: () => player.money.time.gt(new BN(1,3.2e6)),
        show: () => player.money.eternitypoints.gt(new BN(1,100)),
        finish: () => eternity(),
    },
]

function makenewchallenge(data = tabdefaultdata){
    const para = document.createElement("button");
    const sp = document.createElement("span");

    const element = document.getElementById("challenge");
    let child = element.appendChild(para);
    child.classList.add("challenge");
    child.classList.add("hidden");
    child.style.borderColor = data.bordercolor;
    child.appendChild(sp);
    return child;
}

class challenge{
    constructor(data){
        this.effect = data.effect;
        this.show = data.show;
        this.goal = data.goal;
        this.finish = data.finish;
        this.name = data.name;
        this.type = data.type;
        this.for = data.for;
        this.id = data.id;
        this.discription = data.discription;
        this.goaldiscription = data.goaldiscription;
        this.challengetype = data.challengetype;
        this.req = data.req;

        if(typeof data.softcap != "undefined") this.softcap = data.softcap;
        if(typeof data.cap != "undefined") this.cap = data.cap;
        this.ele = makenewchallenge(data);
        this.ele.onclick = () => this.start(this.id);
    }

    effect = () => new BN(5,1);
    show = () => true;
    goal = () => true;
    finish = () => infinity();

    name = "";
    ele = document.createElement("button");
    discription = "";
    goaldiscription = "";
    type = "mult";
    for = "time";
    id = 0;
    competed = false;
    challengetype = "infinity";

    softcap = new BN(1,10);
    cap = new BN(1,100);
    req = "never";

    start(id = 0){
        this.finish();
        player.challenge.challengein = id;
        if(this.challengetype == "infinity") notify("started challenge: " + this.name,3 , "#FFaa00")
        if(this.challengetype == "eternity") notify("started challenge: " + this.name,3 , "#aa00aa")
    }

    showchallenge(){
        if(!this.ele.classList.contains("hidden")) return true;
        if(this.show()) this.ele.classList.remove("hidden");
        else return false;
        if(this.challengetype == "infinity") notify("unlocked challenge: " + this.name,3 , "#FFaa00")
        if(this.challengetype == "eternity") notify("unlocked challenge: " + this.name,3 , "#aa00aa")
    }

    tick(){
        this.showchallenge();
        let text = this.name;
        text += "<br>" + this.discription;
        text += "<br> goal: " + (typeof this.goaldiscription == "function" ? this.goaldiscription() : this.goaldiscription);
        text += "<br> effect: " + this.effectordefault().toString();
        this.ele.children[0].innerHTML = text;

        if(player.challenge.challengein == this.id){
            if(this.goal()) {
                this.finish();
                player.challenge.challengein = -1;
                this.competed = true;
            }
        }
        if(this.challengetype == "infinity"){
            if(this.competed) this.ele.classList.add("icdone");
            else this.ele.classList.remove("icdone");
        }
        if(this.challengetype == "eternity"){
            if(this.competed) this.ele.classList.add("ecdone");
            else this.ele.classList.remove("ecdone");
        }
        
    }

    effectordefault(dif = 1){
            if(this.type == "unlock") return this.competed;
            if(this.effect().lt(dif) || this.effect().isNaN()) return new BN(dif);
            if(this.competed || this.type == "reset") return this.scap(this.effect());
            return new BN(dif);
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

var challenges = [];


function nextchallenge(){
    let e = "";
    challenges.forEach(x =>{
        if(!x.showchallenge()&& e == "") e = x.req + "<br>for challenge " + x.name;
        if(x.id == 11 && e == "") e = "all challenges unlock";
    });
    return e;
}
