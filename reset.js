
function goldify(){
    sliders.forEach(x => {
        x.updateslider();
        x.updatevalue();
});
    if(player.challenge.doomed)glitchstrikes[1].trigger();
    player.money.gold.add(ups[8].effectordefault(1));
    player.reset.goldify++;
    player.money.time = new BN;
    player.upgrades.timebits = 0;
    ups.forEach(x => {
        if(x.ugkey == "timebits" && !ups[50].brought) x.brought = false;
    });
    if(document.getElementById("goldifiy").checked && main.getAnimations() == 0) main.animate(golden,s);
}

function goldgain(mult = new BN(1,0)){
    
    mult.mult(ups[10].effectordefault(1));
    mult.mult(ups[11].effectordefault(1));
    mult.mult(ups[14].effectordefault(1));
    mult.mult(ups[20].effectordefault(1, "gold"));
    mult.mult(ups[28].effectordefault(1));
    mult.mult(ups[52].effectordefault(1));


    mult.pow(ups[15].effectordefault(1));
    mult.pow(ups[22].effectordefault(1));
    mult.pow(ups[30].effectordefault(1, "gold"));
    mult.pow(ups[32].effectordefault(1));
    mult.pow(ups[34].effectordefault(1, "gold"));
    mult.pow(ups[44].effectordefault(1));
    mult.pow(ups[54].effectordefault(1));


    mult.mult(pick[1].effectordefault(1));

    mult.mult(sliders[2].effectordefault(1));
    mult.pow(sliders[0].effectordefault(1));
    mult = softcap(mult);
    mult = challengemult(mult, "gold").pow(challengeeffect("gold"));

    if(Creality[0].active) mult.pow(Creality[0].nerfs.gold);
    if(Creality[1].active) mult.pow(Creality[1].nerfs.gold);
    if(Creality[2].active) mult.pow(Creality[2].nerfs.gold);
    if(Creality[3].active) mult.pow(Creality[3].nerfs.gold);
    if(Creality[4].active) mult.pow(Creality[4].nerfs.gold());
    if(Creality[10].active) mult.pow(Creality[10].nerfs.gold);

    return mult;
}

function infinity(){
    if(player.challenge.doomed)glitchstrikes[2].trigger();
    if(player.challenge.doomed && player.challenge.challengein == 0)glitchstrikes[3].trigger();
    player.money.infinitypoints.add(ups[19].effectordefault(1));
    player.reset.infinites++;
    if(player.challenge.challengein < 7)player.challenge.challengein = -1;
    player.reset.goldify = 0;
    player.money.time = new BN;
    player.money.gold = new BN;
    player.upgrades.timebits = 0;
    player.upgrades.goldbits = 0;
    ups.forEach(x => {
        if(x.ugkey == "timebits" && !ups[50].brought) x.brought = false;
        if(x.ugkey == "goldbits" && !ups[52].brought) {
            if(x.type == "unlock" && ups[25].brought) true;
            else x.brought = false;
        };
    });
    if(!ups[25].brought) sliders.forEach(x => {
        x.currentvalue = 1;
        document.getElementById(x.eleid).value = 1;
    });
    if(document.getElementById("crunch").checked && main.getAnimations() == 0) main.animate(crunch,s);
}

function IPgain(mult = new BN(1,0)){
    
    mult.mult(ups[27].effectordefault(1));
    mult.mult(ups[56].effectordefault(1));


    mult.pow(ups[30].effectordefault(1, "IP"));
    mult.pow(ups[33].effectordefault(1));
    mult.pow(ups[34].effectordefault(1, "IP"));
    mult.pow(ups[38].effectordefault(1));
    mult.pow(ups[45].effectordefault(1));
    mult.pow(ups[55].effectordefault(1));


    mult.mult(pick[2].effectordefault(1));
    mult = softcap(mult);

    mult = challengemult(mult, "IP").pow(challengeeffect("IP"));

    if(Creality[0].active) mult.pow(Creality[0].nerfs.IP);
    if(Creality[1].active) mult.pow(Creality[1].nerfs.IP);
    if(Creality[3].active) mult.pow(Creality[3].nerfs.IP);
    if(Creality[4].active) mult.pow(Creality[4].nerfs.IP());
    if(Creality[10].active) mult.pow(Creality[10].nerfs.IP);

    return mult;
}

function eternity(){
    if(player.challenge.doomed)glitchstrikes[4].trigger();
    player.money.eternitypoints.add(ups[29].effectordefault(1));
    if(player.challenge.challengein == 666 && player.money.infinitypoints.gt(new BN(1,1000))) player.money.dilatedtime.add(DTgain());

    player.reset.eternites++;
    if(player.challenge.challengein != 1000) player.challenge.challengein = -1;
    player.reset.goldify = 0;
    player.reset.infinites = 0;
    player.money.time = new BN;
    player.money.gold = new BN;
    player.money.infinitypoints = new BN;
    player.upgrades.timebits = 0;
    player.upgrades.goldbits = 0;
    player.upgrades.infinitybits = 0;
    ups.forEach(x => {
        if(x.ugkey == "timebits" && !ups[50].brought) x.brought = false;
        if(x.ugkey == "goldbits" && !ups[52].brought) {
            if(x.type == "unlock" && ups[40].brought) true;
            else x.brought = false;
        };
        if(x.ugkey == "infinitybits" && !ups[56].brought) x.brought = false;
    });

    ups[23].brought = true;
    ups[24].brought = true;
    if(ups[40].brought) ups[25].brought = true;

    if(!ups[40].brought) sliders.forEach(x => {
        x.currentvalue = 1;
        document.getElementById(x.eleid).value = 1;
    });

    if(!ups[35].brought && !pick[7].brought) {
        challenges.forEach(x => {
            if(x.id > 6) return;
            x.ele.classList.add("void");
            x.competed = false;
        })
        player.challenge.ICcompeted = 0;
        player.challenge.hasunlockedchallenges = false;
    }
    if(document.getElementById("eternity").checked && main.getAnimations() == 0) main.animate(etern,s);
}

function EPgain(mult = new BN(1,0)){
    
    mult.mult(ups[37].effectordefault(1));
    mult.mult(ups[57].effectordefault(1));

    mult.mult(pick[3].effectordefault(1));

    mult.pow(sliders[3].effectordefault(1));
    mult = softcap(mult);
    mult = challengemult(mult, "EP").pow(challengeeffect("EP"));
    
    if(Creality[0].active) mult.pow(Creality[0].nerfs.EP);
    if(Creality[1].active) mult.pow(Creality[1].nerfs.EP);
    if(Creality[2].active) mult.pow(Creality[2].nerfs.EP);
    if(Creality[3].active) mult.pow(Creality[3].nerfs.EP);
    if(Creality[4].active) mult.pow(Creality[4].nerfs.EP());
    if(Creality[10].active) mult.pow(Creality[10].nerfs.EP);

    return mult;
}

function DTgain(){
    if(Creality[2].active) return new BN(0);

    let amount = BN.add(player.money.time, 3.333).log(3.333).pow(1.5);

    amount.mult(ups[47].effectordefault(1));
    amount.mult(ups[58].effectordefault(1));


    amount.pow(ups[48].effectordefault(1));

    amount.mult(pick[9].effectordefault(1));

    amount.pow(pick[14].effectordefault(1));

    amount = softcap(amount);
    amount = challengemult(amount, "DT").pow(challengeeffect("DT"));

    if(Creality[3].active) amount.pow(Creality[3].nerfs.DT());
    if(Creality[4].active) amount.pow(Creality[4].nerfs.DT());
    if(Creality[10].active) amount.pow(Creality[10].nerfs.DT);

    return BN.max(amount,1);
}

var main = document.getElementById("main");

const etern = [
    {
        opacity: 1
    },
    {
        opacity: 0
    },
    {
        opacity: 1
    }
]

const crunch = [
    {
        transform: "scale3d(1,1,1)"
    },
    {
        transform: "scale3d(0,0,1)"
    },
    {
        transform: "scale3d(1,1,1)"
    }
]

const golden = [
    {
        transform: "rotateY(0deg)",
    },
    {
        transform: "rotateY(90deg)",
    },
    {
        transform: "rotateY(0deg)",
    }
]

const s = {
    duration: 1500,
    iterations: 1,
}

const dilate = [
    {
        transform: "scale3d(1,1,1)",
        opacity: 1,
        offset: 0
    },
    {
        transform: "scale3d(5,1,1)",
        opacity: 0,
        offset: 0.5
    },
    {
        transform: "scale3d(0.2,1,1)",
        opacity: 0,
        offset: 0.5
    },
    {
        transform: "scale3d(1,1,1)",
        opacity: 1,
        offset: 1
    }
]
const ss = {
    duration: 1000,
    iterations: 1,
}

const arm = [
    {
        transform: "rotateY(0deg) scale3d(1,1,1)",
        opacity: 1
    },
    {
        transform: "rotateY(180deg) scale3d(0,5,1)",
        opacity: 0
    },
    {
        transform: "rotateY(360deg) scale3d(1,1,1)",
        opacity: 1
    }
]

function startdilation(){
    if(!player.money.eternitypoints.gt(1.79e308)) return notify("dilation is locked",3,"#00ff00")
    if(player.challenge.doomed)glitchstrikes[5].trigger();
    if(document.getElementById("dilation").checked && main.getAnimations() == 0) main.animate(dilate,ss);
    eternity();
    player.challenge.challengein = 666;
}

function armageddon(){
    glitchstrikes[0].trigger();
    if(game.progress > 6) glitchstrikes[9].trigger();
    player.money.relics.add(relicsgained());

    player.challenge.doomed = true;
    player.reset.armageddons++;
    player.challenge.challengein = -1;

    player.reset.goldify = 0;
    player.reset.infinites = 0;
    player.reset.eternites = 0;
    player.money.time = new BN;
    player.money.gold = new BN;
    player.money.infinitypoints = new BN;
    player.money.eternitypoints = new BN;
    if(!ups[57].brought) player.money.dilatedtime = new BN;
    player.upgrades.timebits = 0;
    player.upgrades.goldbits = 0;
    player.upgrades.infinitybits = 0;
    player.upgrades.eternitybits = 0;

    ups.forEach(x => {
        if(x.ugkey == "timebits" && !ups[50].brought) {x.brought = false;};
        if(x.ugkey == "goldbits" && !ups[52].brought) {x.brought = false;};
        if(x.ugkey == "infinitybits" && !ups[56].brought) {x.brought = false;};
        if(x.ugkey == "eternitybits" && x.bitid < 20 && !ups[57].brought) {x.brought = false;};
    });

    sliders.forEach(x => {
        x.currentvalue = 1;
        document.getElementById(x.eleid).value = 1;
    });

    if (!ups[35].brought && !pick[7].brought) challenges.forEach(x => {
        if(x.id > 12) return;
        x.ele.classList.add("void");
        x.competed = false;
        player.challenge.ICcompeted = 0;
        player.challenge.ECcompeted = 0;
        player.challenge.ICunlocks = 0;
        player.challenge.ECunlocks = 0;
        player.challenge.hasunlockedchallenges = false;
    });

    if(document.getElementById("armageddon").checked && main.getAnimations() == 0) main.animate(arm,s);
}

function relicsgained(){
    if((player.reset.armageddons == 0 && !pick[10].brought) || Creality[1].active || Creality[3].active) return new BN(0); 
    let gain = BN.log(player.money.time, 10);
    gain.mult(BN.log( BN.add(player.money.gold, 2), 10).mult(1.5));
    gain.mult(BN.log( BN.add(player.money.infinitypoints, 2), 10).mult(2.5));
    gain.mult(BN.log( BN.add(player.money.eternitypoints, 2), 10).mult(5));
    gain.mult(pick[4].effectordefault(1));
    if(!player.challenge.doomed && pick[10].brought) gain.pow(0.6);

    if(Creality[0].active) gain.pow(Creality[0].nerfs.relics);
    if(Creality[2].active) gain.pow(Creality[2].nerfs.relics);
    if(Creality[4].active) gain.pow(Creality[4].nerfs.relics());
    if(Creality[10].active) gain.pow(Creality[10].nerfs.relics);

    return gain;
}

function ending(){
    if(player.end) return "ended";
    player.end = true;
    document.body.animate(endani,endss);
}

const endani = [
    {
        opacity: 1,
        offset: 0,
    },
    {
        opacity: 0,
        offset: 0.99,
    },
    {
        opacity: 1,
        offset: 1,
    }
]
const endss = {
    duration: 15000,
}


function absolutism(respec= false){

    if(!respec) reality.complete();
    player.challenge.currentreality = -1;
    game.alphabits = 0;

    if(!respec) {
        player.money.absolutismfragments.add(ups[60].effectordefault(1));
        player.reset.absolutism += absresetgain();
    }   
    if(respec) pick.forEach(x => x.reset());
    
    player.challenge.doomed = false;
    if(!ups[61].brought)player.softcapeffectdiv = 1;
    player.challenge.challengein = -1;

    player.reset.goldify = 0;
    player.reset.infinites = 0;
    player.reset.eternites = 0;
    player.reset.armageddons = 0;

    player.money.time = new BN;
    player.money.gold = new BN;
    player.money.infinitypoints = new BN;
    player.money.eternitypoints = new BN;
    player.money.dilatedtime = new BN;
    player.money.relics = new BN;

    player.upgrades.timebits = 0;
    player.upgrades.goldbits = 0;
    player.upgrades.infinitybits = 0;
    player.upgrades.eternitybits = 0;


    ups.forEach(x => {
        if(x.ugkey == "timebits") {x.brought = false;};
        if(x.ugkey == "goldbits") {x.brought = false;};
        if(x.ugkey == "infinitybits") {x.brought = false;};
        if(x.ugkey == "eternitybits") {x.brought = false;};
    });

    sliders.forEach(x => {
        x.currentvalue = 1;
        document.getElementById(x.eleid).value = 1;
    });

    if (!pick[7].brought) challenges.forEach(x => {
        if(x.id > 12) return;
        x.ele.classList.add("void");
        x.competed = false;
        player.challenge.ICcompeted = 0;
        player.challenge.ECcompeted = 0;
        player.challenge.ICunlocks = 0;
        player.challenge.ECunlocks = 0;
        player.challenge.hasunlockedchallenges = false;
    });

    if(document.getElementById("Babsolutism").checked && main.getAnimations() == 0) main.animate(document.getElementById("main").classList.contains("invert") ? absv: abs,s);
    picker.updateall();
    reality.updateall();
}

function ASgain() {
    let gain = new BN(1).add(Math.min(player.reset.absolutism, 9));


    return gain;
}

function absresetgain(){
    return 40 ** reality.completedHardAmount;
}

const abs = [
    {
        filter: "invert(0%)"
    },
    {
        filter: "invert(100%)"
    },
    {
        filter: "invert(0%)"
    }
]

const absv = [
    {
        filter: "invert(100%)"
    },
    {
        filter: "invert(0%)"
    },
    {
        filter: "invert(100%)"
    }
]