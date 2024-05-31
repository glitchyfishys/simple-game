
const notifyin = [
    { 
        transform: "translateX(-170px)",
        offset: 0.9
    },
    { 
        transform: "translateX(-160px)",
        offset: 1
    }
];
const notifyout = [
    { 
        transform: "translateX(160px)",
        offset: 1,
    }
];

const inout = {
    duration: 250,
    iterations: 1,
    fill: "forwards"
}

function notify(text, sec = 1, color = "#FFFF00") {
    const para = document.createElement("p");

    const element = document.getElementById("notify");
    let child = element.appendChild(para);
    element.insertBefore(child, element.firstChild);
    child.innerHTML = text;
    child.classList.add("notify");
    
    child.animate(notifyin,inout);
    child.style.backgroundColor = color;
    setTimeout(() => {child.animate(notifyout, inout)}, sec * 1000);
    setTimeout(() => {removenotify(child)}, (sec * 1000) + 500);
}

function removenotify(element){
    element.remove()
}