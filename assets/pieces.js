'use strict';

/**
 * htmlから要素取得
 */
var inputData = document.getElementById('input_data');
var okButton = document.getElementById('ok_button');
var allDeleteButton = document.getElementById('all_delete_button');
var header = document.getElementById('header');
var messageArea = document.getElementById('message_area');
var listArea = document.getElementById('list_area');

/**
 * 初期値設定
 */
var storage = localStorage;
var nextNo = 0;
var listCount = 0;
var message = [
    '会いに来てくれてありがとう',
    'ちいさなことからちょっとずつ',
    '明日もPIECEを集めにきてね',
    'ひとつひとつのPIECEがあなたを作り出す',
    '続けられるキミは最高だ',
    '応援してるよ',
    '今日もひとつ集められた',
    'たいせつな言葉達を忘れてしまわないように',
    'あなただけのノートを作ろう',
    'やったぁー！！！',
    'ありがとう',
    '忘れないようにメモ、大事だね',
    'これからも一緒にがんばろう',
    'あなたのPIECEを大切にしまっておこう',
    '明日はもっとすごい自分になれるね'
];

/**
 * 画面初期表示処理
 */
window.onload = function() {
    listCreate();
}

/**
 * OKボタンクリック処理
 */
okButton.onclick = () => {
    var number  = inputData.id;
    var memo = inputData.value;

    //入力エリアが空の時はonclick処理終了
    if (memo.length === 0){
        inputData.focus();
        return;
    }

    //メッセージクリア
    messageClear();

    // メッセージ表示エリアの作成
    var i = Math.floor(Math.random() * message.length); //配列をランダムに取得
    var paragraph = document.createElement('p');
    paragraph.id = 'message';
    paragraph.innerText = message[i];
    messageArea.appendChild(paragraph);

    // LocalStorageに追加＆リスト再表示
    storage.setItem('PIECE' + number, memo);
    listCreate();

    // 入力エリアクリア
    inputData.value = '';
};

/**
 * すべて削除ボタンクリック処理
 */
allDeleteButton.onclick = () => {
    // 確認メッセージOK → LocalStorage削除
    if (window.confirm("これまでのPIECEをすべて削除してもよろしいですか？")) {
        for(var k = 10000; k >= 0; k-- ){
            if(localStorage.getItem('PIECE' + k)){
                localStorage.removeItem('PIECE' + k);
            }
        }
        // メッセージクリア
        messageClear();
        // LocalStorageをリスト表示
        listCount = 0;
        listCreate();
    }

}

/**
 * メッセージクリア関数
 */
function messageClear(){
    while (messageArea.firstChild) {
        messageArea.removeChild(messageArea.firstChild);
    }
}

/**
 * LocalStorageをリストに表示する関数
 */
function listCreate() {
    // リストを一旦削除
    while (listArea.firstChild) {
        listArea.removeChild(listArea.firstChild);
    }

    // LocalStorage取得
    nextNo = 0;
    listCount = 0;
    for(var j = 10000; j >= 0; j-- ){
        if(localStorage.getItem('PIECE' + j)){
            var list = document.createElement('li');
            list.innerText = localStorage.getItem('PIECE' + j);
            listArea.appendChild(list);

            var delButton = document.createElement('button');
            delButton.id = 'PIECE' + j;
            delButton.innerText = '×';
            delButton.onclick = (e) => {
                if (window.confirm("このPIECEを削除してもよろしいですか？")) {
                    localStorage.removeItem(e.target.id);
                    listCount--;
                    listCreate();
                }
            }
            listArea.appendChild(delButton);

            if(nextNo === 0){
                nextNo = j + 1;
            }
            listCount++;
        }
    }

    // LocalStorageがない場合、文字列を表示
    if(nextNo===0){
        var list = document.createElement('li');
        list.innerText = '－－あなただけのPIECEを集めましょう－－';
        listArea.appendChild(list);
        listCount = 0;
    }

    // PIECEの数によって背景色を変更
    var backType = listCount % 25;
    if( 0 <= backType && backType <= 4){
        document.body.style.background = "linear-gradient(#05cdff, #110188) fixed"; //ブルー
    } else if( 5 <= backType && backType <= 9){
        document.body.style.background = "linear-gradient(#69EACB, #EACCF8,#6654F1) fixed"; //ゆめかわ
    } else if( 10 <= backType && backType <= 14){
        document.body.style.background = "linear-gradient(#f6d365, #fda085) fixed"; //オレンジ
    } else if( 15 <= backType && backType <= 19){
        document.body.style.background = "linear-gradient(#cd9cf2, #f6f3ff) fixed"; //パープル
    } else {
        document.body.style.background = "linear-gradient(#d4fc79, #96e6a1) fixed"; //グリーン
    }

    // LocalStorageに登録する場合のキー情報を返却（PIECEXX　XX:番号）
    inputData.id = nextNo;

    // テキストボックスにフォーカスIN
    inputData.focus();
}
