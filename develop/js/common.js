$(function(){
  // 初期化
  // ページ内リンクスクロール
  $("a[href^='#']").click(function() {
     var speed = 200;
     var href= $(this).attr("href");
     var target = $(href == "#" || href == "" ? 'html' : href);
     var position = target.offset().top - 10;
     $('body,html').animate({scrollTop:position}, speed, 'swing');
     return false;
  });

});
