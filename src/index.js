import { lovefunc, dellove } from "./lovefunc.js";
import { searchfunc } from "./search.js";
import { desktopSwitch, mobileSwitch } from "./switch.js";
import "./enter.js";

export const cards = document.querySelector(".cards");
export let m = new Map();
export let movies = [];

let rows = [];

document.addEventListener("DOMContentLoaded", load);

const home = document.getElementById("home");
home.addEventListener("click", load);

const searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", searchfunc);

const allchart = document.getElementById("allchart");
allchart.addEventListener("click", load);

const mychart = document.getElementById("mychart");
mychart.addEventListener("click", my);

const mobilebtn = document.getElementById("mobilebtn");
mobilebtn.addEventListener("click", mobileSwitch);

const desktopbtn = document.getElementById("desktopbtn");
desktopbtn.addEventListener("click", desktopSwitch);

function load() {

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
            document.getElementById("cards").innerHTML = ""
            rows = data['results']


            movies = rows.map(function movielove(movie) { return { ...movie } })

            for (let i = 0; i < movies.length; i++) {
                let movieid = movies[i]['id']
                if (!(localStorage.getItem(movieid))) {
                    localStorage.setItem(movieid, 'b');
                }
                else {
                    if (!m.get(movieid)) {
                        m.set(movieid, '');
                    }
                    movies[i].love = m.get(movieid)
                    localStorage.setItem(movieid, localStorage.getItem(movieid) + m.get(movieid));
                    movies[i].loverank = localStorage.getItem(movieid)
                }
            }


            movies.sort(function (a, b) {


                if (b.vote_average === a.vote_average) {


                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0;
                    }


                } else {
                    return b.vote_average - a.vote_average;
                }
            });


            cards.innerHTML = movies
                .map(function append(movie) {
                    return (`<div class= "card">
                    <div class = "buttons">
                    <button class = "lovebtn" id="${movie.id}" type="button">♥︎</button>
                    <button class="deletelove" id="${movie.id} type="button">⟲</button>
                    </div>
                    <div class="cardbody" id="${movie.id}" >
                    <p class="alltime" id="${movie.id}">${((localStorage.getItem(movie.id)).length) - 1} times loved this movie</p>  
                    <img class="allimg" id="${movie.id}"  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                    <p class="allrank" id="${movie.id}" >${movies.indexOf(movie) + 1}</p>
                    <p class="allvote" id="${movie.id}"  >★ ${movie.vote_average}</p>  
                    <h4 class="alltitle" id="${movie.id}" >${movie.title}</h4>
                            
                </div>
                </div>`)
                })
                .join("")
            cards.addEventListener("click", clickAllChart)
        })
};

function clickAllChart({ target }) {

    if (target === cards) return;

    if (target.matches(".lovebtn")) {
        lovefunc(target.id);
        load();
        location.reload();
    }
    else if (target.matches(".deletelove")) {
        dellove(parseInt(target.id));
        load();
        location.reload();
    }
    else if (target.matches(".cardbody, .alltime, .allimg, .alltitle, .allvote")) {
        alert(`영화 ID : ${target.id}`);
    }

}


function my() {

    document.getElementById("cards").innerHTML = ""

    for (let i = 0; i < movies.length; i++) {
        movies[i].love = m.get(movies[i]['id'])
        if (!movies[i].love) { movies[i].love = 0 }
    }


    movies.sort(function (a, b) {

        if (b.loverank.length === a.loverank.length) {

            if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            } else {
                return 0;
            }

        } else {
            return b.loverank.length - a.loverank.length;
        }
    })


    cards.innerHTML = movies
        .map(function append(movie) {
            if ((localStorage.getItem(movie.id)).length > 1) {
                return (`<div class= "card">
                <div class="cardbody" id="${movie.id}" >
                <p class="alltime" id="${movie.id}" >${((localStorage.getItem(movie.id)).length) - 1} times loved this movie</p>  
                <img class="allimg" id="${movie.id}"   src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
                <p class="allrank"  id="${movie.id}" >${movies.indexOf(movie) + 1}</p>
                <p class="allvote" id="${movie.id}" >★ ${movie.vote_average}</p>  
                <h4 class="alltitle"  id="${movie.id}" >${movie.title}</h4>
                        
            </div>
            </div>`)
            }
        })
        .join("")
}


