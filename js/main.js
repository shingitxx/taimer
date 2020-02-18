// 厳密なエラーチェック
'use strict';

{
    // １必要な要素の取得
    // HTMLで出力した要素を所得する
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    // 4下のブロック外でもstartTimeは使うのでこちらに記載していく
    let startTime;
    // 13 ここで宣言する
    // 次にtimeoutIdを取得したいのですがsetTimeout()の返り値として取得するために下に書く↓
    let timeoutId;

    // １９ タイマーがストップして再会すると0秒に戻ってしまうのでそれを直す
    // stopをクリックしたときにclearTimeout()でタイマーを停止しつつ、このあたりでタイマーが走っていた時間を保持しておいて、またstartがクリックされたときにそれを足し上げてる
    // そのために使う要素を宣言する
    // stopをクリックした時点でelapsedtimeを計算する
    // したに書く↓
    let elapsedTime = 0;

    // 6カウントアップの定義を書いていく
    function countUp() {
        // 現在時刻からstartボタンを押した時の時刻であるstartTimeを引く
        // そうすればstartTimeからの経過ミリ秒がわかる
        // console.log(Date.now() - startTime);

        // 8上記の経過時間でDateオブジェクトを作って上げてそのメソッドを使ってあげる
        // その後にdという変数に代入する

        // 23 カウントアップの方で経過時間も含めてタイマーに表示していけば良いのでこちらに記載
        const d = new Date(Date.now() - startTime + elapsedTime);
        // 9, 分ですがmという定数用意してあげて、
        // そこに対してd.getMinutes()の結果を返す
        // getMinutes()=地方時に基づき、指定された日時の（分）を返します
        // getSeconds()=地方時に基づき、指定した日時の（秒）を返します。
        // getMilliseconds()=地方時に基づき、指定した日時の（m秒）を返します
        // 最後にまとめて表示する timer.textContent
        // const d = d.getMinutes();
        // 10 タイマーで最初に入れた時のように00.00.000で表示したい場合
        // その値に対してpadStart()というメソッドを使う
        // ただ文字列にしか使えないのでStringに変更する
        // padStart()=結果の文字列が指定した長さになるように現在の文字列を他の文字列で延長します。
        const m = String(d.getMinutes()).padStart(2,'0');
        const s = String(d.getSeconds()).padStart(2,'0');
        const ms = String(d.getMilliseconds()).padStart(3,'0');
        timer.textContent = `${m}:${s}.${ms}`;


        // 7countUp()の処理を一定時間ごとに繰り返す(setTimeout)
        // 14 こちらに記載
        // 15 次にtimeoutIdをclearTimeout()に渡してあげるとsetTimeout()がキャンセルできる↓
        timeoutId = setTimeout(() =>{
            countUp();
        }, 10);

    }

    // 25 ボタンの不具合を直していく
    // disabled=使用禁止
    // わかりやすく言えば入力して欲しくないところを打ち消す機能
    function setButtonStateInitial() {
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = true;
    }
    function setButtonStateRunning() {
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = true;
    }
    function setButtonStateStopped() {
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = false;
    }

    // 26↑の作成した物を呼び出すタイミングを作成する
    setButtonStateInitial();


    // 2スタートをしたいので要素にイベントを取得する
    // イベントを使う＝addEventListener
    // アロー関数必須 =>
    start.addEventListener('click', () =>{ 
        // 27 stopを押した時は当然runningの状態になるようにかく
        setButtonStateRunning();
        // 3現在時刻をstartTimeという名前で取得
        // 経過ミリ秒の計算=Date.now();
        startTime = Date.now();
        // 5カウントアップの処理をしていく
        countUp();

    });

    // 11次にストップボタンの作成をする
    stop.addEventListener('click', () =>{ 
        // / 28 stopを押した時はstoppedの状態になるようにかく
        setButtonStateStopped();
        // 12 setTimeout()をキャンセルすれば良いのでclearTimeout()を使う
        // タイムアウト用のidが必要なので上で宣言する↑
        // １６ こちらの()の中にtimeoutIdをいれる
        clearTimeout(timeoutId);
        // 21 こちらに記載する
        // stopをクリックした時刻とDate.now()で取れるのとstartをクリックした時刻はstartTimeにかく
        // ２２ ueに移動
        elapsedTime += Date.now() - startTime;
    });
    
    // 17 次にresetボタンを作成する
    reset.addEventListener('click', () =>{ 
        // / 29 resetを押した時は最初の状態に戻す
        setButtonStateInitial();
        // １８ 次はタイマーを元に戻す
        timer.textContent = '00.00.000';
        // 24ストップしてスタートした際にそのままの秒数で表示されるので
        // elapsedTimeもリセットするようにする
        elapsedTime = 0;
    });

}
