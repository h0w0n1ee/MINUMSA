// 민음사 스크립트

$(document).ready(function(){
  // 내비게이션
  // 변수선언
  let gnb = $('header .gnb > ul > li > a');

  gnb.click(function(){
    $(this).next().toggle().parent().siblings().find('.sub').hide();
  });

  $('main').click(function(){ // 메인 클릭 시, 서브 숨기기
    $('.sub').hide();
  });

    // 모바일 토글버튼 모양 변경
    $('#toggle').click(function(){
      $('#toggle span:nth-child(2)').toggle();
      $('#toggle span:first-child').toggleClass('rotate1');
      $('#toggle span:last-child').toggleClass('rotate2');
      $(this).toggleClass('bgcolor');
      $('header nav').toggle();
    }); 


    // **********

    // 2. 유튜브/블로그 컨텐츠
      // 1 ~ 4까지 나오게 하기 위해 쓰임 (랜덤) 
    let ran_n = Math.random()*4+1;
      // random이 소수점으로 나오기 때문에 floor로 반올림 해서 사용하기 위해 쓰임 
    let flo_n = Math.floor(ran_n);

    let url1 = 'https://blog.naver.com/minumworld/223326119685'; // 재난에 맞서는 과학
    let url2 = 'https://blog.naver.com/minumworld/223319010463'; // 제 4의 벽
    let url3 = 'https://blog.naver.com/minumworld/223315974360'; // 글쓰는 여자들의 특별한 친구
    let url4 = 'https://blog.naver.com/minumworld/223290147124'; // 타다문구점

    if(flo_n==1){
      $('.media_blg a').attr('href',url1);
    }else if(flo_n==2){
      $('.media_blg a').attr('href',url2);
    }else if(flo_n==3){
      $('.media_blg a').attr('href',url3);
    }else{
      $('.media_blg a').attr('href',url4);
    }

    document.getElementById('blg_img').src="./img/blog_img0"+flo_n+".png";

    // **********


  // 탭메뉴 컨텐츠 구현
  $('.con').eq(0).show();
  let tab_mnu = $('.tab_con_wrap > li > a');

  tab_mnu.click(function(){
    $(this).next().show().parent().siblings().find('.cont').hide();
    $(this).addClass('t_act').parent().siblings().find('a').removeClass('t_act');

    return false;
  });

  
  // 탭메뉴 : 컨트롤 버튼
  let con = 0;
  const tab_cbtn = $('.tab_con .new_ctrl_btn > .c_btn');


  tab_cbtn.click(function(){
    con = $(this).index();
    console.log(con);
    con = -(con*240);
    console.log(con);

    $('.tab_con_wrap li .cont ul').animate({'left':con},500);
    // $('.best > .cont > ul').animate({'left':con},500);

    $('.tab_con_wrap > li > .cont > .new_ctrl_btn > span').removeClass('.new_ctrl_btn > c_act');
    $(this).addClass('.new_ctrl_btn > c_act');
  });



  // **********


  // 민음사 멤버십 슬라이드 구현
  const eslide = $('.es_wrap');
  const es_lbtn = $('.event i.fa-angle-left');
  const es_rbtn = $('.event i.fa-angle-right');

  //1번 슬라이드의 앞에 3번을 배치한다.
  $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');

  //왼쪽으로 1200픽셀 이동하여 1번이 가운데 배치가 되게 한다.
  eslide.css('margin-left','-120%');

  //moveleft함수
  function moveLeft(){
    eslide.animate({'margin-left':'-240%'},500, function(){
      $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
      eslide.css('margin-left','-120%');
    });
  }
  //시간객체를 사용하여 8초마다 움직이도록 한다.
  let Timer2 = setInterval(moveLeft, 8000);

  //moveright함수
  function moveRight(){
    eslide.animate({'margin-left':'0px'},500, function(){
      $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
      eslide.css('margin-left','-120%');
    });
  }

  // 좌측버튼 클릭시 
  es_lbtn.click(function(){
    clearInterval(Timer2);
    moveLeft();
  });

  //우측버튼 클릭시
  es_rbtn.click(function(){
    clearInterval(Timer2);
    moveRight();
  });

  //좌, 우 버튼 마우스 아웃시 다시 시간을 생성해서 움직이게
  $('.event i.fas').mouseleave(function(){
    Timer2 = setInterval(moveLeft, 8000);
  });


  // **********


  // 7. 모달윈도(팝업레이어)
  let popup = `
  <div class="modal">
  <div class="banner">
    <div class="banner_box">
      <a href="javascript:;" title="이벤트">
        <img src="./img/modal_img.jpg" alt="이미지">
      </a>

      <div class="banner_text">
        <div class="banner_chkbox">
          <input type="checkbox" id="modal_chk">

          <label for="modal_chk">오늘 하루 열지 않음</label>
        </div>
        <input type="button" value="닫기" id="modal_cbtn">
      </div>
      
    </div>
  </div>
</div>
`
$('body').append(popup);

    if($.cookie('popup')=='none'){
      $('.modal').hide();
    }

    let $ex = $('.modal #modal_chk');

    function closePopup(){
      if($ex.is(':checked')){
        $.cookie('popup', 'none', {expires:1, path:'/'});
      }
      $('.modal').hide();
    }

    $('.modal #modal_cbtn').click(function(){
      closePopup();
    });


  // ******* 푸터
  // 윈도우 세로 스크롤값을 구하여
  $(window).scroll(function(){
    let s_pos = $(this).scrollTop();
    console.log(s_pos); // 세로 스크롤값 체크

    // 800px 이상일 때~ top버튼을 보이게 하고,
    if(s_pos>=800){
      $('.t_btn').fadeIn();
    }else{ // 그렇지 않으면? top버튼을 숨기게 한다!
      $('.t_btn').fadeOut();
    }
  });

  // .t_btn 클릭 시, 페이지 상단으로 올라감~~
  $('.t_btn').click(function(){
    $('html, body').animate({'scrollTop':'0px'},500);
    return false;
  });













  });