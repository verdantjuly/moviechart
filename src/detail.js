let movies = []
const detailcards = document.querySelector(".detailcards");
const detailhome = document.getElementById("detailhome");
const reviewcontent1 = document.querySelector("#reviewcontent1");
const reviewcontent2 = document.querySelector("#reviewcontent2");
const reviewcontent3 = document.querySelector("#reviewcontent3");
const writter1 = document.querySelector("#writter1");
const writter2 = document.querySelector("#writter2");
const writter3 = document.querySelector("#writter3");
let writterarray = []
let writterarrayjson = []

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

                        // let commentview1 =
                        //     let writterview1 =
                        //         let commentview2 =
                        //         let writterview2 =
                        //         let commentview3 =
                        //         let writterview3 = 

                        // if (!commentview1) { commentview1 = "" }
                        // if (!commentview2) { commentview2 = "" }
                        // if (!commentview3) { commentview3 = "" }
                        // if (!writterview1) { writterview1 = "" }
                        // if (!writterview2) { writterview2 = "" }
                        // if (!writterview3) { writterview3 = "" }

                        return `
                        
                        
                        <div class= "card">
                        
                        <img class="allimg" id="${movie.id}"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                        <div class="cardbody" id="${movie.id}" >
                        <h1 class="alltitle"  id="${movie.id}" >${movie.title}</h1>
                        <p class="alltime" id="${movie.id}" >${((localStorage.getItem(movie.id)).length) - 1} people loved this movie</p>  
                        <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p>  
                        <p class="overview" id="${movie.id}" >${movie.overview}</p>  
                   
                   
                   
                   <input id="comment" placeholder="please leave short review" autocomplete="off" autofocus></input>
                        <div class = "login">
                   <input id="writter" placeholder="id" autocomplete="off" >
                       <input type="password" id="password" placeholder="password" autocomplete="off" >
                       </div>
                       <div class = "buttons">
                   <button class="save" id="${movie.id}" type="button">Save</button>
                   <button class="edit" id="${movie.id}" type=" button">Edit</button>
                   <button class="delete" id="${movie.id}" type=" button">Delete</button>
              </div>
                 
                  </div> 
           
                    `
                    }
                    detailcards.addEventListener("click", clickDetails)
                }).join("")

            console.log(writtersarray)

        })
}

let writtersarray = (localStorage.getItem(sendid + 'writters')).split("|")
writter1.innerHTML = writtersarray[writtersarray.length - 1]
writter2.innerHTML = writtersarray[writtersarray.length - 2]
writter3.innerHTML = writtersarray[writtersarray.length - 3]
reviewcontent1.innerHTML = localStorage.getItem(writtersarray[writtersarray.length - 1] + sendid + "input")
reviewcontent2.innerHTML = localStorage.getItem(writtersarray[writtersarray.length - 2] + sendid + "input")
reviewcontent3.innerHTML = localStorage.getItem(writtersarray[writtersarray.length - 3] + sendid + "input")

function clickDetails({ target }) {

    let inputcomment = document.querySelector("#comment").value
    let writtercomment = document.querySelector("#writter").value
    let passwordcomment = document.querySelector("#password").value


    if (target === detailcards) return;

    if (target.matches(".save")) {
        localStorage.setItem(writtercomment + sendid + "input", inputcomment)
        localStorage.setItem(writtercomment + sendid + "pw", passwordcomment)
        if (!localStorage.getItem(sendid + 'writters')) { localStorage.setItem(sendid + 'writters', "|") }
        localStorage.setItem(sendid + 'writters', localStorage.getItem(sendid + 'writters') + "|" + writtercomment)
        localStorage.setItem('admin' + sendid, 'clear')
        location.reload()
    }
    else if (target.matches(".edit")) {
        if (passwordcomment == localStorage.getItem(writtercomment + sendid + "pw")) {
            localStorage.setItem(writtercomment + sendid + "input", inputcomment)
            location.reload()
        }
        else if (passwordcomment !== localStorage.getItem(writtercomment + sendid + "pw")) { alert("비밀번호가 일치하지 않습니다.") }
    }
    else if (target.matches(".delete")) {
        if (passwordcomment == localStorage.getItem('admin' + sendid) && (writtercomment == 'admin' + sendid)) {
            localStorage.removeItem(writtercomment + sendid + "input");
            localStorage.removeItem(writtercomment + sendid + "pw");
            localStorage.removeItem(sendid + 'writters');
            writtersarray = []
            location.reload()

        }
        else if (passwordcomment !== localStorage.getItem('admin' + sendid) || (writtercomment == 'admin' + sendid)) { alert("정보가 일치하지 않습니다. 운영자만 삭제할 수 있습니다.") }
    }

}
