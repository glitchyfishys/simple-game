
const autobuyers = [
    {
        funct: () => ups.slice(0, 8).forEach(x => x.buy()),
        iid: 0,
        tickid: "autotime",
        text: "time upgrades: ",
        reqire: () => ups[23].brought || pick[6].brought
    },
    {
        funct: () => ups.slice(9, 19).forEach(x => x.buy()),
        iid: 1,
        tickid: "autogold",
        text: "gold upgrades: ",
        reqire: () => ups[23].brought || pick[6].brought
    },
    {
        funct: () => ups.slice(20, 29).forEach(x => x.buy()),
        iid: 2,
        tickid: "autoinfinity",
        text: "infinity upgrades: ",
        reqire: () => game.progress > 3 && player.reset.eternites > 0 || pick[6].brought
    },
    {
        funct: () => ups.slice(30, 49).forEach(x => x.buy()),
        iid: 3,
        tickid: "autoeternity",
        text: "eternity upgrades: ",
        reqire: () => pick[6].brought,
        show: () => game.progress > 6
    },
    {
        funct: () => ups.slice(50, 59).forEach(x => x.buy()),
        iid: 4,
        tickid: "autorelic",
        text: "relic upgrades: ",
        reqire: () => pick[6].brought,
        show: () => game.progress > 6
    }
]

class autobuyer{
    constructor(data){
        this.funct = data.funct;
        this.reqire = data.reqire;
        this.show = data.show;
        this.tickid = data.tickid;
    }
    funct = () => true;
    tickid = "";
    reqire = () => true;
    show = () => true;

    get enabled(){
        return document.getElementById(this.tickid).checked;
    }

    tick(){
        let d = document.getElementById(this.tickid);
        if(this.show ? this.show() : true)  d.parentElement.classList.remove("hidden");
        else d.parentElement.classList.add("hidden");
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
    const c = inner(text);
    const element = c;

    const para = document.createElement("input");
    let child = element.appendChild(para);
    child.type = "checkbox";
    child.style.zIndex = "5";
    child.id = data.tickid;
    return child;
}

function inner(text){
    const para = document.createElement("div");
    
    const element = document.getElementById("auto");
    let child = element.appendChild(para);
    child.innerHTML = text;
    return child
}