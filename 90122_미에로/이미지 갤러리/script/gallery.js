//갤러리 스크립트

$(document).ready(function(){


    //탭메뉴 서식
    const g_nav = $('.g_navi ul li a');

    g_nav.click(function(){
        //선택한a에 act서식 적용,부모의 다른형제의 자식 a태그는 act서식 제거
        $(this).addClass('act').parent().siblings().find('a').removeClass('act');
    });
    


    //이미지목록에 hover시 caption 나타나게
    const g_list = $('.g_list li a');

    g_list.mouseenter(function(){
        $(this).find('.caption').stop().animate({'bottom':'0px'},300);
    });
    g_list.mouseleave(function(){
        $('.caption').stop().animate({'bottom':'-40px'},300);
    });



    //전체메뉴 클릭시 .total 모두 보이게
    const total_btn = $('.g_navi ul li:first-child a');
    const plan_btn = $('.g_navi ul li:nth-child(2) a');
    const disign_btn = $('.g_navi ul li:nth-child(3) a');
    const ui_btn = $('.g_navi ul li:nth-child(4) a');
    const coding_btn = $('.g_navi ul li:last-child a');

    total_btn.click(function(){
        $('.total').hide(); /* hide 넣기 */
        $('.total').fadeIn();
    });



    //기획 클릭시 .plan 보이게
    plan_btn.click(function(){
        $('.total').hide();
        $('.plan').fadeIn();
    });

    //설계 클릭시 .disign 보이게
    disign_btn.click(function(){
        $('.total').hide();
        $('.disign').show();
    });

    //디자인 클릭시 .ui 보이게
    ui_btn.click(function(){
        $('.total').hide();
        $('.ui').fadeIn();
    });

    //개발 클릭시 .coding 보이게
    coding_btn.click(function(){
        $('.total').hide();
        $('.coding').fadeIn();
    });



    //이미지목록 a클릭시 href값 담아서 모달창띄우기
    g_list.click(function(){
        let img_src = $(this).attr('href');
        let title = $(this).find('span').text();//span태그안의 내용을 가져온다
        let i = $(this).parent().index()+1; //li(부모)의 인덱스값(0)+1

        console.log(img_src);
        console.log(title);
        console.log(i);

        
        let modal =`
            <div class="modal">
                <div class="center">
                    <h3>${title}</h3>
                    <img src = ${img_src} alt="">
                    <i class="fas fa-times"></i>
                    <i class="fas fa-angle-left"></i>
                    <i class="fas fa-angle-right"></i>
                    <span class="p_num">${i}/12</span>      
                </div>
            </div>`;

        //body태그 맨뒤에 modal 변수값 추가하기
        $('body').append(modal);

    
        //닫기버튼 클릭시 모달창 숨기기
        $('.modal > .center > .fa-times').click(function(){
            console.log('닫기');
            $('.modal').hide();
        });
    
        //좌우버튼 클릭시 각각 함수 넣기
        $('.modal i.fa-angle-left').click(function(){
            if(i == 1){
                i=12;
            }else{
                i--;
            }
            console.log(i); //1,12,11,10,9,...
            dataChange(i);
        });
        $('.modal i.fa-angle-right').click(function(){
            if(i == 12){
                i=1;
            }else{
                i++;
            }
            console.log(i); //1,2,3,4,5,....
            dataChange(i);
        });

        //좌우버튼 클릭시 i값 함수 넘겨받기(제목/이미지/페이지번호 변경)
        function dataChange(i){

            //페이지번호
            $('.p_num').text(i+'/12');

            //제목 텍스트값 변경
            $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text()); //li인덱스가 0~11까지 있어서 eq에 -1 추가
            
            //이미지변경
            if(i==4||i==9||i==11){  //png일때
                $('.modal img').attr('src','./images/img'+i+'.png');
            }else{
                $('.modal img').attr('src','./images/img'+i+'.jpg');
            }
        }

        
        return false;

    }); 



});