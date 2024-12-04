
var deltatime = 0;
var last = Date.now();

var player = {
    money: {
        gold: new BN,
        time: new BN,
        dilatedtime: new BN,
        infinitypoints: new BN,
        eternitypoints: new BN,
        relics: new BN,
        absolutismfragments: new BN,
    },
    upgrades:{
        timebits: 0,
        goldbits: 0,
        infinitybits: 0,
        eternitybits: 0,
        absolutismbits: 0,
        absobits: 0,
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
        absolutism: 0,
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
        RealitysComplete: 0,
        currentreality: -1,
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
    gameend: false,
    lasttick: 0,
}

var game = {
    get progress(){
        if(player.reset.absolutism > 0) return 7;
        if(player.reset.armageddons > 0) return 6;
        if(player.money.eternitypoints.gt(1.79e308)) return 5;
        if(player.reset.eternites > 0) return 4;
        if(ups[24].brought) return 3; // does not exsist on loading
        if(player.reset.infinites > 0) return 2;
        if(player.reset.goldify > 0) return 1;
        return 0;
    },
    frametick: 0,
    alphabits: 0,
    get isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
}

function start() {
    console.warn("%cwhy? how did you get here?", "color: red");
    autosetup();
    upgrades.forEach(x => ups[x.inid] = new upgrade(x));
    tabs.forEach(x => makenewtab(x));
    goldslider.forEach(x => {sliders[x.inid] = new goldenslider(x);makenewgslider(x)});
    challengedata.forEach(x => challenges[x.id] = new challenge(x));
    realitys.forEach(x => Creality[x.id] = new reality(x));
    strikes.forEach(x => glitchstrikes[x.id] = new strike(x) );
    absopick.forEach(x => pick[x.id] = new picker(x));
    if(typeof localStorage.player != "undefined") load();
    ups.forEach(x => {
        x.element = makenewupgrade(x);
        x.ugtext();
    });
    changetab(player.tablefton);

    setInterval(Tick, 33);
    setInterval(updateUI, 50);
    setInterval(save, 60000);

    updateUI();
    Tick();
    
    document.getElementById("main").style.display = "block";
    document.getElementById("main").style.position = "absolute";
    document.getElementById("main").style.top = "0px";
    document.getElementById("main").style.right = "0px";
    document.getElementById("main").style.width = "calc(100vw - 137px)";
    
    document.getElementById("tabholder").style.display = "block";

    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(mobile){
        document.getElementById("tabholder").style.width = "490px";
        document.getElementById("tabholder").style.height = "105px";
        document.getElementById("tabholder").style.backgroundColor = "black";
        document.getElementById("tabholder").style.position = "fixed";
        document.getElementById("notify").style.top = "75px";
        document.getElementById("time").style.textAlign = "left";
        document.getElementById("time").style.top = "105px";
        document.getElementById("time").style.backgroundColor = "black";
        document.getElementById("challenge").style.width = "380px";
        document.getElementById("main").style.width = "500px";
        document.getElementById("main").style.position = "absolute";
        document.getElementById("main").style.left = "0px";
        document.getElementById("main").style.top = "105px";
        
        [].slice.call(document.getElementById("challenge").children).forEach(x => x.style.width = "280px");
        
        document.body.style.width = "100%"
        document.body.style.fontSize = "14px"
        document.body.style.marginLeft = "0px"
        document.body.style.marginTop = "125px"
    }
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
    auto.forEach(x => x.tick());
    if(ups[61].brought) player.softcapeffectdiv /= Math.max(100 * deltatime, 2);
    else if(ups[59].brought && player.challenge.doomed) player.softcapeffectdiv *= (deltatime * (8 * (player.reset.absolutism + 1))) + 1;
    else if(Creality[1].complete && (ups[59].brought && !player.challenge.doomed)) player.softcapeffectdiv = Math.min(player.softcapeffectdiv * (deltatime * (8 * (player.reset.absolutism + 1) / (player.softcapeffectdiv ** 0.02)) + 1), 1e150);
    if(pick[8].brought || ups[36].brought || document.getElementById("autogoldgain").checked) player.money.gold.add(ups[8].effectordefault(0).mult(deltatime));
    if(pick[8].brought || document.getElementById("autoIPgain").checked) player.money.infinitypoints.add(ups[19].effectordefault(0).mult(deltatime));
    if(pick[8].brought || document.getElementById("autoEPgain").checked) player.money.eternitypoints.add(ups[29].effectordefault(0).mult(deltatime));
    if((document.getElementById("autoDTgain").checked || pick[9].brought) && (player.challenge.challengein == 666 || Creality[2].complete)) player.money.dilatedtime.add(DTgain().mult(deltatime));
    if(pick[10].brought || (document.getElementById("autorelicsgain").checked && player.challenge.doomed)) player.money.relics.add(ups[49].effectordefault(0).mult(deltatime));

    if(player.softcapeffectdiv == 0 || Creality[10].complete) player.gameend = true;
}

function updateUI(){
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(game.alphabits == 15) glitchstrikes[24].trigger();

    if(game.frametick % 2 == 0) {
        ups.forEach(x => x.tick());

        let text = ""
        text= `you have <span style="color: cyan">${player.money.time.toString()}</span> time : and are geting ${timemults().toString()} /s <br>`;
        text += game.progress > 0 ? `you have <span style="color: gold">${player.money.gold.toString()}</span> gold, effect: ${goldeffect().toString()} <br>` : "<br>";
        text += game.progress > 1 ? `you have <span style="color: orange">${player.money.infinitypoints.toString()}</span> IP <br>` : "<br>";
        text += game.progress > 3 ? `you have <span style="color: #cc00ff">${player.money.eternitypoints.toString()}</span> EP <br>` : "<br>";
        text += game.progress > 4 ? `you have <span style="color: lime">${player.money.dilatedtime.toString()}</span> DT <br>` : "<br>";
        text += game.progress > 5 ? `you have <span style="color: red">${player.money.relics.toString()}</span> relics <br>` : "<br>";
        text += game.progress > 6 ? `you have <span style="color: royalblue">${player.money.absolutismfragments.toString()}</span> absolutism fragments<br>` : "<br>";
        if(player.challenge.challengein != -1){
            if(player.challenge.challengein == 666){
                text += "you are currently in dilation, reach 1e1000 IP to gain dilated time<br>";
            }
            else{
                text += "you are currently in challenge " + challenges[player.challenge.challengein].name + " and needing to ";
                text += typeof challenges[player.challenge.challengein].goaldiscription == "function" ? challenges[player.challenge.challengein].goaldiscription()
                    : challenges[player.challenge.challengein].goaldiscription;
                text += " to finish the challenge<br>";
            }
        }
        if(player.challenge.currentreality != -1){
            text += "you are currently in " + Creality[player.challenge.currentreality].name + " and needing to absolutism to finish this reality";
            text += `<br> the nerfs are ${Creality[player.challenge.currentreality].nerflist}`;
        }
        else text += "<br>";
        if(player.challenge.doomed) text+= "<br>you are currently doomed"
        if(ups[59].brought || ups[61].brought) text +=  `<br>soft cap is being ${ups[61].brought ? "Increased" : "Lowered"} : ${new BN(player.softcapeffectdiv)}`;
        document.getElementById("time").innerHTML = text;
    }

    if (game.frametick % 5 == 0){
        const ab = document.getElementById("absolutism-tab").firstElementChild;
        ab.innerHTML = `all these upgrades apply after normal upgrades<br> you can only have ${picker.totalusedslots} more ${picker.totalusedslots == 1 ? "upgrade" : "upgrades"}, the limit is ${picker.maxupgrades}
        <br>you have ${player.reset.absolutism} absolutes
        ${(Creality[9].active && (game.alphabits & 1) == 0) ? "<br> <button class='huh' id='huh' onClick='game.alphabits += (game.alphabits & 1)  == 0 ? 1 : 1'>???</button>": ""}`;
    }
    if(player.tablefton == 3 && game.frametick % 3) {
        if(player.challenge.challengein != 666){
            document.getElementById("startdilation").children[0].innerHTML =  player.money.eternitypoints.gt(1.79e308) ? "start dilation" : "dilation locked until 1.8e308 EP"; 
        }else{

            if(player.money.infinitypoints.gt(new BN(1,1000))) document.getElementById("startdilation").children[0].innerHTML= "finish dilation and eternity for " + DTgain().toString() + " DT" +
            `${(Creality[9].active && ( game.alphabits & 2)  == 0) ? "<br> <button class='huh' id='huh' onclick='game.alphabits += (game.alphabits & 2)  == 0 ? 2 : 0'>???</button>": ""}`; 
            else document.getElementById("startdilation").children[0].innerHTML = "to finish dilation, reach 1e1000 IP and eternity to gain DT";
        }
    }

    if(game.frametick % 5 == 0 && player.tablefton == 7){

        if(!mobile){

            document.getElementById("settingstext").innerHTML = `hold "M" to buy time upgrades<br>
        ${ (game.progress > 0) ? 'hold "K" to buy gold upgrades<br>' :""}
        ${ (game.progress > 1) ? 'hold "L" to buy infinity upgrades<br>' :""}
        ${ (game.progress > 3) ? 'hold "O" to buy eternity upgrades<br>' :""}
        ${ (game.progress > 6) ? 'hold "P" to buy doomed upgrades<br>' :""}
        ${ (game.progress > 0) ? 'hold "G" to goldify<br>' :""}
        ${ (game.progress > 1) ? 'hold "I" to infinity<br>' :""}
        ${ (game.progress > 3) ? 'hold "E" to eternity<br>' :""}
        ${ (game.progress > 5) ? 'hold "A" to armageddon<br>' :""}
        ${ (game.progress > 6) ? 'hold "F" to absolutism<br>' :""}
        press "C" to leave challenges<br>
        you can save with ctrl + s<br>
        you can change tabs with arrow keys<br>
        pressing V inverts colors        
        ${(Creality[9].active && ( game.alphabits & 4)  == 0) ? "<br> <button class='huh' id='huh' onclick='game.alphabits += (game.alphabits & 4) == 0 ? 4 : 0'>???</button>": ""}`;
        } else {
        
        document.getElementById("settingstext").innerHTML = `${(Creality[9].active && ( game.alphabits & 4)  == 0) ? "<br> <button class='huh' id='huh' onclick='game.alphabits += (game.alphabits & 4 == 0) ? 4 : 0'>???</button>": ""}`;
        document.getElementById("max-save").classList.remove("hidden");
        
        document.getElementById("max-time").classList.remove("hidden");
        
        if(game.progress > 0 && mobile) document.getElementById("max-gold").classList.remove("hidden");
        
        if(game.progress > 1 && mobile) document.getElementById("max-IP").classList.remove("hidden");
        
        if(game.progress > 3 && mobile) document.getElementById("max-EP").classList.remove("hidden");
        
        
        if(game.progress > 0) document.getElementById("reset-gold").classList.remove("hidden");
        
        if(game.progress > 1) document.getElementById("reset-IP").classList.remove("hidden");
        
        if(game.progress > 3) document.getElementById("reset-EP").classList.remove("hidden");

        if(game.progress > 4) document.getElementById("reset-DIL").classList.remove("hidden");

        if(game.progress > 5) document.getElementById("reset-ARM").classList.remove("hidden");

        if(game.progress > 6) document.getElementById("reset-ABS").classList.remove("hidden");

        }
        
        if(game.progress > 0) document.getElementById("sgoldifiy").classList.remove("hidden");

        if(game.progress > 1) document.getElementById("scrunch").classList.remove("hidden");

        if(game.progress > 3) document.getElementById("seternity").classList.remove("hidden");

        if(game.progress > 4) document.getElementById("sdilation").classList.remove("hidden");
        
        if(game.progress > 5) document.getElementById("sarmageddon").classList.remove("hidden");

        if(game.progress > 6) document.getElementById("sabsolutism").classList.remove("hidden");
    }
    if(game.frametick % 10 == 0) {
        document.getElementById("slidermax").innerHTML = "the maxium value of goldern sliders is " + (pick[5].brought ? "unlimited" : goldenslider.maxtotal) + "<br> slider effects apply affter upgrades <br><br>"
        + `${(Creality[9].active && (game.alphabits & 8)  == 0) ? "<br> <button class='huh' id='huh' onclick='game.alphabits += (game.alphabits & 8)  == 0 ? 8 : 8'>???</button>": ""}`;
        document.getElementById("challengeunlock").innerHTML = nextchallenge();
    }
    sliders.forEach(x => {
        ups[40].brought ? x.updatevalue() : x.updateslider();
    });
    
    challenges.forEach(x => x.tick());
    if(challenges[0].show())player.challenge.hasunlockedchallenges = true;

    showtab();

    game.frametick++;
}

function time(sec){
    let m = timemults();
    m = m.mult(sec);
    player.money.time.add(m);
    if(player.money.time.gt(1.79e308) && !ups[24].brought) player.money.time = new BN(1.8,308);
}

function challengeeffect(type = "time"){
    const id = player.challenge.challengein;
    let effect = 1;
    if(id == 0){
        if(type == "time") effect *= 0.5;
    }
    else if(id == 1){
        if(type == "gold") effect *= 0.5;
    }
    else if(id == 2){
        if(type == "time") effect *= 0.5;
        if(type == "gold") effect *= 0.5;
    }
    else if(id == 3){
        if(type == "gold") effect = 0;
    }
    else if(id == 4){
        if(type == "time") effect *= 1.5;
        if(type == "gold") effect *= 0.25;
    }
    else if(id == 5){
        if(type == "time") effect *= 0.3;
        if(type == "gold") effect *= 1.25;
    }
    else if(id == 6){
        if(type == "time") effect *= 0.5;
        if(type == "gold") effect *= 5;
    }
    else if(id == 7){
        if(type == "time") effect *= 0.5;
        if(type == "gold") effect *= 0.5;
        if(type == "IP") effect *= 0.5;
    }
    else if(id == 8){
        if(type == "gold") effect = 0;
        if(type == "IP") effect = 0;
    }
    else if(id == 9){
        if(type == "gold") effect *= 0.05;
        if(type == "IP") effect *= 0.05;
    }
    else if(id == 10){
        if(type == "gold") effect *= 0.05;
    }
    else if(id == 11){
        if(type == "IP") effect *= 0.01;
    }

    else if(id == 666){
        if(ups[48].brought && !ups[59].brought && player.money.dilatedtime.gte(1e145)){
            if(type == "time") effect *= 1e-25;
            if(type == "gold") effect *= 8e-4;
            if(type == "IP") effect *= 1.5e-3;
        }
        else if(ups[42].brought){
            if(type == "time") effect *= 0.6;
            if(type == "gold") effect *= 0.15;
            if(type == "IP") effect *= 0.2;
        }
        else{
        if(type == "time") effect *= 0.4;
        if(type == "gold") effect *= 0.05;
        if(type == "IP") effect *= 0.125;
        }
        effect = effect ** 0.39;
    }

    if(player.challenge.doomed && !ups[59].brought){
        if(type == "time") effect *= 0.75;
        if(type == "gold") effect *= 0.75;
        if(type == "IP") effect *= 0.75;
    }

    return effect;
}

function timemults(){
    let mult = new BN(1,0);
    if(Creality[5].active && Creality[5].nerfs.time().lt(0.01)) return new BN(0);

    mult.add(ups[13].effectordefault(0));
    mult.mult(ups[0].effectordefault(1));
    mult.mult(ups[1].effectordefault(1));
    mult.mult(ups[2].effectordefault(1));
    mult.mult(ups[3].effectordefault(1));
    mult.mult(ups[4].effectordefault(1));
    mult.mult(ups[5].effectordefault(1));
    mult.mult(ups[6].effectordefault(1));
    mult.mult(ups[7].effectordefault(1));

    mult.mult(ups[20].effectordefault(1, "time"));

    mult.mult(ups[39].effectordefault(1));
    mult.mult(ups[50].effectordefault(1));
    mult.mult(ups[51].effectordefault(1));
    mult.mult(ups[53].effectordefault(1));


    mult.pow(ups[9].effectordefault(1));
    mult.pow(ups[12].effectordefault(1));
    mult.pow(ups[17].effectordefault(1));
    mult.pow(ups[21].effectordefault(1));
    mult.pow(ups[26].effectordefault(1));
    mult.pow(ups[30].effectordefault(1, "time"));
    mult.pow(ups[31].effectordefault(1));
    mult.pow(ups[34].effectordefault(1, "time"));
    mult.pow(ups[43].effectordefault(1));
    mult.pow(ups[46].effectordefault(1));


    mult.mult(pick[0].effectordefault(1));
    mult.pow(pick[15].effectordefault(1));


    mult.mult(goldeffect());
    mult.mult(sliders[1].effectordefault(1));
    mult = softcap(mult);
    mult.pow(challengeeffect("time"));
    mult = challengemult(mult, "time").mult(ResetBonus());

    if(Creality[3].complete) mult.pow(Creality[3].effect());

    if(Creality[0].active) mult.pow(Creality[0].nerfs.time);
    if(Creality[1].active) mult.pow(Creality[1].nerfs.time);
    if(Creality[2].active) mult.pow(Creality[2].nerfs.time);
    if(Creality[3].active) mult.pow(Creality[3].nerfs.time);
    if(Creality[4].active) mult.pow(Creality[4].nerfs.time());
    if(Creality[5].active) mult.pow(Creality[5].nerfs.time());
    if(Creality[10].active) mult.pow(Creality[10].nerfs.time);

    return BN.isNaN(mult) ? new BN("1e1.79e308") : mult;
}

function ResetBonus(){
    const cap = 5;
    let ex = BN.max(BN.min(player.reset.goldify + 1, cap),1);
    ex = ex.mult(BN.max(BN.min(player.reset.infinites + 1, cap),1));
    ex = ex.mult(BN.max(BN.min(player.reset.eternites + 1, cap),1));
    ex = ex.mult(BN.max(BN.min(player.reset.armageddons + 1, cap),1));
    return ex.mult(BN.max(BN.min(player.reset.absolutism + 1, cap),1));
}

function goldeffect(){
    return BN.pow(player.money.gold,1.2).add(1);
}

function challengemult(effect, type = "time"){
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
    player.setings.animations[5] = document.getElementById("Babsolutism").checked;

    player.dev.auto[0] = document.getElementById("autogoldgain").checked;
    player.dev.auto[1] = document.getElementById("autoIPgain").checked;
    player.dev.auto[2] = document.getElementById("autoEPgain").checked;
    player.dev.auto[3] = document.getElementById("autoDTgain").checked;
    player.dev.auto[4] = document.getElementById("autorelicsgain").checked;

    player.automation[0] = document.getElementById("autotime").checked;
    player.automation[1] = document.getElementById("autogold").checked;
    player.automation[2] = document.getElementById("autoinfinity").checked;
    player.automation[3] = document.getElementById("autoeternity").checked;

    upgradebits(ups, "timebits");
    upgradebits(ups, "goldbits");
    upgradebits(ups, "infinitybits");
    upgradebits(ups, "eternitybits");
    upgradebits(ups, "absobits");

    challenges.forEach(x => {
        if(!x.ele.classList.contains("void") && x.challengetype == "infinity") player.challenge.ICunlocks |= ( 1 << x.id);
        if(x.challengetype == "infinity" && x.competed) player.challenge.ICcompeted |= ( 1 << x.id);
        if(!x.ele.classList.contains("void") && x.challengetype == "eternity") player.challenge.ECunlocks |= ( 1 << x.id);
        if(x.challengetype == "eternity" && x.competed) player.challenge.ECcompeted |= ( 1 << x.id);
    });
    
    player.lasttick = last;
    glitchstrikes.forEach(x => {
        if(x.triggered)player.strikebits |= 1 << x.id;
    });

    localStorage.setItem("player", JSON.stringify(player) );
    notify("game saved", 2);
}

function load(save = undefined){
    //console.log(JSON.parse(localStorage.getItem("player")))
    let p = save != undefined ? save : JSON.parse(localStorage.getItem("player"));
    if(p.softcapeffectdiv != null)player.softcapeffectdiv = (Math.min(p.softcapeffectdiv, 1e308));
    else player.softcapeffectdiv = 1e308;

    
    player.end = p.end;
    if(player.gameend && p.gameend) player.gameend = p.gameend;
    player.tablefton = p.tablefton;
    player.hasunlockedchalenges = p.hasunlockedchalenges;
    player.challenge.challengein = p.challenge.challengein;
    if(typeof p.challenge.RealitysComplete != 'undefined') player.challenge.RealitysComplete = p.challenge.RealitysComplete;
    if(typeof p.challenge.currentreality != 'undefined') player.challenge.currentreality = p.challenge.currentreality;
    player.challenge.ICunlocks = p.challenge.ICunlocks;
    player.challenge.ICcompeted = p.ICcompeted;
    player.challenge.hasunlockedchallenges = p.challenge.hasunlockedchallenges;

    player.challenge.doomed = p.challenge.doomed;
    
    glitchstrikes.forEach(x => {
        if( ((1 << x.id) & p.strikebits) > 0) x.triggered = true;
    });
    
    challenges.forEach(x => {
        if((p.challenge.ICunlocks & (1 << x.id)) > 0) x.ele.classList.remove("void");
        if((p.challenge.ICcompeted  & (1 << x.id)) > 0) x.competed = true;
        if((p.challenge.ECunlocks & (1 << x.id)) > 0) x.ele.classList.remove("void");
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
    ups.forEach(x => {
        if(player.upgrades.absobits & (1 << x.bitid) && x.ugkey == "absobits") x.brought = true;
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
        document.getElementById("Babsolutism").checked = p.setings.animations[5];
    }
    if(p.automation != undefined){
        document.getElementById("autotime").checked = p.automation[0];
        document.getElementById("autogold").checked = p.automation[1];
        document.getElementById("autoinfinity").checked = p.automation[2];
        document.getElementById("autoeternity").checked = p.automation[3];
        document.getElementById("autorelic").checked = p.automation[3];
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

// a bad thing
document.addEventListener('contextmenu', event => event.preventDefault());

kd.run( () => {kd.tick(); });

kd.S.press( evt => {
    if(!evt.altKey && !evt.shiftKey && evt.ctrlKey) {
        evt.preventDefault();
        save();
    }
});
  
kd.M.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        ups.forEach(x => {
        if(x.currencykey == "time" && x.type != "reset") x.buy();
    });}
});

kd.K.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        ups.forEach(x => {
        if(x.currencykey == "gold" && x.type != "reset") x.buy();
        });}
});

kd.L.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        ups.forEach(x => {
        if(x.currencykey == "infinitypoints" && x.type != "reset") x.buy();
        });}
});

kd.O.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        ups.forEach(x => {
        if(x.currencykey == "eternitypoints" && x.type != "reset") x.buy();
        if(game.progress > 5 && x.currencykey == "dilatedtime" && x.type != "reset") x.buy();
        });}
});

kd.P.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        ups.forEach(x => {
        if(game.progress > 6 && x.currencykey == "relics" && x.type != "reset") x.buy();
        });}
});
kd.G.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) ups[8].buy();
});

kd.I.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) ups[19].buy();
});

kd.I.press(
    evt => {
        if(!evt.altKey && evt.shiftKey && evt.ctrlKey){
            evt.preventDefault();
            notify("Hey what are you doing trying to get into console?",5);
        }
});

kd.F12.press(
    evt => {
        if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey){
            evt.preventDefault();
            notify("Hey what are you doing trying to get into console?",5);
        }
});

kd.E.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) ups[29].buy();
});

kd.D.press( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        if(game.progress > 4 && player.money.eternitypoints.gte(new BN(1.79,308))) startdilation();
    }
});

kd.A.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        if(player.reset.armageddons > 0 || game.progress > 6) ups[49].buy();
    }
});

kd.F.down( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        if(game.progress > 6) ups[60].buy();
    }
});

kd.UP.press( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        changetab(player.tablefton - 1, true);
        event.preventDefault();
    }
});

kd.DOWN.press( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        changetab(player.tablefton + 1,false);
        event.preventDefault();
    }
});

kd.C.press( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
        if(player.challenge.challengein == -1) return;
        if(player.challenge.challengein == 666){
            eternity()
            notify("left dilation", 3, "#00ff00");
            player.challenge.challengein = -1;
            return;
        }
        else if(challenges[player.challenge.challengein].challengetype == "infinity") notify("left " + challenges[player.challenge.challengein].name, 3, "#FFaa00");
        else notify("left " + challenges[player.challenge.challengein].name, 3, "#aa00aa");
        challenges[player.challenge.challengein].finish();
        player.challenge.challengein = -1;
    }
});

kd.V.press( evt => {
    if(!evt.altKey && !evt.shiftKey && !evt.ctrlKey) {
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
});

function exportsave(){
    navigator.clipboard.writeText(btoa(JSON.stringify(player)));
    notify("your save has been exported, check your clipboard", 2, "green");
}

function importsave(){
    load(JSON.parse(atob(prompt("put your save here"))));
    notify("your save has been imported", 2, "green");
}