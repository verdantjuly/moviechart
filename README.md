# 📽️ moviechart ![JS](https://i.postimg.cc/fR98fWb2/2023-05-22-11-55-16.png)
https://verdantjuly.github.io/moviechart/

## 주요기능
### 좋아요
하트를 누르면 좋아요 숫자가 올라갑니다. (0 times loved this movie)
저장된 좋아요는 map 객체로 해당 영화 id와 함께 저장됩니다.
좋아요를 한 번 누를 때 마다 각 차트를 로드하는 함수를 재실행하여 숫자를 업데이트합니다.
mychart 에서 좋아요 숫자가 큰 순으로 순위를 재정렬합니다.
주의 : search 에서는 좋아요를 작동할 수 없습니다. movies를 공유하지 않고 API 그 자체인 rows를 사용하기 때문입니다.

### animation chart
애니메이션 장르만을 볼 수 있는 차트입니다.
차트 내 순위가 재정렬 됩니다.

### search
검색한 결과를 볼 수 있습니다.
대소문자를 구별하지 않으며, 검색어를 포함하는 제목을 가진 영화를 모두 보여 줍니다.
검색 버튼을 누르거나 Enter 키를 눌러 작동할 수 있습니다.
웹사이트를 시작하면 autofocus를 이용하여 커서가 자동으로 search input 창에 위치됩니다.

### mobile - desktop version
사용하는 기기에 따라 다른 CSS파일을 index.html 에 연결합니다.
버튼으로 모바일과 데스크탑 버전을 바꿀 수 있습니다. 

### 영화 id
각 카드를 누르면 해당하는 영화 id 를 출력합니다.





