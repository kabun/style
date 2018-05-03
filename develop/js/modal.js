$(function() {

  // 初期化
  var currentScrollTop,      // スクロール位置 記録用
      activeModalIdNum,      // アクティブモーダルID 記録用
      timer        = false,  // 時差用
      DELAY_RESIZE = 200,    // ウィンドウリサイズ時に、光を表示する時差
      FADEIN_TIME  = 200,    // フェードイン時間
      FADEOUT_TIME = 200,    // フェードアウト時間
      ADJUST_HIGHT = 20;     // モーダル縦幅調整

  // セレクタ
  var modalOverlay = ".modal-overlay",      // 黒いモーダル背景
      modalInner   = ".modal-inner",        // モーダルインナー
      modalClose   = ".modal-close",        // モーダルクローズトリガー
      modalArrow   = ".modal-arrow",　      // arrow要素
      addArrow     = ".section-title",      // arrowを配置する要素
      globalNav    = ".global-nav-wrapper"; // グローバルナビ

  // DOM
  var $window       = $(window),
      $document     = $(document),
      $body         = $('body'),
      $modalOverlay = $(modalOverlay),
      $modalInner   = $(modalInner),
      $modalClose   = $(modalClose),
      $globalNav    = $(globalNav);

  // ウィンドウリサイズ時、モーダルもリサイズ
  $window.on('resize', function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var _height = $window.height();
      $modalOverlay.css('height', _height);
      $modalInner.css(  'height', _height - ADJUST_HIGHT + "px");
    }, DELAY_RESIZE);
  });

  // 共通関数
  var generalFnc = {
    // 動画再生を止める
    stopVideo: function() {
      var $video = $('video');
      for(var i = 0; i < $video.length; i++){
        $video[i].pause();
      }
    }
  }

  // サムネイル画像押下時、モーダルを表示。または アローを押下時、モーダル内容を変更
  $document.on('click', '[data-openmodal]', function(e) {
    if ($(this).data('openmodal-type') === "arrow") {
      // モーダルをarrowで開いた場合
      // 動画再生を止める
      generalFnc.stopVideo();
      // すでに表示しているモーダルを隠す
      $modalOverlay.fadeOut(FADEOUT_TIME);
    } else {
      // モーダルをサムネイル画像で開いた場合
      // グローバルナビを隠す
      $globalNav.hide();
      //スクロール位置を記録
      currentScrollTop = $window.scrollTop();
      // bodyのスクロール禁止
      $body.css({
        'position': 'fixed',
        'width'   : '100%',
        'overflow': 'hidden'
      });
    }

    // モーダル表示
    var _height             = $window.height(),
        targetOpenModalName = $(this).data('openmodal'),
        $targetOpenOverlay  = $('#' + targetOpenModalName),
        $targetOpenInner    = $('#' + targetOpenModalName + ' ' + modalInner);

    $targetOpenOverlay.addClass('active-modal');
    $targetOpenOverlay.css({'height': _height + 'px'});
    $targetOpenInner.css({  'height': (_height - ADJUST_HIGHT) + 'px'});
    $targetOpenOverlay.fadeIn(FADEIN_TIME);

    // arrowの生成
    var activeModalIdNum = targetOpenModalName.slice(-1),
        activeModalName  = targetOpenModalName.slice(0,-1),
        prevModalIdNum   = (Number(activeModalIdNum)-1),
        nextModalIdNum   = (Number(activeModalIdNum)+1),
        prevModalName    = activeModalName + prevModalIdNum,
        nextModalName    = activeModalName + nextModalIdNum,
        min              = 1,
        max              = (Number($('.' + activeModalName).length));

    if(activeModalIdNum <= max && activeModalIdNum > min) {
      $targetOpenOverlay.find(addArrow).prepend(
        '<div class="modal-arrow arrow-box arrow-left" ' +
        'data-openmodal="' + prevModalName + '" data-openmodal-type="arrow"></div>'
      );
    }
    if(activeModalIdNum >= min && activeModalIdNum < max) {
      $targetOpenOverlay.find(addArrow).prepend(
        '<div class="modal-arrow arrow-box arrow-right" ' +
        'data-openmodal="' + nextModalName + '" data-openmodal-type="arrow"></div>'
      );
    }

    // モーダルウィンドウのスクロール位置をリセット
    $targetOpenInner.scrollTop(0);
  });

  //「xボタン」または、「閉じるボタン」押下時、モーダルを隠す
  $document.on('click', '[data-closemodal]', function(e) {
    // グローバルナビを表示
    $globalNav.fadeIn(FADEIN_TIME);
    // bodyのスクロール禁止解除
    $body.css({
      'position': 'relative',
      'width'   : '',
      'overflow': ''
    });
    // スクロール位置を元に戻す
    $window.scrollTop(currentScrollTop);
    // モーダルを隠す
    var targetCloseModalName = $(this).data('closemodal'),
        $targetCloseOverlay  = $('#' + targetCloseModalName),
        $targetCloseInner    = $('#' + targetCloseModalName + ' ' + modalInner);

    $targetCloseOverlay.removeClass('active-modal');
    $targetCloseOverlay.fadeOut(FADEOUT_TIME);
    // モーダルウィンドウのスクロール位置をリセット
    $targetCloseInner.scrollTop(0);
    // 動画再生を止める
    generalFnc.stopVideo();
  });

  // arrowにカーソルが重なったら、arrowの色を変更。
  // 後から追加した要素のhoverは、この描き方じゃないと動かない。
  $(document).on('mouseenter',modalArrow,function() {
    $(this).addClass('hover');
  });
  $(document).on('mouseleave',modalArrow,function() {
    $(this).removeClass('hover');
  });

});
