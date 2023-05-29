function mobileSwitch() {
    let changehref = "src/css/mobile.css"
    let css = document.getElementById("cssline")
    css.href = changehref;
}

function desktopSwitch() {
    let changehref = "src/css/index.css"
    let css = document.getElementById("cssline")
    css.href = changehref;
}