let movies = []
const detailcards = document.querySelector(".detailcards");
const detailhome = document.getElementById("detailhome");

detailhome.addEventListener("click", gohome);
function gohome() {
    location.href = "./index.html";
}

document.addEventListener("DOMContentLoaded", detailload);

let sendid = localStorage.getItem('sendid')
sendid = parseInt(sendid.replace(" type=", ""))

function detailload() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTE5ZjU0OTI3NWEyM2VjNjViNTRkZmQ2MTUyYTA4NiIsInN1YiI6IjY0NzA4YTllNzcwNzAwMDBhOTQ3ZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3W-E9KnuKEWvia4zXrXpCRKfHz9a5clH7RjrUwJD8iY'
        }
    };
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            let rows = data['results']
            movies = rows.map((movie) => { return { ...movie } })

            detailcards.innerHTML = movies
                .map(function append(movie) {
                    if (movie.id == sendid) {

                        let commentview = localStorage.getItem("comment" + movie.id)
                        let writterview = localStorage.getItem("writter" + movie.id)

                        if (!commentview) { commentview = "" }
                        if (!writterview) { writterview = "" }

                        return `<div class= "card">
                        
                        <img class="allimg" id="${movie.id}"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                        <div class="cardbody" id="${movie.id}" >
                        <h1 class="alltitle"  id="${movie.id}" >${movie.title}</h1>
                        <p class="alltime" id="${movie.id}" >${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>  
                        <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p>  
                        
                        <p class="overview" id="${movie.id}" >${movie.overview}</p>  
                    <div class = "big comment box">
                    
                    
                    <div class = "commentbox">
                    <input id="comment" placeholder="please leave short review" autocomplete="off" autofocus></input>
                    <input id="writter" placeholder="id" autocomplete="off" autofocus>
                        <input type="password" id="password" placeholder="password" autocomplete="off" autofocus>
                    <button class="save" id="${movie.id}" type="button">Save</button>
                    <button class="edit" id="${movie.id}" type=" button">Edit</button>
                    <button class="delete" id="${movie.id}" type=" button">Delete</button>
                    </div>
               
                   

                    <div class ="commentviewbox">
                    <p id = "review">Review</p>
                    <p id = "reviewcontent"> ${commentview} <p>
                   <p id = "review">ID</p>
                   <p id = "reviewcontent"> ${writterview}</p>
                   </div>
                   </div>

                </div>
                    </div>`
                    }
                    detailcards.addEventListener("click", clickDetails)
                }).join("")

        })

    // document.getElementById("search")
    //     .addEventListener("keyup", function (e) {
    //         if (e.code === 'Enter') {
    //             document.getElementById("searchbtn").click();
    //         }
    //     })
}


function clickDetails({ target }) {
    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value

    if (target === detailcards) return;

    if (target.matches(".save")) {

        localStorage.setItem("comment" + target.id, inputcomment)
        localStorage.setItem("writter" + target.id, writtercomment)
        localStorage.setItem("password" + target.id, passwordcomment)
        location.reload();
    }
    else if (target.matches(".edit")) {
        if ((passwordcomment == localStorage.getItem("password" + target.id)) && (writtercomment == localStorage.getItem("writter" + target.id))) {
            localStorage.setItem("comment" + target.id, inputcomment)
            location.reload();
        }
        else if (writtercomment !== localStorage.getItem("writter" + target.id)) { alert("작성자가 일치하지 않습니다.") }
        else if (passwordcomment !== localStorage.getItem("password" + target.id)) { alert("비밀번호가 일치하지 않습니다.") }
    }
    else if (target.matches(".delete")) {
        if ((passwordcomment == localStorage.getItem("password" + target.id)) && (writtercomment == localStorage.getItem("writter" + target.id))) {
            localStorage.removeItem("comment" + target.id)
            localStorage.removeItem("writter" + target.id)
            localStorage.removeItem("password" + target.id)
            location.reload();
        }
        else if (writtercomment !== localStorage.getItem("writter" + target.id)) { alert("작성자가 일치하지 않습니다.") }
        else if (passwordcomment !== localStorage.getItem("password" + target.id)) { alert("비밀번호가 일치하지 않습니다.") }
    }

}
