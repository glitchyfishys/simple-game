dev = {

    addtime(BN){
        player.money.time.add(BN);
        notify("added time",3);
    },

    addgold(BN){
        player.money.gold.add(BN);
        notify("added gold",3);
    },

    addinfinitypoints(BN){
        player.money.infinitypoints.add(BN);
        notify("added IP",3);
    },

    addeternitypoints(BN){
        player.money.eternitypoints.add(BN);
        notify("added EP",3);
    },

    adddilatedtime(BN){
        player.money.dilatedtime.add(BN);
        notify("added DT",3);
    },

    addrelics(BN){
        player.money.relics.add(BN);
        notify("added relics",3);
    },

    changechallengecompleation(id){
        if(challenges[id].competed) notify(challenges[id].name + " removed completion", 2)
        else notify(challenges[id].name + " added completion", 2)
        challenges[id].competed = !challenges[id].competed;
    },

    completechallengeupto(id){
        challenges.forEach(x => {

            if(x.id <= id ) {
                if(!x.competed)notify(challenges[x.id].name + " completed", 2);
                x.competed = true;
            }
        });
    },

    progress(p){
        if(p >= 5) player.reset.armageddons++;
        if(p >= 4) player.money.eternitypoints.add(new BN(1.8,308));
        if(p >= 3) player.reset.eternites++;
        if(p >= 2) ups[24].brought = true;
        if(p >= 1) player.reset.infinites++;
        player.reset.goldify++;
    },

    hardreset(){
        if(!confirm("you should only reset when you reach 1e1e300 time \nare you sure?")) return false;
        
        notify("game reset",3);
        if(player.end) notify("use \"player.end = true\" in the console to unlock dev tools",10);
        player = this.set;
        ups.forEach(x => x.brought = false);
        challenges.forEach(x => {
            x.competed = false;
            x.ele.classList.add("hidden");
        });
        glitchstrikes.forEach(x => x.triggered = false)

        document.getElementById("autotime").checked = false;
        document.getElementById("autogold").checked = false;
        document.getElementById("autoinfinity").checked = false;

        document.getElementById("goldifiy").checked = true;
        document.getElementById("crunch").checked = true;
        document.getElementById("eternity").checked = true;
        document.getElementById("dilation").checked = true;
        document.getElementById("armageddon").checked = true;

        document.getElementById("autogoldgain").checked = false;
        document.getElementById("autoIPgain").checked = false;
        document.getElementById("autoEPgain").checked = false;
        document.getElementById("autoDTgain").checked = false;
        document.getElementById("autorelicsgain").checked = false;
        return true;
    },

    set: {
        money: {
            gold: new BN(0,0),
            time: new BN(0,0),
            dilatedtime: new BN(0,0),
            infinitypoints: new BN(0,0),
            eternitypoints: new BN(0,0),
            relics: new BN(0,0),
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
            auto:  [],
        },
        automation: [],
        tablefton: 0,
        break: false,
        overdilatedtime: 1,
        softcapeffectdiv: 1,
        strikebits:0,
        end: false,
    },
}