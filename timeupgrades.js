
const upgrades = [
    {
        id:0,
        inid:0,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "time",
        decription: "x5",
        cost: new BN(1,1),
        currencykey: "time",
        effect: ()=> new BN(5,0),
        reqire: true
    },
    {
        id:1,
        inid:1,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "ex-time",
        decription: "x15",
        cost: new BN(7.5,1),
        currencykey: "time",
        effect: () => new BN (1.5,1),
        reqire: true
    },
    {
        id:2,
        inid:2,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "vm-time",
        decription: "xlog3(time)",
        cost: new BN(2,3),
        currencykey: "time",
        effect: () => BN.log(player.money.time,3),
        softcap: new BN(1,5),
        reqire: true
    },
    {
        id:3,
        inid:3,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "em-time",
        decription: "xlog5(time)",
        cost: new BN(4,4),
        currencykey: "time",
        effect: () => BN.log(player.money.time,5),
        softcap: new BN(1,5),
        reqire: true
    },
    {
        id:4,
        inid:4,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "cm-time",
        decription: "xlog8(time) ^ 1.8",
        cost: new BN(2,5),
        currencykey: "time",
        effect: () => BN.log(player.money.time,8).pow(1.8),
        softcap: new BN(1,5),
        reqire: true
    },
    {
        id:5,
        inid:5,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "xv-time",
        decription: "previous ^ 1.25",
        cost: new BN(1,7),
        currencykey: "time",
        effect: () => ups[4].effectordefault().pow(1.25),
        softcap: new BN(1,5),
        reqire: true
    },
    {
        id:6,
        inid:6,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "yc-time",
        decription: "sum of all previous effects",
        cost: new BN(2.5,10),
        currencykey: "time",
        effect: () => BN.add(ups[0].effectordefault(1), ups[1].effectordefault(1))
        .add(ups[2].effectordefault(1)).add(ups[3].effectordefault(1))
        .add(ups[4].effectordefault(1)).add(ups[5].effectordefault(1)),
        softcap: new BN(1,10),
        reqire: true
    },
    {
        id:7,
        inid:7,
        ugkey: "timebits",
        type: "mult",
        for: "time",
        name: "av-time",
        decription: "previous effect ^1.3",
        cost: new BN(5,13),
        currencykey: "time",
        effect: () => BN.pow(ups[6].effectordefault(1), 1.3),
        softcap: new BN(1,7),
        reqire: true
    },
    {
        id:8,
        inid:8,
        ugkey: "timebits",
        type: "reset",
        name: "goldify",
        decription: "reset for gold",
        cost: new BN(1,20),
        currencykey: "time",
        effect: () => BN.div(player.money.time, 1e20).log(1.3).mult(goldgain()),
        softcap: new BN(1,308),
        reqire: () => player.upgrades.timebits >= 255 || progress() > 0,
        reset: () => goldify()
    },
    {
        id:0,
        inid:9,
        ugkey: "goldbits",
        type: "pow",
        for: "time",
        name: "golden",
        decription: "^1.2 time",
        cost: new BN(4,0),
        currencykey: "gold",
        effect: () => new BN(1.2,0),
        reqire: () => progress() > 0,
    },
    {
        id:1,
        inid:10,
        ugkey: "goldbits",
        type: "mult",
        for: "gold",
        name: "gold-xv",
        decription: "x5 gold",
        cost: new BN(3.5,1),
        currencykey: "gold",
        effect: () => new BN(5,0),
        reqire: () => progress() > 0,
    },
    {
        id:2,
        inid:11,
        ugkey: "goldbits",
        type: "mult",
        for: "gold",
        name: "gold-km",
        decription: "x5 gold",
        cost: new BN(1.5,3),
        currencykey: "gold",
        effect: () => new BN(5,0),
        reqire: () => progress() > 0,
    },
    {
        id:3,
        inid:12,
        ugkey: "goldbits",
        type: "pow",
        for: "time",
        name: "gold-xt",
        decription: "^1.6 time",
        cost: new BN(4,4),
        currencykey: "gold",
        effect: () => new BN(1.6,0),
        reqire: () => progress() > 0,
    },
    {
        id:4,
        inid:13,
        ugkey: "goldbits",
        type: "add",
        for: "time",
        name: "gold-vm",
        decription: "+1M to base time muliplier",
        cost: new BN(2,5),
        currencykey: "gold",
        effect: () => new BN(1,6),
        reqire: () => progress() > 0,
    },
    {
        id:5,
        inid:14,
        ugkey: "goldbits",
        type: "mult",
        for: "gold",
        name: "gold-av",
        decription: "x12 gold",
        cost: new BN(1,6),
        currencykey: "gold",
        effect: () => new BN(1.2,1),
        reqire: () => progress() > 0,
    },
    {
        id:6,
        inid:15,
        ugkey: "goldbits",
        type: "pow",
        for: "gold",
        name: "gold-ne",
        decription: "+^1.25 gold per 1e100 time",
        cost: new BN(7,6),
        currencykey: "gold",
        effect: () => BN.log(player.money.time, 1e100).div(4).add(1),
        softcap: new BN(1,2),
        reqire: () => progress() > 0,
    },
    {
        id:7,
        inid:16,
        ugkey: "goldbits",
        type: "unlock",
        for: "gold",
        name: "gold-kl",
        decription: "unlock the golden sliders",
        cost: new BN(3,7),
        currencykey: "gold",
        effect: () => true,
        reqire: () => progress() > 0,
    },
    {
        id:8,
        inid:17,
        ugkey: "goldbits",
        type: "pow",
        for: "time",
        name: "gold-nl",
        decription: "time ^ log1e10(time)/25",
        cost: new BN(1,8),
        currencykey: "gold",
        effect: () => BN.log(player.money.time,1e10).div(15).add(1),
        cap: new BN(1,4),
        reqire: () => progress() > 0,
    },
    {
        id:9,
        inid:18,
        ugkey: "goldbits",
        type: "unlock",
        for: "time",
        name: "gold-au",
        decription: "unlock a new slider also increace max value by 2",
        cost: new BN(1,9),
        currencykey: "gold",
        effect: () => true,
        reqire: () => progress() > 0,
    },
    {
        id:10,
        inid:19,
        ugkey: "goldbits",
        type: "reset",
        for: "ip",
        name: "infinity",
        decription: "reset for infinity points",
        cost: [new BN(1,10), new BN(1.8,308)],
        currencykey: ["gold", "time"],
        effect: () => (BN.div(player.money.time, new BN(1.8,307)).log(10)).mult(IPgain()),
        softcap: new BN(1,308),
        reqire: () => progress() > 1 || ups[18].brought || player.money.time.gt(new BN(1.79,308)),
        reset: () => infinity()
    },
    {
        id:0,
        inid:20,
        ugkey: "infinitybits",
        type: "mult",
        for: ["gold","time"],
        name: "absolue infinity",
        decription: "10x time and gold",
        cost: new BN(1,0),
        currencykey: "infinitypoints",
        effect: [() => new BN(10), () => new BN(10)],
        reqire: () => progress() > 1,
    },
    {
        id:1,
        inid:21,
        ugkey: "infinitybits",
        type: "pow",
        for: "time",
        name: "positive infinity",
        decription: "^1.5 time",
        cost: new BN(2,0),
        currencykey: "infinitypoints",
        effect: () => new BN(1.5),
        reqire: () => progress() > 1,
    },
    {
        id:2,
        inid:22,
        ugkey: "infinitybits",
        type: "pow",
        for: "gold",
        name: "negitive infinity",
        decription: "^1.5 gold",
        cost: new BN(2,0),
        currencykey: "infinitypoints",
        effect: () => new BN(1.5),
        reqire: () => progress() > 1,
    },
    {
        id:3,
        inid:23,
        ugkey: "infinitybits",
        type: "unlock",
        for: "gold",
        name: "infinity-v",
        decription: "unlock automation",
        cost: new BN(3,0),
        currencykey: "infinitypoints",
        effect: () => true,
        reqire: () => progress() > 1,
    },
    {
        id:4,
        inid:24,
        ugkey: "infinitybits",
        type: "unlock",
        for: "gold",
        name: "infinity-k",
        decription: "break infinity",
        cost: new BN(1,1),
        currencykey: "infinitypoints",
        effect: () => true,
        reqire: () => progress() > 1,
    },
    {
        id:5,
        inid:25,
        ugkey: "infinitybits",
        type: "unlock",
        for: "gold",
        name: "infinity-p",
        decription: "golden silders are not reset on infinity",
        cost: new BN(4,2),
        currencykey: "infinitypoints",
        effect: () => true,
        reqire: () => progress() > 2,
    },
    {
        id:6,
        inid:26,
        ugkey: "infinitybits",
        type: "pow",
        for: "time",
        name: "infinity-o",
        decription: "time pow by gold",
        cost: new BN(1,3),
        currencykey: "infinitypoints",
        effect: () => BN.log(player.money.gold,10000).root(5),
        softcap: new BN(1,1),
        cap: new BN(1,4),
        reqire: () => progress() > 2,
    },
    {
        id:7,
        inid:27,
        ugkey: "infinitybits",
        type: "mult",
        for: "IP",
        name: "infinity-m",
        decription: "IP mult by IP",
        cost: new BN(1,5),
        currencykey: "infinitypoints",
        effect: () => BN.log(player.money.infinitypoints,1.5).root(1.5),
        softcap: new BN(1,5),
        cap: new BN(1,1000),
        reqire: () => progress() > 2,
    },
    {
        id:8,
        inid:28,
        ugkey: "infinitybits",
        type: "mult",
        for: "gold",
        name: "infinity-y",
        decription: "gold mult by IP",
        cost: new BN(2.5,6),
        currencykey: "infinitypoints",
        effect: () => BN.log(player.money.infinitypoints,5).pow(2.5),
        softcap: new BN(1,50),
        cap: new BN(1,10000),
        reqire: () => progress() > 2,
    },
    {
        id:9,
        inid:29,
        ugkey: "infinitybits",
        type: "reset",
        for: "gold",
        name: "eternity",
        decription: "reset for eternity points",
        cost: new BN(1,1000),
        currencykey: "infinitypoints",
        effect: () => BN.div(player.money.infinitypoints, new BN(1,1000)).log(10).mult(EPgain()),
        cap: new BN(1,1e308),
        reqire: () => progress() > 3 || player.money.infinitypoints.gt(new BN(1,1000)),
        reset: () => eternity(),
    },
    {
        id:0,
        inid:30,
        ugkey: "eternitybits",
        type: "pow",
        for: ["time","gold","IP"],
        name: "eternity atlis",
        decription: "time gold and IP ^1.25 also destabilizes eterni-I challenge",
        cost: new BN(1,0),
        currencykey: "eternitypoints",
        effect: [() => new BN(1.25,0),() => new BN(1.25,0),() => new BN(1.25,0)],
        reqire: () => progress() > 3,
    },
    {
        id:1,
        inid:31,
        ugkey: "eternitybits",
        type: "pow",
        for: "time",
        name: "eternity time",
        decription: "time ^1.5",
        cost: new BN(1,1),
        currencykey: "eternitypoints",
        effect: () => new BN(1.5,0),
        reqire: () => progress() > 3,
    },
    {
        id:2,
        inid:32,
        ugkey: "eternitybits",
        type: "pow",
        for: "gold",
        name: "eternity gold",
        decription: "gold ^1.5",
        cost: new BN(1,1),
        currencykey: "eternitypoints",
        effect: () => new BN(1.5,0),
        reqire: () => progress() > 3,
    },
    {
        id:3,
        inid:33,
        ugkey: "eternitybits",
        type: "pow",
        for: "IP",
        name: "eternity IP",
        decription: "IP ^1.5",
        cost: new BN(1,1),
        currencykey: "eternitypoints",
        effect: () => new BN(1.5,0),
        reqire: () => progress() > 3,
    },
    {
        id:4,
        inid:34,
        ugkey: "eternitybits",
        type: "pow",
        for: ["time","gold","IP"],
        name: "eternity amalgmate",
        decription: "time gold and IP ^1.5",
        cost: new BN(1,3),
        currencykey: "eternitypoints",
        effect: [() => new BN(1.5,0),() => new BN(1.5,0),() => new BN(1.5,0)],
        reqire: () => progress() > 3,
    },
    {
        id:5,
        inid:35,
        ugkey: "eternitybits",
        type: "unlock",
        for: "IP",
        name: "b-eternity",
        decription: "infinity challenges stay complete",
        cost: new BN(5,3),
        currencykey: "eternitypoints",
        effect: () => true,
        reqire: () => progress() > 3,
    },
    {
        id:6,
        inid:36,
        ugkey: "eternitybits",
        type: "unlock",
        for: "IP",
        name: "p-eternity",
        decription: "gain all gold per second and gain 15 max slider value",
        cost: new BN(1,4),
        currencykey: "eternitypoints",
        effect: () => true,
        reqire: () => progress() > 3,
    },
    {
        id:7,
        inid:37,
        ugkey: "eternitybits",
        type: "mult",
        for: "EP",
        name: "n-eternity",
        decription: "time boosts EP gain",
        cost: new BN(2.5,4),
        currencykey: "eternitypoints",
        effect: () => BN.log(player.money.time,25),
        reqire: () => progress() > 3,
    },
    {
        id:8,
        inid:38,
        ugkey: "eternitybits",
        type: "pow",
        for: "IP",
        name: "x-eternity",
        decription: "IP pow by EP",
        cost: new BN(1,10),
        currencykey: "eternitypoints",
        effect: () => BN.log(player.money.eternitypoints,15).div(2.5),
        reqire: () => progress() > 3,
    },
    {
        id:9,
        inid:39,
        ugkey: "eternitybits",
        type: "mult",
        for: "time",
        name: "k-eternity",
        decription: "time gain by EP",
        cost: new BN(1,11),
        currencykey: "eternitypoints",
        effect: () => BN.log(player.money.eternitypoints,1.25),
        reqire: () => progress() > 3,
    },
    {
        id:10,
        inid:40,
        ugkey: "eternitybits",
        type: "unlock",
        for: "time",
        name: "u-eternity",
        decription: "sliders auto update and don't reset on eternity",
        cost: new BN(1,19),
        currencykey: "eternitypoints",
        effect: () => true,
        reqire: () => progress() > 3,
    },
    {
        id:11,
        inid:41,
        ugkey: "eternitybits",
        type: "unlock",
        for: "time",
        name: "l-eternity",
        decription: "EP sliders max is 15",
        cost: new BN(1,45),
        currencykey: "eternitypoints",
        effect: () => true,
        reqire: () => progress() > 3,
    },
    {
        id:12,
        inid:42,
        ugkey: "eternitybits",
        type: "unlock",
        for: "time",
        name: "dilation-k",
        decription: "dilation nerfs are weaker",
        cost: new BN(1,6),
        currencykey: "dilatedtime",
        effect: () => true,
        reqire: () => progress() > 4,
    },
    {
        id:13,
        inid:43,
        ugkey: "eternitybits",
        type: "pow",
        for: "time",
        name: "dilation-time",
        decription: "time ^ 50",
        cost: new BN(1,7),
        currencykey: "dilatedtime",
        effect: () => new BN(5,1),
        reqire: () => progress() > 4,
    },
    {
        id:14,
        inid:44,
        ugkey: "eternitybits",
        type: "pow",
        for: "gold",
        name: "dilation-gold",
        decription: "gold ^ 50",
        cost: new BN(1,7),
        currencykey: "dilatedtime",
        effect: () => new BN(5,1),
        reqire: () => progress() > 4,
    },
    {
        id:15,
        inid:45,
        ugkey: "eternitybits",
        type: "pow",
        for: "IP",
        name: "dilation-IP",
        decription: "IP ^ 50",
        cost: new BN(1,7),
        currencykey: "dilatedtime",
        effect: () => new BN(5,1),
        reqire: () => progress() > 4,
    },
    {
        id:16,
        inid:46,
        ugkey: "eternitybits",
        type: "pow",
        for: "time",
        name: "d-dilation",
        decription: "time pow by DT",
        cost: new BN(1,14),
        currencykey: "dilatedtime",
        effect: () => BN.root(player.money.dilatedtime,3),
        reqire: () => progress() > 4,
    },
    {
        id:17,
        inid:47,
        ugkey: "eternitybits",
        type: "mult",
        for: "DT",
        name: "p-dilation",
        decription: "time effect DT gain more",
        cost: new BN(1,30),
        currencykey: "dilatedtime",
        effect: () => BN.log(player.money.time,100),
        reqire: () => progress() > 4,
    },
    {
        id:18,
        inid:48,
        ugkey: "eternitybits",
        type: "pow",
        for: "DT",
        name: "z-dilation",
        decription: "dilation nerfs are much worse but DT ^15",
        cost: new BN(1,150),
        currencykey: "dilatedtime",
        effect: () => new BN(1.5,1),
        reqire: () => progress() > 4,
    },
    {
        id:19,
        inid:49,
        ugkey: "eternitybits",
        type: "reset",
        for: "time",
        name: "destroy",
        decription: "armageddon",
        cost: () => (player.challenge.doomed ? new BN(1,3) : new BN(1,1e155)),
        currencykey: "time",
        effect: () => {
            if(player.reset.armageddons == 0) return new BN(0,0); 
            let gain = BN.log(player.money.time, 10);
            gain.mult(BN.log( BN.add(player.money.gold, 2), 10).mult(1.5));
            gain.mult(BN.log( BN.add(player.money.infinitypoints, 2), 10).mult(2.5));
            gain.mult(BN.log( BN.add(player.money.eternitypoints, 2), 10).mult(5));

            return gain;
        },
        softcap: new BN(1,1e308),
        reqire: () => progress() > 4 && (player.money.dilatedtime.gte(new BN(1,1000)) || player.reset.armageddons > 0),
        reset: () => armageddon(),
    },
    {
        id:20,
        inid:50,
        ugkey: "eternitybits",
        type: "mult",
        for: "time",
        name: "doomed time",
        decription: "time * relics+1 and time upgrades aren't reset",
        cost: new BN(5,0),
        currencykey: "relics",
        effect: () => BN.add(player.money.relics,1),
        softcap: new BN(1,3),
        reqire: () => progress() > 5,
    },
    {
        id:21,
        inid:51,
        ugkey: "eternitybits",
        type: "mult",
        for: "time",
        name: "doomed time",
        decription: "time * 10000",
        cost: new BN(1,3),
        currencykey: "relics",
        effect: () => new BN(1,4),
        reqire: () => progress() > 5,
    },
    {
        id:22,
        inid:52,
        ugkey: "eternitybits",
        type: "mult",
        for: "gold",
        name: "doomed gold",
        decription: "gold * relics+1 and gold upgrades aren't reset",
        cost: new BN(5,3),
        currencykey: "relics",
        effect: () => BN.add(player.money.relics,1),
        softcap: new BN(1,3),
        reqire: () => progress() > 5,
    },
    {
        id:23,
        inid:53,
        ugkey: "eternitybits",
        type: "pow",
        for: "time",
        name: "doomed time",
        decription: "time ^ 1.3",
        cost: new BN(5,4),
        currencykey: "relics",
        effect: () => new BN(1.3,0),
        reqire: () => progress() > 5,
    },
    {
        id:24,
        inid:54,
        ugkey: "eternitybits",
        type: "pow",
        for: "gold",
        name: "doomed gold",
        decription: "gold^ 1.2",
        cost: new BN(5,8),
        currencykey: "relics",
        effect: () => new BN(1.2,0),
        reqire: () => progress() > 5,
    },
    {
        id:25,
        inid:55,
        ugkey: "eternitybits",
        type: "pow",
        for: "IP",
        name: "doomed IP",
        decription: "IP^ 1.75",
        cost: new BN(1,12),
        currencykey: "relics",
        effect: () => new BN(1.75,0),
        reqire: () => progress() > 5,
    },
    {
        id:26,
        inid:56,
        ugkey: "eternitybits",
        type: "mult",
        for: "IP",
        name: "doomed IP",
        decription: "IP relic mult and upgrades don't reset",
        cost: new BN(1,14),
        currencykey: "relics",
        effect: () => BN.add(player.money.relics,1).div(10000),
        softcap: new BN(1,3),
        reqire: () => progress() > 5,
    },
    {
        id:27,
        inid:57,
        ugkey: "eternitybits",
        type: "mult",
        for: "EP",
        name: "doomed EP",
        decription: "EP relic mult and upgrades don't reset",
        cost: new BN(1,18),
        currencykey: "relics",
        effect: () => BN.add(player.money.relics,1).div(1e10),
        softcap: new BN(1,3),
        reqire: () => progress() > 5,
    },
    {
        id:28,
        inid:58,
        ugkey: "eternitybits",
        type: "mult",
        for: "DT",
        name: "doomed DT",
        decription: "DT relic mult",
        cost: new BN(1,100),
        currencykey: "relics",
        effect: () => BN.add(player.money.relics,1).div(1e19),
        softcap: new BN(1,3),
        reqire: () => progress() > 5,
    },
    {
        id:29,
        inid:59,
        ugkey: "eternitybits",
        type: "unlock",
        for: "DT",
        name: "doomed",
        decription: "slowly lowers soft caps",
        cost: new BN(1,245),
        currencykey: "relics",
        effect: () => true,
        reqire: () => (player.challenge.doomed && player.money.dilatedtime.gte(new BN(1,1000))) || ups[59].brought,
    },
]
