
var i = 0;
var deltatime = 0;
var last = Date.now();
var n = new BN;
var ticks = 0;

var player = {
    money: {
        gold: new BN,
        time: new BN,
        dilatedtime: new BN,
        infinitypoints: new BN,
        eternitypoints: new BN,
        relics: new BN,
    },
    upgrades:{
        timebits: 0,
        goldbits: 0,
        infinitybits: 0,
        eternitybits: 0,
    },
    goldensliders:{
        value: [],
        currentvalue: []
    },
    reset: {
        goldify: 0,
        infinites: 0,
        eternites: 0,
        armageddons: 0,
    },
    setings: {
        animations: []
    },
    challenge: {
        hasunlockedchallenges: false,
        challengein: -1,
        ICunlocks: 0,
        ICcompeted : 0,
        ECunlocks: 0,
        ECcompeted : 0,
        doomed: false,
    },
    dev: {
        auto: []
    },
    automation: [],
    tablefton: 0,
    break: false,
    overdilatedtime: 1,
    softcapeffectdiv: 1,
    strikebits:0,
    end: false,
    lasttick: 0,
}

function start() {
    console.warn("why? how did you get here?");
    event();
    autosetup();
    upgrades.forEach(x => ups[x.inid] = new upgrade(x));
    ups.forEach(x => x.element = makenewelement("upgrades", x));
    tabs.forEach(x => makenewtab(x));
    goldslider.forEach(x => {sliders[x.inid] = new goldenslider(x);makenewgslider(x)});
    challengedata.forEach(x => challenges[x.id] = new challenge(x))
    strikes.forEach(x => glitchstrikes[x.id] = new strike(x) );

    if(typeof localStorage.player != "undefined") load();
    changetab(player.tablefton);

    setInterval(Tick, 25);
    setInterval(updateUI, 50);
    setInterval(autotick, 50);
    setInterval(save, 30000);

    updateUI();
    Tick();
    
    if(localStorage.player == undefined)setTimeout(() => alert("hi"), 5);
    document.getElementById("main").style.display = "block";
    document.getElementById("tabholder").style.display = "block";
} 

function autotick(){
    auto.forEach(x => x.tick())
}

function Tick(tick = 0) {
    if(player.challenge.doomed && ups[59].brought) glitchstrikes[6].trigger();
    if(player.challenge.doomed && player.softcapeffectdiv == Infinity ) glitchstrikes[7].trigger();
    if(player.money.relics.gt(new BN(1,1000))) glitchstrikes[8].trigger();
    if(player.softcapeffectdiv == Infinity) ending();
    if(tick == 0){
        deltatime = (Date.now() - last) / 1000;
        last = Date.now();
    }
    else{
        deltatime = tick;
    }
    br = player.break;
    if(player.money.time.gt(new BN(1,10000)) && player.money.gold.gt(1e160)) player.hasunlockedchalenges = true;
    time(deltatime);
    if(ups[59].brought) player.softcapeffectdiv *= (deltatime*3) + 1;
    if(ups[36].brought || document.getElementById("autogoldgain").checked) player.money.gold.add(ups[8].effectordefault(0).mult(deltatime));
    if(document.getElementById("autoIPgain").checked) player.money.infinitypoints.add(ups[19].effectordefault(0).mult(deltatime));
    if(document.getElementById("autoEPgain").checked) player.money.eternitypoints.add(ups[29].effectordefault(0).mult(deltatime));
    if(document.getElementById("autoDTgain").checked && player.challenge.challengein == 666) player.money.dilatedtime.add(DTgain().mult(deltatime));
    if(document.getElementById("autorelicsgain").checked && player.challenge.doomed) player.money.relics.add(ups[49].effectordefault(0).mult(deltatime));

}

function updateUI(){
    if(ticks % 2 == 0) {
        ups.forEach(x => x.tick());
        let text = ""
        text= `you have <span style="color: cyan">${player.money.time.toString()}</span> time : and are geting ${timemults().toString()} /s <br>`;
        text += progress() > 0 ? `you have <span style="color: gold">${player.money.gold.toString()}</span> gold, effect: ${goldeffect().toString()} <br>` : "<br>";
        text += progress() > 1 ? `you have <span style="color: orange">${player.money.infinitypoints.toString()}</span> IP <br>` : "<br>";
        text += progress() > 3 ? `you have <span style="color: #cc00ff">${player.money.eternitypoints.toString()}</span> EP <br>` : "<br>";
        text += progress() > 4 ? `you have <span style="color: lime">${player.money.dilatedtime.toString()}</span> DT <br>` : "<br>";
        text += progress() > 5 ? `you have <span style="color: red">${player.money.relics.toString()}</span> relics <br>` : "<br>";
        if(player.challenge.challengein != -1){
            text += "you are currently in challenge " + challenges[player.challenge.challengein].name + " ";
            text += typeof challenges[player.challenge.challengein].goaldiscription == "function" ? challenges[player.challenge.challengein].goaldiscription()
                : challenges[player.challenge.challengein].goaldiscription;
        }
        else text += "<br>";
        if(ups[59].brought) text += "<br>soft cap is lowered by " + new BN(player.softcapeffectdiv).toString();
        document.getElementById("time").innerHTML = text;
    }
    if(player.challenge.challengein != 666){
        document.getElementById("startdilation").children[0].innerHTML =  player.money.eternitypoints.gt(1.79e308) ? "start dilation" : "dilation locked until 1.8e308 EP"; 

    }else{
        
        if(player.money.infinitypoints.gt(new BN(1,1000))) document.getElementById("startdilation").children[0].innerHTML= "finish dilation and eternity for " + DTgain().toString() + " DT";
        else document.getElementById("startdilation").children[0].innerHTML = "to finish dilation, reach 1e1000 IP and eternity to gain DT"; 
    }

    if(ticks % 5 == 0){
        document.getElementById("challengeunlock").innerHTML = nextchallenge();

        if(progress() > 0) document.getElementById("sgoldifiy").classList.remove("hidden");
        else document.getElementById("sgoldifiy").classList.add("hidden");

        if(progress() > 1) document.getElementById("scrunch").classList.remove("hidden");
        else document.getElementById("scrunch").classList.add("hidden");

        if(progress() > 3) document.getElementById("seternity").classList.remove("hidden");
        else document.getElementById("seternity").classList.add("hidden");

        if(progress() > 4) document.getElementById("sdilation").classList.remove("hidden");
        else document.getElementById("sdilation").classList.add("hidden");

        if(progress() > 5) document.getElementById("sarmageddon").classList.remove("hidden");
        else document.getElementById("sarmageddon").classList.add("hidden");
    }

    if(ticks % 2 == 0) upgradebits(ups, "timebits");
    if(ticks % 2 == 0) upgradebits(ups, "goldbits");
    if(ticks % 2 == 0) upgradebits(ups, "infinitybits");
    if(ticks % 2 == 0) upgradebits(ups, "eternitybits");
    if(ticks % 10 == 0) document.getElementById("slidermax").innerHTML = "the maxium value of goldern sliders is " + goldenslider.maxtotal + "<br> slider effects apply affter upgrades <br><br>";
    sliders.forEach(x => x.updateslider());
    if(ups[40].brought) sliders.forEach(x => x.updatevalue());
    
    challenges.forEach(x => x.tick());
    if(challenges[0].show())player.challenge.hasunlockedchallenges = true;

    showtab();

    ticks++;
}

function time(sec){
    let m = timemults();
    m = m.mult(sec);
    player.money.time.add(m)
}

function challengeeffect(type = "time"){
    const id = player.challenge.challengein;
    let effect = 1;
    if(id == 0){
        if(type == "time") effect = 0.5;
    }
    if(id == 1){
        if(type == "gold") effect = 0.5;
    }
    if(id == 2){
        if(type == "time") effect = 0.5;
        if(type == "gold") effect = 0.5;
    }
    if(id == 3){
        if(type == "gold") effect = 0;
    }
    if(id == 4){
        if(type == "time") effect = 1.5;
        if(type == "gold") effect = 0.25;
    }
    if(id == 5){
        if(type == "time") effect = 0.3;
        if(type == "gold") effect = 1.25;
    }
    if(id == 6){
        if(type == "time") effect = 0.5;
        if(type == "gold") effect = 5;
    }
    if(id == 7){
        if(type == "time") effect = 0.5;
        if(type == "gold") effect = 0.5;
        if(type == "IP") effect = 0.5;
    }
    if(id == 8){
        if(type == "gold") effect = 0;
        if(type == "IP") effect = 0;
    }
    if(id == 9){
        if(type == "gold") effect = 0.05;
        if(type == "IP") effect = 0.05;
    }
    if(id == 10){
        if(type == "gold") effect = 0.05;
    }
    if(id == 11){
        if(type == "IP") effect = 0.01;
    }

    if(id == 666){
        if(ups[48].brought && !ups[59].brought){
            if(type == "time") effect = 1e-25;
            if(type == "gold") effect = 8e-4;
            if(type == "IP") effect = 1e-3;
        }
        else if(ups[42].brought){
            if(type == "time") effect = 0.6;
            if(type == "gold") effect = 0.15;
            if(type == "IP") effect = 0.2;
        }
        else{
        if(type == "time") effect = 0.4;
        if(type == "gold") effect = 0.05;
        if(type == "IP") effect = 0.125;
        }
    }

    if(player.challenge.doomed && !ups[59].brought){
        if(type == "time") effect *= 0.75;
        if(type == "gold") effect *= 0.75;
        if(type == "IP") effect *= 0.75;
    }

    return effect;
}

function makenewelement(parent = "", data = {name:"",funct: () => 0,cost: 0,currencykey: "time"}){
    const para = document.createElement("button");

    const element = document.getElementById(parent);
    let child = element.appendChild(para);
    child.onclick = data.funct;
    child.classList.add("upgrade");
    span(child,"hi");
    return child;
}

function timemults(){
    let mult = new BN(1,0);

    upgrades.forEach(x => {
        if(x.type == "add" && x.for.includes("time")) mult = mult.add(ups[x.inid].effectordefault(0, "time"))
    })
    upgrades.forEach(x => {
        if(x.type == "mult" && x.for.includes("time")) mult = mult.mult(ups[x.inid].effectordefault(1, "time"))
    })
    upgrades.forEach(x => {
        if(x.type == "pow" && x.for.includes("time")) mult = mult.pow(ups[x.inid].effectordefault(1,"time"))
    })
    mult = mult.mult(goldeffect());
    mult = goldenslidereffects(mult, "time")
    mult = mult.pow(challengeeffect("time"))
    return challengemult(mult, "time").mult(ResetBonus());
}

function ResetBonus(){
    const cap = 5;
    let ex = BN.max(BN.min(player.reset.goldify + 1, cap),1);
    ex = ex.mult(BN.max(BN.min(player.reset.infinites + 1, cap),1));
    ex = ex.mult(BN.max(BN.min(player.reset.eternites + 1, cap),1));
    return ex.mult(BN.max(BN.min(player.reset.armageddons + 1, cap),1));
}


function goldeffect(){
    return BN.pow(player.money.gold,1.2).add(1);
}

function challengemult(effect, type = "time"){
    challenges.forEach(x => {
        if(x.type == "add" && x.for.includes(type)) effect = effect.add(x.effectordefault(0, "time"))
    })
    challenges.forEach(x => {
        if(x.type == "mult" && x.for.includes(type)) effect = effect.mult(x.effectordefault(1, "time"))
    })
    challenges.forEach(x => {
        if(x.type == "pow" && x.for.includes(type)) effect = effect.pow(x.effectordefault(1,"time"))
    })
    return effect;
}

function save(){
    sliders.forEach(x => {
        player.goldensliders.value[x.id] = x.value;
        player.goldensliders.currentvalue[x.id] = x.currentvalue;
    });
    player.setings.animations[0] = document.getElementById("goldifiy").checked;
    player.setings.animations[1] = document.getElementById("crunch").checked;
    player.setings.animations[2] = document.getElementById("eternity").checked;
    player.setings.animations[3] = document.getElementById("dilation").checked;
    player.setings.animations[4] = document.getElementById("armageddon").checked;

    player.dev.auto[0] = document.getElementById("autogoldgain").checked;
    player.dev.auto[1] = document.getElementById("autoIPgain").checked;
    player.dev.auto[2] = document.getElementById("autoEPgain").checked;
    player.dev.auto[3] = document.getElementById("autoDTgain").checked;
    player.dev.auto[4] = document.getElementById("autorelicsgain").checked;

    player.automation[0] = document.getElementById("autotime").checked;
    player.automation[1] = document.getElementById("autogold").checked;
    player.automation[2] = document.getElementById("autoinfinity").checked;

    challenges.forEach(x => {
        if(!x.ele.classList.contains("hidden") && x.challengetype == "infinity") player.challenge.ICunlocks |= ( 1 << x.id);
        if(x.challengetype == "infinity" && x.competed) player.challenge.ICcompeted |= ( 1 << x.id);
        if(!x.ele.classList.contains("hidden") && x.challengetype == "eternity") player.challenge.ECunlocks |= ( 1 << x.id);
        if(x.challengetype == "eternity" && x.competed) player.challenge.ECcompeted |= ( 1 << x.id);
    });
    
    player.lasttick = last;
    glitchstrikes.forEach(x => {
        if(x.triggered)player.strikebits |= 1 << x.id;
    });
    
    localStorage.setItem("player", JSON.stringify(player) );
    notify("game saved", 2);
}

function load(){
    //console.log(JSON.parse(localStorage.getItem("player")))
    let p = JSON.parse(localStorage.getItem("player"));
    if(p.softcapeffectdiv != null)player.softcapeffectdiv = (Math.min(p.softcapeffectdiv, 1e308));
    else player.softcapeffectdiv = 1e308;

    player.end = p.end;
    player.tablefton = p.tablefton;
    player.hasunlockedchalenges = p.hasunlockedchalenges;
    player.challenge.challengein = p.challenge.challengein;
    player.challenge.ICunlocks = p.challenge.ICunlocks;
    player.challenge.ICcompeted = p.ICcompeted;
    player.challenge.hasunlockedchallenges = p.challenge.hasunlockedchallenges;

    player.challenge.doomed = p.challenge.doomed;
    
    glitchstrikes.forEach(x => {
        if( ((1 << x.id) & p.strikebits) > 0) x.triggered = true;
    });
    
    challenges.forEach(x => {
        if((p.challenge.ICunlocks & (1 << x.id)) > 0) x.ele.classList.remove("hidden");
        if((p.challenge.ICcompeted  & (1 << x.id)) > 0) x.competed = true;
        if((p.challenge.ECunlocks & (1 << x.id)) > 0) x.ele.classList.remove("hidden");
        if((p.challenge.ECcompeted  & (1 << x.id)) > 0) x.competed = true;
    })

    Object.keys(player.money).forEach(Key => {
        if(typeof player.money[Key] == "object" && typeof p.money[Key] == "object") player.money[Key] = p.money[Key]
    });
    
    Object.keys(player.upgrades).forEach(Key => {
        if(typeof player.upgrades[Key] == "number" && typeof p.upgrades[Key] == "number") player.upgrades[Key] = p.upgrades[Key]
    });
    
    ups.forEach(x => {
        if(player.upgrades.timebits & (1 << x.bitid) && x.ugkey == "timebits") x.brought = true;
    })
    ups.forEach(x => {
        if(player.upgrades.goldbits & (1 << x.bitid) && x.ugkey == "goldbits") x.brought = true;
    })
    ups.forEach(x => {
        if(player.upgrades.infinitybits & (1 << x.bitid) && x.ugkey == "infinitybits") x.brought = true;
    })
    ups.forEach(x => {
        if(player.upgrades.eternitybits & (1 << x.bitid) && x.ugkey == "eternitybits") x.brought = true;
    })

    Object.keys(player.reset).forEach(Key => {
        if(typeof player.reset[Key] == "number" && typeof p.reset[Key] == "number") player.reset[Key] = p.reset[Key]
    });

    Object.keys(player.money).forEach(key => player.money[key] = new BN(player.money[key]));
    

    sliders.forEach(x => {
        x.slidervalue = p.goldensliders.value[x.id];
        x.currentvalue = p.goldensliders.currentvalue[x.id];
    })
    if(p.setings.animations != undefined){
        document.getElementById("goldifiy").checked = p.setings.animations[0];
        document.getElementById("crunch").checked = p.setings.animations[1];
        document.getElementById("eternity").checked = p.setings.animations[2];
        document.getElementById("dilation").checked = p.setings.animations[3];
        document.getElementById("armageddon").checked = p.setings.animations[4];
    }
    if(p.automation != undefined){
        document.getElementById("autotime").checked = p.automation[0];
        document.getElementById("autogold").checked = p.automation[1];
        document.getElementById("autoinfinity").checked = p.automation[2];
    }

    if(p.dev.auto != undefined){
        document.getElementById("autogoldgain").checked = p.dev.auto[0];
        document.getElementById("autoIPgain").checked = p.dev.auto[1];
        document.getElementById("autoEPgain").checked = p.dev.auto[2];
        document.getElementById("autoDTgain").checked = p.dev.auto[3];
        document.getElementById("autorelicsgain").checked = p.dev.auto[4];
    }

    if(p.lasttick != undefined) {
        for(let n = 0; n < 100; n++) Tick( (Date.now() - p.lasttick) / 1e5);
        notify("used " + ((Date.now() - p.lasttick) / 1e3) + " seconds of offline time", 6);
    }
    player.lasttick = 0;
    
}

function upgradebits(up, key){
    let bits = 0;
    up.forEach(x => {
        if(x.brought && x.ugkey == key) bits |= (1 << x.bitid);
    } )
    player.upgrades[key] = bits;
}

function leavechallenge() {
    if(player.challenge.challengein == -1) return;
    if(player.challenge.challengein == 666){
        eternity()
        notify("left dilation", 3, "#00ff00");
        player.challenge.challengein = -1;        
    }
    else if(challenges[player.challenge.challengein].challengetype == "infinity") notify("left " + challenges[player.challenge.challengein].name, 3, "#FFaa00");
    else notify("left " + challenges[player.challenge.challengein].name, 3, "#aa00aa");
    infinity();
    player.challenge.challengein = -1;
}

function event(){
    document.addEventListener("keydown", event => keyevents(event));
    // a bad thing
    //document.addEventListener('contextmenu', event => event.preventDefault());
}

function keyevents(event){
    if((event.ctrlKey || event.metaKey) && event.key == "s"){
        event.preventDefault();
        save();
    }
    if(event.shiftKey && event.ctrlKey && event.key == "I"){
        event.preventDefault();
        notify("Hey what are you doing trying to get into console?",5);
    }
    if(event.key == "m"){
        ups.forEach(x => {
            if(x.currencykey == "time" && x.type != "reset") x.buy();
        });
    }
    if(event.key == "g"){
        ups[8].buy();
    }
    if(event.key == "i"){
        ups[19].buy();
    }
    if(event.key == "e"){
        ups[29].buy();
    }

    if(event.key == "d" && (progress() > 4 && player.money.eternitypoints.gte(new BN(1,308)))){
        startdilation();
    }

    if(event.key == "a"){
        if(player.reset.armageddons > 0) ups[49].buy();
    }

    if(event.key == "ArrowUp"){
        event.preventDefault();
        changetab(player.tablefton - 1, true);
    }

    if(event.key == "ArrowDown"){
        event.preventDefault();
        changetab(player.tablefton + 1,false);
    }
    if(event.key == "c" && player.challenge.challengein != -1){
        if(player.challenge.challengein == 666){
            eternity()
            notify("left dilation", 3, "#00ff00");
            player.challenge.challengein = -1;
            
        }
        else if(challenges[player.challenge.challengein].challengetype == "infinity") notify("left " + challenges[player.challenge.challengein].name, 3, "#FFaa00");
            else notify("left " + challenges[player.challenge.challengein].name, 3, "#aa00aa");
        infinity();
        player.challenge.challengein = -1;
    }

    if(event.key == "v"){
        if(document.getElementById("main").classList.contains("invert")) {
            document.getElementById("main").classList.remove("invert");
            document.getElementById("tabholder").classList.remove("invert");
            document.body.style.backgroundColor = "black";
        }
        else {
            document.getElementById("main").classList.add("invert");
            document.getElementById("tabholder").classList.add("invert");
            document.body.style.backgroundColor = "white";
        }
    }
}
