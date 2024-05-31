
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
    }
]

class strike {
    constructor(data){
        this.text = data.text;
        this.id = data.id;
    }

    id = 0;
    text = [];
    triggered = false;

    trigger(){
        if(this.triggered) return false;
        this.text.forEach(x => alert(x));
        this.triggered = true;
    }
}

var glitchstrikes = [];