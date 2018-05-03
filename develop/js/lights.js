$(function(){

  // 初期化
  var GLOBAL_MENU_HEIGHT  = 61,  // グローバルメニューの縦幅
      LIGHT_COUNT         = 12,  // 光の数
      DELAY_WINDOW_RESIZE = 200; // ウィンドウリサイズ時、光を表示する時差

  // セレクタ
  var headerLights     = ".header-lights",
      headerLightsArea = ".header-lights-area",
      particle         = ".particle";

  // DOM
  var $window = $(window);

  // ロジックの見通しをよくする為、イベントリスナーでまとめておく
  // ページ読み込み時、光が振ってくるアニメーションを開始
  window.addEventListener("load", addHeaderLights, false);
  // ウィンドウリサイズ時、光を再描画
  window.addEventListener("resize", resizeWindow, false);
  // 一定量スクロールすると、光を削除したり、再描画する
  window.addEventListener("scroll", hiddenLights, false);

  // 光の表示位置、種類、タイミングをランダムで生成
  function addHeaderLights() {
    // ウィンドウ幅を取得
    var windowHeight     = $window.height(),
        windowHeightHalf = windowHeight / 2,
        windowWidth      = $window.height(),
        windowWidthHalf  = windowWidth / 2;

    $.each($(headerLights), function(){
      for(var i = 0; i <= LIGHT_COUNT; i++) {
        //光が出現するタイミング
        var animationDelay   = Math.random() * 7;
        //X座標、Y座標
        var defaultPositionX = (function(){
          return Math.floor(Math.ceil(Math.random()*windowWidth)-windowWidthHalf);
        })();
        var defaultPositionY = (function(){
          return Math.floor(Math.ceil(Math.random()*windowHeight)-windowHeightHalf);
        })();
        //スピード
        var lightType = Math.floor(Math.random() * 2),
            rorateWay = (lightType === 0) ? "rorate-way-fast" : "rorate-way-low";

        //光のオブジェクトを生成
        $(this).append('<span class="particle ' + rorateWay +
        '" style="top:' + defaultPositionY + 'px;' +
        ' left:' + defaultPositionX +'px;' +
        '-webkit-animation-delay: ' + animationDelay + 's;' +
        'animation-delay: ' + animationDelay + 's;' + '">' +
        '<img src="./img/light_' + lightType + '.png"' +
        ' width="15" height="15" alt=""></span>');
      }
    });
  }

  // ウィンドウサイズを変更時、時差をつけてウィンドウ幅を取得
  function resizeWindow(){
    // 時差用
    var timer = false;
    $(particle).remove();
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      addHeaderLights();
    }, DELAY_WINDOW_RESIZE);
  }

  // 光を表示・非表示切り替え
  function hiddenLights(){
    // 光を非表示にするスクロール量
    var distanceTop = windowHeight = $window.height();
    // スクロール位置に達しているかどうかを判別して、表示切り替え
    var css = ($window.scrollTop() > distanceTop - GLOBAL_MENU_HEIGHT) ? 'none' : 'block';
    $(headerLightsArea).css('display', css);
  }

});
