let m = new Map() // 전역변수 m에 새 Map을 담아보자.
let rankarray = [] //전역변수 rankarray에 빈 배열을 세팅하자. 영화 순위를 담는 배열이다.
let rank = 0 //전역변수 rank를 0으로 초기화하자. 영화 순위이다.

function load() { //load() 함수 : h1 Moviechart 타이틀과 allchart 버튼을 누르면 작동하며 body를 켜면 실행된다.
    const options = {
        method: 'GET', //GET 메서드
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTE5ZjU0OTI3NWEyM2VjNjViNTRkZmQ2MTUyYTA4NiIsInN1YiI6IjY0NzA4YTllNzcwNzAwMDBhOTQ3ZDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3W-E9KnuKEWvia4zXrXpCRKfHz9a5clH7RjrUwJD8iY'
        } // Authorization : 토큰
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options) // fetch에 options를 더해서 작동한다.
        .then(response => response.json()) //json 방식으로 응답해 줘. 여기서 response는 매개변수로 이름을 바꿔도 작동한다.
        .then(data => { // then : 비동기 처리가 끝난 다음에 처리할 일을 정의할 수 있다.
            // 비동기 처리 : 특정 로직의 실행이 끝날때까지 기다려주지 않고 나머지 코드를 먼저 실행하는것
            rankarray = [] //rankarray 초기화 
            rank = 0 //rank 초기화 
            let rows = data['results'] //data의 results 값을 변수 rows에 담는다.
            let populararray = [] //popularity 수치를 담을 빈 배열을 준비한다.
            for (i = 0; i < rows.length; i++) { //for문을 인덱스 0부터 rows.length까지 돌린다.
                populararray.push(data['results'][i]['popularity']) //popularity를 API 순서대로 모은 배열을 만든다.
                let popular = populararray.map(function (item) {
                    return Math.floor(item); //map을 통해 소수점을 내림하여 제거해 준다.
                })

                if(!rows[i].showpopularity){//rows의 i번째 인덱스에 showpopularity가 없으면
                rows[i].showpopularity = popular[i]}   //rows의 i번째 인덱스에 showpopularity 를 popular[i] 값으로 바꿔준다.
            }
            document.getElementById("cards").innerHTML = "" //cards 안에 있는 모든 것을 지운다. 
            rows.forEach((a) => {  //rows를 기준으로 forEach 반복문을 돌린다.
                let id = a['id'] // 영화 id
                let title = a['title'] // 영화 제목
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path'] // 영화 포스터 이미지 경로
                // 기본 주소값을 String으로 주고 w500은 weight, 시도 결과 일정 크기 미만은 엑박 오류가 난다.) 
                // 뒤에 경로를 API에서 찾아서 붙여 준다.
                let overview = a['overview'] // 영화 줄거리
                let vote_average = a['vote_average'] // 평점
                let showpopularity = a['showpopularity'] //인기도
                rankarray.push(id)
                // 초기의 API는 평점 순으로 정리되어 있다. 평점 순으로 id를 rankarray 배열에 push 한다.
                rank = rankarray.indexOf(id) + 1
                // rankarray의 인덱스가 순위가 된다. 인덱스이므로 0부터 시작하여 편의상 1을 더해서 1부터 내림차순으로 세게 만든다.
                let love = m.get(id)
                // love에 Map m에서 얻어온 id에 대한 value, 즉 하트 클릭 수를 담는다. 
                if (!love) { love = 0 } // 만약 love가 false이면 love에 0을 담는다.
                let temp = //백틱 안에 카드 내용을 작성한다. 이게 하나의 카드 양식이다.
                    ` <div class = "card">
                    <button id="lovebtn" onclick="love(${id}),load()" type="button">♥︎</button> 
                <p class="love">${love} times loved this movie</p> 
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")' > 
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <p class = "rank"> ${rank} </p>
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="showpopularity">popularity : ${showpopularity}</p>
                                    <p class="overview">${overview}</p>
                                    
                            </div>
                    </div>`
                //하트 버튼을 누르면 love(id)와 load()가 연쇄적으로 작동한다. love(id)로 클릭 수를 저장하고 load로 화면을 다시 띄워 표시한다.
                //카드를 클릭하면 영화 ID를 alert로 알려 준다.
                //${}를 이용하여 백틱 안에 변수들을 차곡차곡 넣어 준다.

                document.getElementById("cards").insertAdjacentHTML('beforeend', temp);
                //cards라는 id를 가진 곳이 끝나기 전에 temp를 붙인다.
                //forEach안에 있으므로 연속해서 붙인다.
            })

        }
        )


};


function anime() { //anime 함수이다. 애니메이션 차트를 소환한다. 위의 load()와 중복되는 설명은 생략한다.
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
            rankarray = []
            rank = 0
            let populararray = [] //popularity 수치를 담을 빈 배열을 준비한다.
            for (i = 0; i < rows.length; i++) { //for문을 인덱스 0부터 rows.length까지 돌린다.
                populararray.push(data['results'][i]['popularity']) //popularity를 API 순서대로 모은 배열을 만든다.
                let popular = populararray.map(function (item) {
                    return Math.floor(item); //map을 통해 소수점을 내림하여 제거해 준다.
                })

                if(!rows[i].showpopularity){//rows의 i번째 인덱스에 showpopularity가 없으면
                rows[i].showpopularity = popular[i]}   //rows의 i번째 인덱스에 showpopularity 를 popular[i] 값으로 바꿔준다.
            }
            rows.forEach((a) => {
                let id = a['id']
                let title = a['title']
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                let genre = a['genre_ids']
                let showpopularity = a['showpopularity'] //인기도
                if (genre.includes(16)) { rankarray.push(id) } // TMDB의 애니메이션 장르 ID는 16이다. 
                // 장르 아이디에 16을 포함하면 rankarray에 해당 id를 push 한다.
                rank = rankarray.indexOf(id) + 1
                // 애니메이션만 rankarray에 모여있기 때문에 애니메이션 안에서 순위가 정해진다.
                let temp =

                    ` <div class = "card">
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")' >
                        <img src="${poster_path}"
                            class="poster_path">
                                    <div class="card-body">
                                        <p class = "rank"> ${rank} </p>
                                        <h4 class="cardtitle">${title}</h4>
                                        <p class = "vote_average">★ ${vote_average}</p>
                                        <p class="showpopularity">popularity : ${showpopularity}</p>
                                        <p class="overview">${overview}</p>
                                </div>
                        </div>`
                if (genre.includes(16)) { //장르아이디에 16 (애니메이션)을 포함하면
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

            let populararray = [] //popularity 수치를 담을 빈 배열을 준비한다.
            for (i = 0; i < rows.length; i++) { //for문을 인덱스 0부터 rows.length까지 돌린다.
                populararray.push(data['results'][i]['popularity']) //popularity를 API 순서대로 모은 배열을 만든다.
                let popular = populararray.map(function (item) {
                    return Math.floor(item); //map을 통해 소수점을 내림하여 제거해 준다.
                })

                if(!rows[i].showpopularity){//rows의 i번째 인덱스에 showpopularity가 없으면
                rows[i].showpopularity = popular[i]}   //rows의 i번째 인덱스에 showpopularity 를 popular[i] 값으로 바꿔준다.
            }

            for (i = 0; i < rows.length; i++) {//0부터 rows의 length 전(19)까지 for문을 돌린다
                let love = m.get(rows[i]['id']) //love 변수에 id값에 해당하는 love 횟수를 담는다.
                if (!love) { rows[i].love = 0 } //love가 false이면 rows의 i번째 요소의 love는 0이다.
                else { rows[i].love = m.get(rows[i]['id']) } // 그외에는 rows의 i번째 요소의 love는 해당 id의 love 값이다.
                // love를 누르지 않으면 false가 발생한다. 
                // 즉, love를 안 누르면 love가 0이고
                // love를 누르면 누른 횟수가 rows에 json 방식으로 추가된다.
            }

            rows.sort(function compare(a, b) { // rows의 데이터를 love 즉, 하트 클릭 횟수 내림차순으로 정렬한다.
                return b.love - a.love;
            });
            console.log(rows)
            rows.forEach((a) => {

                let id = a['id']
                let title = a['title']
                let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path']
                let overview = a['overview']
                let vote_average = a['vote_average']
                let showpopularity = a['showpopularity'] //인기도
                let love = m.get(id)
                if (love > 0) { //love를 누른 적이 있다면 love가 0보다 크다. 즉, love를 누른적이 있다면
                    rankarray.push(id) //rankarray에 해당 id를 push 한다. 이때 rankarray에는 love를 누른 id들만 담긴다.
                    rank = rankarray.indexOf(id) + 1
                } //rank를 love를 누른 영화들 사이에서 다시 정한다.

                let temp =
                    ` <div class = "card">
                    <button id="lovebtn" onclick="love(${id}),mychart()" type="button">♥︎</button> 
                <p class="love">${love} times loved this movie</p>
                    <div class="card-body" onclick = 'alert("영화 ID : ${id}")' >
                    <img src="${poster_path}"
                        class="poster_path">
                                <div class="card-body">
                                    <p class = "rank"> ${rank} </p>
                                    <h4 class="cardtitle">${title}</h4>
                                    <p class = "vote_average">★ ${vote_average}</p>
                                    <p class="showpopularity">popularity : ${showpopularity}</p>
                                    <p class="overview">${overview}</p>
                            </div>
                    </div>`
                //lovebtn을 누르면 love(id)와 mychart() 함수가 연쇄적으로 실행된다.
                // 즉, mychart 내에서 하트를 누를 시에도 순위 변경이 가능하다.
                if (love > 0) { document.getElementById("cards").insertAdjacentHTML('beforeend', temp) }
                // love를 누른 카드만 cards가 끝나기 전에 붙인다.
            })

        }
        )


};
