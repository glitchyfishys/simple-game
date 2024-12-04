

function notify(text, sec = 1, color = "#FFFF00") {
    const para = document.createElement("p");

    const element = document.getElementById("notify");
    let child = element.appendChild(para);
    element.insertBefore(child, element.firstChild);
    child.innerHTML = text;
    child.classList.add("notify");
    
    child.style.backgroundColor = color;
    
    setTimeout(() => child.style.transform = "translateX(-160px)", 33);

    setTimeout(() => {child.style.transform = "translateX(0px)"; setTimeout(() => {child.remove();}, 300);}, sec * 1000);

}
