function mobileSwitch() {
    document.getElementById("cssline").innerHTML = ""
    let cssline = `<link rel="stylesheet" type="text/css" href="src/css/mobile.css" />`
    document.getElementById("cssline").insertAdjacentHTML('beforeend', cssline);
}

function desktopSwitch() {
    document.getElementById("cssline").innerHTML = ""
    let cssline = `<link rel="stylesheet" type="text/css" href="src/css/index.css" />`
    document.getElementById("cssline").insertAdjacentHTML('beforeend', cssline);
}