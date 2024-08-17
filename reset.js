
function goldify(){
    sliders.forEach(x => x.updateslider());
    sliders.forEach(x => x.updatevalue());
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
    upgrades.forEach(x => {
        if(x.type == "add" && x.for.includes("gold")) mult = mult.add(ups[x.inid].effectordefault(1,"gold"));
    })
    upgrades.forEach(x => {
        if(x.type == "mult" && x.for.includes("gold")) mult = mult.mult(ups[x.inid].effectordefault(1,"gold"));
    })
    upgrades.forEach(x => {
        if(x.type == "pow" && x.for.includes("gold")) mult = mult.pow(ups[x.inid].effectordefault(1, "gold"));
    })

    mult = goldenslidereffects(mult, "gold");
    mult = challengemult(mult, "gold").pow(challengeeffect("gold"));

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
    
    upgrades.forEach(x => {
        if(x.type == "add" && x.for.includes("IP")) mult = mult.add(ups[x.inid].effectordefault(1,"IP"));
    })
    upgrades.forEach(x => {
        if(x.type == "mult" && x.for.includes("IP")) mult = mult.mult(ups[x.inid].effectordefault(1,"IP"));
    })
    upgrades.forEach(x => {
        if(x.type == "pow" && x.for.includes("IP")) mult = mult.pow(ups[x.inid].effectordefault(1, "IP"));
    })
    mult = goldenslidereffects(mult, "IP");
    mult = challengemult(mult, "IP").pow(challengeeffect("IP"));
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

    if(!ups[35].brought) {
        challenges.forEach(x => {
            if(x.id > 6) return;
            x.ele.classList.add("hidden");
            x.competed = false;
        })
        player.challenge.ICcompeted = 0;
        player.challenge.hasunlockedchallenges = false;
    }
    if(document.getElementById("eternity").checked && main.getAnimations() == 0) main.animate(etern,s);
}

function EPgain(mult = new BN(1,0)){
    
    upgrades.forEach(x => {
        if(x.type == "add" && x.for.includes("EP")) mult = mult.add(ups[x.inid].effectordefault(1,"EP"));
    })
    upgrades.forEach(x => {
        if(x.type == "mult" && x.for.includes("EP")) mult = mult.mult(ups[x.inid].effectordefault(1,"EP"));
    })
    upgrades.forEach(x => {
        if(x.type == "pow" && x.for.includes("EP")) mult = mult.pow(ups[x.inid].effectordefault(1, "EP"));
    })
    mult = goldenslidereffects(mult, "EP");
    mult = challengemult(mult, "EP").pow(challengeeffect("EP"));
    return mult;
}

function DTgain(){
    let amount = BN.log(player.money.time,3.333).pow(1.5);

    upgrades.forEach(x => {
        if(x.type == "add" && x.for.includes("DT")) amount = amount.add(ups[x.inid].effectordefault(1,"DT"));
    })
    upgrades.forEach(x => {
        if(x.type == "mult" && x.for.includes("DT")) amount = amount.mult(ups[x.inid].effectordefault(1,"DT"));
    })
    upgrades.forEach(x => {
        if(x.type == "pow" && x.for.includes("DT")) amount = amount.pow(ups[x.inid].effectordefault(1, "DT"));
    })
    mult = goldenslidereffects(amount, "DT");
    mult = challengemult(amount, "DT").pow(challengeeffect("DT"));

    return BN.max(amount,1);
}

function progress(){
    if(player.reset.armageddons > 0) return 6;
    if(player.money.eternitypoints.gt(1.79e308)) return 5;
    if(player.reset.eternites > 0) return 4;
    if(ups[24].brought) return 3;
    if(player.reset.infinites > 0) return 2;
    if(player.reset.goldify > 0) return 1;
    return 0;
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
    player.money.relics.add(ups[49].effectordefault(1));

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

    if(player.reset.armageddons == 1){
        document.getElementById("autotime").checked = false;
        document.getElementById("autogold").checked = false;
        document.getElementById("autoinfinity").checked = false;
    }

    if (!ups[35].brought) challenges.forEach(x => {
        if(x.id > 12) return;
        x.ele.classList.add("hidden");
        x.competed = false;
        player.challenge.ICcompeted = 0;
        player.challenge.ECcompeted = 0;
        player.challenge.ICunlocks = 0;
        player.challenge.ECunlocks = 0;
        player.challenge.hasunlockedchallenges = false;
    });

    if(document.getElementById("armageddon").checked && main.getAnimations() == 0) main.animate(arm,s);
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
