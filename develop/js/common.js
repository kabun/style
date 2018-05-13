$(function(){
  // 初期化
  // mainの表示幅変更用
  var $subNavSwitch = $(".sub-nav__switch");
  var $main = $(".main");
  var $subNav = $(".sub-nav ");

  // サブメニュースイッチ出し分け
  $subNavSwitch.on('click',function(){
    console.log("aaa")
    $(this).toggleClass('none-sub-nav');
    if ($subNavSwitch.hasClass('none-sub-nav')){
      $(this).text(">");
    }else{
      $(this).text("<=");
    }
    $main.toggleClass('none-sub-nav');
    $subNav.toggleClass('none-sub-nav');
  });

  // グローバルメニューで、アクティブなページをclass付与
  var url = window.location.href;
  var matchUrl = url.match(".+/(.+?)([\?#;].*)?$")[1];
  $('#global-nav .global-nav__item a[href="'+matchUrl+'"]').parent('.global-nav__item').addClass('current');
  $('.global-nav__item.current').on('click', function(){
      return false;
  });

  // ページ内リンクスクロール
  $("a[href^='#']").click(function() {
     var speed = 200;
     var href= $(this).attr("href");
     var target = $(href == "#" || href == "" ? 'html' : href);
     var position = target.offset().top - 108;
     $('body,html').animate({scrollTop:position}, speed, 'swing');
     return false;
  });


});
