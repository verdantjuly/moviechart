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
            rows.forEach((a) => {
                let id = a['id']
                let title = a['title']
                let poster_path = "https://image.tmdb.org/t/p/w300" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
        

                let temp =

                    `<div class="card" onclick = alert("${id}")>
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                            </div>
                    </div>`
                document.getElementById("cards").insertAdjacentHTML('beforeend', temp);

            })

        }
        )
    document.getElementById("search")
        .addEventListener("keyup", function (e) {
            if (e.code === 'Enter') {
                document.getElementById("searchbtn").click();
            }
        });
};
