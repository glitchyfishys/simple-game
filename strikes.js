
const strikes = [
    {
        id: 0,
        text: ["heya","so what are we doing here?", "you are traped in my reality", "good luck geting out"]
    },
    {
        id: 1,
        text: ["your gold","how does to work?\nare you paying someone?"]
    },
    {
        id: 2,
        text: ["infinity","something that seams big but is still a lot smaller than you think"]
    },
    {
        id: 3,
        text: ["challenging isn't it","why are you doing this, you can't escape", "you are traped here remember"]
    },
    {
        id: 4,
        text: ["eternity, why are we here? ","what is your cause"]
    },
    {
        id: 5,
        text: ["...","why, just give up", "there is no point"]
    },
    {
        id: 6,
        text: ["huh? did you make that upgrade?","very clever", "removing limits, sorry to say but, that won't work on me"]
    },
    {
        id: 7,
        text: ["no, no, no, how have you made that much","you have doomed us all", "all the others, they can't escape this"]
    },
    {
        id: 8,
        text: ["...","why?", "you alredy won", "now? just stop, it's over"]
    },
    {
        id: 9,
        text: ["your back?","what are you doing?", "and you've gotten even stronger...", "i need to warn the others"]
    },
    {
        id: 10,
        name: "???",
        text: ["huh?", "thats not good", "they figured it out", "oh wait you can read this :bruh:", "I hope you prepare"]
    },
    {
        id: 11,
        name: "Tasdom",
        text: ["WHAT?", "HOW DID YOU GET HERE", "no matter my reality will stop you, or slow you down fast enough"]
    },
    {
        id: 12,
        name: "Tasdom",
        text: ["HOW DID YOU FINISH THAT", "it was not possible from what i was told", "the others will hopefuly stop you in time"]
    },
    {
        id: 13,
        name: "Raadun",
        text: ["hi friend :3", "you made my brother sad and now you will suffer in my reality :p"]
    },
    {
        id: 14,
        name: "Raadun",
        text: ["oh i lost... too bad :(", "just go to the next in line :d"]
    },
    {
        id: 15,
        name: "Exrindal",
        text: ["uhh what have you done", "\"meat\" your end"]
    },
    {
        id: 16,
        name: "Exrindal",
        text: ["that wasn't a skelle\"ton\"", "whatever get going"]
    },
    {
        id: 17,
        name: "Nilanda",
        text: ["Exrindal what do... oh you", "i don't want to deal with you, go away"]
    },
    {
        id: 18,
        name: "Nilanda",
        text: ["exactly what i expected", "LEAVE NOW"]
    },
    {
        id: 19,
        name: "Huda",
        text: ["GO AWAY", "DO NOT EVEN ATEMPT IT"]
    },
    {
        id: 20,
        name: "Huda",
        text: ["[REDACTED]... WHAT DID I TELL YOU"]
    },
    {
        id: 21,
        name: "Zedom",
        text: ["you have been a bit of a pest", "so you will face your consequences"]
    },
    {
        id: 22,
        name: "Zedom",
        text: ["umm what?", "how is that even possible", "i literally disabled your whole production"]
    },
    {
        id: 23,
        name: "Alpha",
        text: ["hello \"player\", if thats what you consider yourself", "i think you have potential", "complete my reality and see"]
    },
    {
        id: 24,
        name: "Alpha",
        text: ["are you annoyed with all these alerts?", "well the developer is lazy and won't add any popup UIs", "deal with it :)"]
    },
    {
        id: 25,
        name: "Alpha",
        text: ["oh your finished my reality", "i have given you a choice player", "destroy what you have worked on or help us destroy the multiverse"]
    },
    {
        id: 26,
        name: "Alpha",
        text: ["why would you do that?", "you have the power", "you can do anything, why reset yourself"]
    },
    {
        id: 27,
        name: "Alpha",
        text: ["end this suffering", "not all of us cnd be killed", "thank you for your help"]
    },
    {
        id: 28,
        name: "Alpha",
        text: ["well done", "this is the end", "goodbye player"]
    },
]

class strike {
    constructor(data){
        this.text = data.text;
        this.id = data.id;
        this.name = data.name ? data.name : "devinul";
    }

    id = 0;
    text = [];
    triggered = false;
    name = "nope";

    trigger(){
        if(this.triggered) return false;
        this.text.forEach(x => alert(this.id >= 27 ? textGlitch(this.name + ":\n" + x, (this.id == 27 ? 0.2 : 0.4)) : (this.name + ":\n" + x)));
        this.triggered = true;
    }
}

var glitchstrikes = [];

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*(){}[]:;,.<>/?'\"|-=_+`~ ".split("");

function textGlitch(text, chance = 0.2){
    const split = text.split("");
    let glitched = "";
    split.forEach(x => glitched += Math.random() < chance ? chars[Math.randomInt(1,chars.length) ] : x);
    return glitched;
}  

Math.randomInt = (low, high) => {
    return Math.floor(low + Math.random() * (high - low));
}