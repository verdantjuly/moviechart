function search() {
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
            let searchString = document.querySelector("#search").value
            let upperSearch = searchString.toUpperCase()
            let noarray = []
            let rankarray = []
            for (i = 0; i < rows.length; i++) {
                noarray.push(rows[i]['title'].toUpperCase())
            }
            let filteredtitlearray = noarray.filter(function (item) {
                return item.includes(upperSearch)
            })
            if(filteredtitlearray.length==0){
                alert("찾으시는 영화가 없습니다!")
            }
            if (searchString == false) {
                    alert("검색어를 입력하세요!")
                }
                
            rows.forEach((a) => {
                let title = a['title']
                let uppperTitle = title.toUpperCase()
                let poster_path = "https://image.tmdb.org/t/p/w300" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                let id = a['id']
                rankarray.push(id)
                let rank = rankarray.indexOf(id) +1

                let temp =
                    `<div class="card" onclick = 'alert("영화 ID : ${id}")'>
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <p class = "rank"> ${rank} </p>
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="overview">${overview}</p>
                            </div>
                    </div>`
                if (uppperTitle.includes(upperSearch)) {
                    document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
                }
            })


        }
        )


}