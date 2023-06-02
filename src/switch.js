// mobileSwitch() : mobilebtn과 연결된 함수로 css를 모바일 버전으로 바꿔 준다.
function mobileSwitch() {

    //changehref라는 변수에 href로 들어갈 mobile.css의 주소를 작성해 준다.
    changehref = "css/mobile.css"

    //css라는 변수에 cssline을 담는다.
    css = document.getElementById("cssline")

    //cssline에서 href부분만 changehref에 담긴 값으로 바꿔준다.
    css.href = changehref;
}
function desktopSwitch() {

    //changehref라는 변수에 href로 들어갈 index.css의 주소를 작성해 준다.
    changehref = "css/index.css"

    //css라는 변수에 cssline을 담는다.
    css = document.getElementById("cssline")

    //cssline에서 href부분만 changehref에 담긴 값으로 바꿔준다.
    css.href = changehref;
}