let m = new Map()
let sortm = []
let rankarray = []
let rank = 0

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
            let rows = data['results']
            document.getElementById("cards").innerHTML = ""
            rows.forEach((a) => {

                let id = a['id']
                let title = a['title']
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                rankarray.push(id)
                rank = rankarray.indexOf(id) + 1
                let love = m.get(id)
                if (!love) { love = 0 }
                let temp =
                    ` <div class = "card">
                    <button id="lovebtn" onclick="love(${id}),load()" type="button">♥︎</button>
                <p class="love">${love} times loved this movie</love>
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")' >
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <p class = "rank"> ${rank} </p>
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                            </div>
                    </div>`

                document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
            })

        }
        )


};


function anime() {
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
            rank = 0
            document.getElementById("cards").innerHTML = ""
            rankarray = []
            rows.forEach((a) => {
                let id = a['id']
                let title = a['title']
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                let genre = a['genre_ids']
                if (genre.includes(16)) { rankarray.push(id) }
                rank = rankarray.indexOf(id) + 1
                let love = m.get(id)
                if (!love) { love = 0 }
                let temp =

                    ` <div class = "card">
                    <button id="lovebtn" onclick="love(${id}),anime()" type="button">♥︎</button>
                <p class="love">${love} times loved this movie</love>
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")' >
                        <img src="${poster_path}"
                            class="poster_path">
                                    <div class="card-body">
                                        <p class = "rank"> ${rank} </p>
                                        <h4 class="cardtitle">${title}</h4>
                                        <p class = "vote_average">★ ${vote_average}</p>
                                        <p class="overview">${overview}</p>
                                </div>
                        </div>`
                if (genre.includes(16)) {
                    document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
                }

            })

        }
        )

}


function mychart() {
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
            
            let rows = data['results']          
            rankarray = []
           
            for (i = 0; i < rows.length; i++) {
                if (!love) { rows[i].love = 0 }
                else {rows[i].love = m.get(rows[i]['id'])}
            }
            rows.sort(function compare(a, b) {
                return b.love - a.love;
              });
            
            rows.forEach((a) => {
                
                let id = a['id']
                let title = a['title']
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                let love = m.get(id)
                if(love>0){
                rankarray.push(id)
                rank = rankarray.indexOf(id) + 1}

                let temp =
                    ` <div class = "card">
                    <button id="lovebtn" onclick="love(${id}),mychart()" type="button">♥︎</button>
                <p class="love">${love} times loved this movie</love>
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")' >
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <p class = "rank"> ${rank} </p>
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                            </div>
                    </div>`

                if (love > 0) { document.getElementById("cards").insertAdjacentHTML('beforeend', temp) }
            })
            
        }
        )


};
