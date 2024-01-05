//외부스크립트 slide.js

//1.변수선언

const slide = document.querySelector('.slide');
//상품목록의 부모요소


const slide_img = document.querySelectorAll('.slide li');
//상품목록


const l_btn = document.getElementById('l_btn');//이전버튼
const r_btn = document.getElementById('r_btn');//다음버튼

const stop_btn = document.querySelector('.fa-stop');//멈춤버튼
const play_btn = document.querySelector('.fa-play');//플레이버튼


const img_n = slide_img.length;  //li 개수 = 5
console.log(img_n);

const img_w = 360;  //상품사진width : 360px
const m = 60;       //margin : 60px
const s_count = 3;  //한페이지에 보여질 상품 개수

let count = 0;      //이전,다음 클릭시 사용할 변수값설정

slide.style.width = (img_w+m)*img_n-m+'px';//또는 '%'로 바꿈
//(360+60)*5-60 = 2040px





//왼쪽으로 움직이는 슬라이드 함수
function mslide(n){
    slide.style.left = (img_w+m)*-n+'px';
    count=n;
    console.log(count);  //2 1 0 순으로 나옴
    console.log(slide.style.left); 
    // -360+60*1 = -420
    // -360+60*2 = -840
    // -360+60*3 = -0
};



//2. 이전버튼 : 왼쪽으로 움직이는 슬라이드 함수 작성
l_btn.addEventListener('click', function(){
    if(count>0){             //count값이 0보다 크면
        mslide(count-1);     //count값에 1을 빼서 mslide에 넘김
    }else{
        mslide(img_n-s_count);//li개수 = 3
    }
    //2.1.0순
});

//3. 다음버튼 : 오른쪽으로 움직이는 슬라이드 함수 작성
r_btn.addEventListener('click', function(){
    if(count<img_n-s_count){   //0보다 li개수가 많다면
        mslide(count+1);       //0+1해서 넘김
    }else{
        mslide(0);             //0을대입해서 처음으로 돌아가게함
    }
    //1.2.0순
});


//4. 오토슬라이드 : 3초마다 자동으로 mslide함수 호출
//   시간객체 = setInterval(함수명,반복시간)
let Timer = setInterval(function(){
    console.log('반복호출');
    if(count==2){
        count=0;
    }else{
        count++;
    }
    mslide(count);//mslide에 count값을 넘겨준다
},3000);


//5. 멈춤버튼 : event로 시각객체 없애기
stop_btn.addEventListener('click', function(){
    clearInterval(Timer);
})

//6. 플레이버튼 : 시각객체 다시시작 (let빼고넣기:전역변수!!!)
play_btn.addEventListener('click', function(e){//e = 중복현상제거

    //춤추기멈춤.. 
    //기존 자동재생이 되고 있다면 제거하고
    clearInterval(Timer);

    //3초마다 움직이게함
    Timer = setInterval(function(){
        console.log('반복호출');
        if(count==2){
            count=0;
        }else{
            count++;
        }
        mslide(count);//mslide에 count값을 넘겨준다
    },3000);


    //클릭을 몇번해도 한번만 실행되게 이벤트중복현상제거 : function(e)
    e.preventDefault();
});