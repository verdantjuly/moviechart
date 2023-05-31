document.getElementById("search") //search라는 ID를 가진 것에서
.addEventListener("keyup", function (e) {
    if (e.code === 'Enter') { //Enter 키를 누르게 되면
        document.getElementById("searchbtn").click(); //searchbtn이 클릭 되는 것과 같다.
    }
});