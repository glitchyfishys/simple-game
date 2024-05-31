
const autobuyers = [
    {
        funct: () => ups.slice(0, 8).forEach(x => x.buy()),
        iid: 0,
        tickid: "autotime",
        text: "time upgrades: ",
        reqire: () => ups[23].brought
    },
    {
        funct: () => ups.slice(9, 19).forEach(x => x.buy()),
        iid: 1,
        tickid: "autogold",
        text: "gold upgrades: ",
        reqire: () => ups[23].brought
    },
    {
        funct: () => ups.slice(20, 29).forEach(x => x.buy()),
        iid: 2,
        tickid: "autoinfinity",
        text: "infinity upgrades: ",
        reqire: () => progress() > 3
    }
]

class autobuyer{
    constructor(data){
        this.funct = data.funct;
        this.reqire = data.reqire;
        this.tickid = data.tickid;
    }
    funct = () => true;
    tickid = "";
    reqire = () => true;

    get enabled(){
        return document.getElementById(this.tickid).checked;
    }

    tick(){
        let d = document.getElementById(this.tickid);
        if(this.reqire())  d.disabled = false;
        else d.disabled = true;

        if(this.enabled && this.reqire()) this.funct();
    }

}


var auto = [];

function autosetup(){

    autobuyers.forEach(x => {
        auto[x.iid] = new autobuyer(x);
        createauto(x, x.text);
    })
}

function createauto(data, text){
    inner(text);
    const element = document.getElementById("auto");

    const para = document.createElement("input");
    let child = element.appendChild(para);
    child.type = "checkbox";
    child.id = data.tickid;
    makebreak("auto");
    return child;
}

function inner(text){
    const para = document.createElement("span");
    
    const element = document.getElementById("auto");
    let child = element.appendChild(para);
    child.innerHTML = text;
    return child
}