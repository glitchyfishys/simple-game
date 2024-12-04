
const goldslider = [
    {
        id: 0,
        inid: 0,
        eleid: "s1",
        color: "rosybrown",
        text: "gold gain pow v/10",
        type: "pow",
        for: "gold",
        effect: value => (value-1)/10 + 1,
        min: () => 1,
        max: () => 15,
        unlocked: () => ups[16].brought
    },
    {
        id: 1,
        inid:1,
        eleid: "s2",
        color: "gold",
        text: "time power log25(v)",
        type: "pow",
        for: "time",
        effect: value => Math.log10(value) / Math.log10(25) + 1,
        min: () => 1,
        max: () => 15,
        unlocked: () => ups[16].brought
    },
    {
        id: 2,
        inid:2,
        eleid: "s3",
        color: "lime",
        text: "gold x 4^v",
        type: "mult",
        for: "gold",
        effect: value => 4 ** (value -1),
        min: () => 1,
        max: () => 5,
        unlocked: () => ups[18].brought
    },
    {
        id: 3,
        inid:3,
        eleid: "s4",
        color: "lime",
        text: "EP ^ v",
        type: "pow",
        for: "EP",
        effect: value => (value),
        min: () => 1,
        max: () => ups[41].brought ? 15 : 5,
        unlocked: () => challenges[10].competed
    }
]

var sliders = [];

function makenewgslider(data){
    slidertext(data.text, data.eleid);
    const para = document.createElement("input");

    const element = document.getElementById("goldsliders");
    let child = element.appendChild(para);
    child.classList.add("gslider");
    child.id = data.eleid;
    child.classList.add(data.eleid);
    child.type = "range";
    child.value = 1;
    makebreak("goldsliders");
    return child;
}

function slidertext(text = "oops", id = "id"){
    const para = document.createElement("p5");

    const element = document.getElementById("goldsliders");
    let child = element.appendChild(para);
    child.innerHTML = text;
    child.id = id + "-text"
    child.classList.add("slidertext")
    return child;
}

class goldenslider {
    constructor(data){
        this.id = data.id;
        this.min = data.min;
        this.max = data.max;
        this.eleid = data.eleid;
        this.text = data.text;
        this.type = data.type;
        this.for = data.for;
        this.effect = data.effect;
        this.unlocked = data.unlocked;
        this.brought = data.unlocked;
        this.value = 1;
    }

    id = 0;
    min = 0;
    max = 10;
    value = 1;
    currentvalue = 1;
    eleid = document.createElement("a");
    text = "";
    type = "pow";
    for = "time";
    brought = () => false;
    effect = () => 5;
    unlocked = () => false;

    updateslider(){
        let min = 0; let max = 0;
        
        min = this.minvalue;
        max = this.maxvalue;

        let e = document.getElementById(this.eleid);
        let valuechanged = this.value != Number(e.value);
        this.value = Number(e.value);
        
        if(pick[5].brought){
            this.currentvalue = this.unlocked ? max : min;
            this.value = this.unlocked ? max : min;
            e.value = this.unlocked ? max : min;
        }

        e.min = min;
        e.max = max;
        
        for (let i = 0; i < this.maxvalue; i++) {
            if(this.totalslidersvalue > goldenslider.maxtotal && (!valuechanged || goldenslider.maxtotal < this.value-1)){
                if(e.value > 1) {
                    this.value--;
                    e.value--;
                }
            }else break;
        }
        let text = document.getElementById(this.eleid + "-text");
        if(this.brought()){
            e.classList.remove("hidden");
            text.innerHTML = this.string;
            text.classList.remove("hidden");
        }else{
            e.classList.add("hidden");
            text.classList.add("hidden");
        }
        
    }

    updatevalue(){
        this.updateslider();
        this.currentvalue = this.value;
    }

    get string(){
        let string = this.text;
        string += ` min: ${this.minvalue}  max: ${this.maxvalue}  value: ${this.value}`;
        string += "<br/> "
        string += " effect: " + this.effect(this.currentvalue).toFixed(2).toString();
        if(this.currentvalue != this.value) string += " after goldify: " + this.effect(this.value).toFixed(2).toString();

        return string;
    }
    get totalslidersvalue(){
        let value = 0;
        sliders.forEach(x => value += x.value);
        return value - sliders.length;
    }
    static get maxtotal(){
        let total = 2;
        total += ups[18].brought ? 2 : 0;
        total += ups[36].brought ? 15 : 0;
        total += pick[5].brought ? 1e20 : 0;
        return total;
    }
    get overload(){
        return this.totalslidersvalue - goldenslider.maxtotal;
    }

    get minvalue(){
        return typeof this.min == "function" ? this.min() : this.min;
    }
    get maxvalue(){
        return Math.floor((typeof this.max == "function" ? this.max() : this.max) * pick[13].effectordefault(1).toNumber());
    }
    set slidervalue(value = 1){
        document.getElementById(this.eleid).value = value;
    }

    dynamicmin(x){
        let c = typeof x.min == "function" ? x.min() : x.min;
        return this.value - c;
    }
    dynamicmax(x){
        let c = Math.floor((typeof x.max == "function" ? x.max() : x.max) * pick[13].effectordefault(1).toNumber());
        return this.value - c;
    }

    effectordefault(dif){
        if(!this.unlocked()) return dif
        let effect = this.effect(this.currentvalue);
        let bn = effect instanceof BN;
        if(bn){
            if(effect.gt(1)) return effect;
            return new BN(dif,0)
        }
        if(this.unlocked()) return this.effect(this.currentvalue);
        return dif;
    }

}

function softcap(currentvalue = new BN(1,0)){

    if(currentvalue.isNaN()) currentvalue = new BN(1,1e308);
    if(currentvalue.gt(new BN(1e308)) && player.softcapeffectdiv < 1e308) {
        let div = ups[59].brought ? ( Math.min(player.softcapeffectdiv, 1e300)) : 1;
        let c = currentvalue.e / 308;
        currentvalue.e = currentvalue.e / Math.sqrt(c / div);
        if(player.softcapeffectdiv < 1) currentvalue.pow(player.softcapeffectdiv);
        currentvalue.fix();
    }
    return currentvalue;
}
