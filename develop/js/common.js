$(function(){
  // 初期化
  var timer = false,
      windowHeight;

  function getWindowHeight(){
    windowHeight = $(window).height();
  }

  function addjustWindowHeight(){
    $('.topimage-wrapper').css('height', windowHeight);
  }

  $(document).ready( function(){
    getWindowHeight();
    addjustWindowHeight();
  });

  $(window).on('resize', function(){
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      getWindowHeight();
      addjustWindowHeight();
    }, 200);
  });

  $(window).on('scroll', function() {
    $('#global-nav').toggleClass('fixed', $(this).scrollTop() >= windowHeight);
    currentCheck();
  });

  // ナビゲーションのリンクを指定
  var navLink = $('#global-nav li a');

  // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
  var contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {
    // コンテンツのIDを取得
    var targetContents = navLink.eq(i).attr('href');
    // ページ内リンクでないナビゲーションが含まれている場合は除外する
    if(targetContents.charAt(0) == '#') {
      windowHeight = $(window).height();
      // ページ上部からコンテンツの開始位置までの距離を取得
      if(i == 0){
        var targetContentsTop = 0;
        // ページ上部からコンテンツの終了位置までの距離を取得
        var targetContentsBottom = windowHeight;
      } else {
        var targetContentsTop = $(targetContents).offset().top + windowHeight - 60;
        // ページ上部からコンテンツの終了位置までの距離を取得
        var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true) + windowHeight - 60;
      }
      // 配列に格納
      contentsArr[i] = [targetContentsTop, targetContentsBottom]
    }
  };

  // 現在地をチェックする
  function currentCheck() {
    // 現在のスクロール位置を取得
    var windowScrolltop = $(window).scrollTop();
    for (var i = 0; i < contentsArr.length; i++) {
      // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
      if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop + windowHeight) {
        // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
        if(i == 0){
          navLink.removeClass('current');
        } else {
          navLink.removeClass('current');
          navLink.eq(i).addClass('current');
          i == contentsArr.length;
        }
      }
    };
  }

  // ページ内リンクスクロール
  $("a[href^='#']").click(function() {
     var speed = 200;
     var href= $(this).attr("href");
     var target = $(href == "#" || href == "" ? 'html' : href);
     var position = target.offset().top - 60;
     $('body,html').animate({scrollTop:position}, speed, 'swing');
     return false;
  });

});
