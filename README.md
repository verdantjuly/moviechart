# 📽️ moviechart ![JS](https://i.postimg.cc/fR98fWb2/2023-05-22-11-55-16.png)

20230606 codereview feedback

1. 기능별 함수 분리 : 현재는 target.id를 가져올 수 있는 대안이 없으므로 구현하지 못함.
2. sort 의 parameter 네이밍 prev, next : compelete
3. 이벤트의 범위 : target.id를 가져올 수 없어서 수정하지 못함.
4. if (b.love.length === a.love.length) : 정렬 순서 1. 좋아요 2. 제목의 알파벳 순서
5. my() 함수 : loved() 로 수정
6. 좋아요에 숫자를 넣지 않고 문자를 채우는 이유. : parseInt가 작동하지 않았습니다. 현재 Number로 변경하였습니다.
   현재는 좋아요가 숫자로 작동됩니다.
7. 반응형 CSS : 조만간 진행하겠습니다....

리뷰해 주셔서 감사합니다! 덕분에 많이 수정하고 알아갑니다.
