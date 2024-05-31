
const tabs = [
    {
        name: "upgrades",
        switch: () => changetab(0),
        tabid: "upgrades",
        bgcolor: "rosybrown",
        show: () => true,
        id: "tab-upgrades"
    },
    {
        name: "golden sliders",
        switch: () => changetab(1),
        tabid: "goldsliders",
        bgcolor: "gold",
        show: () => ups[16].brought,
        id: "tab-gold"
    },
    {
        name: "challenges",
        switch: () => changetab(2),
        tabid: "challenge",
        bgcolor: "blue",
        show: () => progress() > 2 || player.challenge.hasunlockedchallenges,
        id: "tab-challenge"
    },
    {
        name: "dilation",
        switch: () => changetab(3),
        tabid: "dilation-tab",
        bgcolor: "lime",
        show: () => progress() > 4 || player.money.eternitypoints.gte(new BN(1,308)),
        id: "tab-dilation"
    },
    {
        name: "automation",
        switch: () => changetab(4),
        tabid: "auto",
        bgcolor: "#555",
        show: () => ups[23].brought,
        id: "tab-auto"
    },
    {
        name: "settings",
        switch: () => changetab(5),
        tabid: "settings",
        bgcolor: "gray",
        show: () => true,
        id: "tab-settings"
    },
    {
        name: "dev",
        switch: () => changetab(6),
        tabid: "dev",
        bgcolor: "black",
        show: () => player.end,
        id: "tab-dev"
    }
]

function changetab(id = 0, d = false){
    if(tabs[id] == undefined || !tabs[id].show()){
        for (let i = 0; i < tabs.length; i++) {
            if(d){
                if(tabs[id - i] != undefined){
                    if(tabs[id - i].show()){
                        tabs.forEach(x => document.getElementById(x.tabid).classList.add("hidden"));
                        document.getElementById(tabs[id - i].tabid).classList.remove("hidden");
                        player.tablefton = id - i;
                        return true;
                    }
                }
            }
            else{
                if(tabs[id + i] != undefined){
                    if(tabs[id + i].show()){
                        tabs.forEach(x => document.getElementById(x.tabid).classList.add("hidden"));
                        document.getElementById(tabs[id + i].tabid).classList.remove("hidden");
                        player.tablefton = id + i;
                        return true;
                    }
                }
            }
            
        }
        return false;
    }

    tabs.forEach(x => document.getElementById(x.tabid).classList.add("hidden"))
    document.getElementById(tabs[id].tabid).classList.remove("hidden");
    player.tablefton = id;
}

const tabdefaultdata ={
    name: "name",
    switch: () => changetab(1),
    id: "g"
}

function makenewtab(data = tabdefaultdata){
    const para = document.createElement("button");

    const element = document.getElementById("tabholder");
    let child = element.appendChild(para);
    child.onclick = data.switch;
    child.classList.add("tab");
    child.style.backgroundColor = data.bgcolor;
    child.style.borderColor = data.bgcolor;
    child.id = data.id;
    span(child,data.name)
    return child;
}

function makebreak(par = "tabholder"){
    const para = document.createElement("br");

    const element = document.getElementById(par);
    let child = element.appendChild(para);
}

function span(par,text){
    const p = document.createElement("span");

    let c = par.appendChild(p);
    c.innerHTML = text;
}

function showtab(){
    tabs.forEach(x => {
        ele = document.getElementById(x.id)
        if(x.show()){
            ele.classList.remove("hidden")
        }
        else{
            ele.classList.add("hidden")
        }
    })
}