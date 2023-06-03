
document.getElementById("search")
    .addEventListener("keyup", function (e) {

        if (e.code === 'Enter') {
            document.getElementById("searchbtn").click();
        }
    })