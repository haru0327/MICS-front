/*
MICS Front
Server関連
*/

let ApiData = []
,   d1=0
,   d2=0
,   InterestData=[]
,   ConnectingNow=false;

// JSONオブジェクトへ変換
//指定された時間の受け取りとデータのリクエスト
function PullMessage(MICS_class){
  if(ConnectingNow == false){
    const datebox1 = document.getElementById("input-date1");
    const timebox1 = document.getElementById("input-time1");

    const datebox2 = document.getElementById("input-date2");
    const timebox2 = document.getElementById("input-time2");

    const inputdateValue1 = datebox1.value;
    const inputtimeValue1 = timebox1.value;
    const datetime1=inputdateValue1+" "+inputtimeValue1
    d1=Date.parse(datetime1)/1000


    const inputdateValue2 = datebox2.value;
    const inputtimeValue2 = timebox2.value;
    const datetime2=inputdateValue2+" "+inputtimeValue2
    d2=Date.parse(datetime2)/1000

    //時間範囲の確認
    if(d2 - d1 > 2678400){
      alert("時間指定の範囲を1ヶ月以内にしてください。")
      return;
    }

    /*//出力用のp要素にメッセージを表示（テスト用） 
    const output = "検索期間は" +d1+"から"+d2+"です。";
    document.getElementById("output-message").innerHTML = output;
    //*/

    //通信をおこなってデータゲット
    console.log("[Info] Connect to server");
    //console.log("[Info:debug] d1, d2 = " + d1 + ", " + d2);
    //ボタン非アクティブ化(2重リクエスト防止)
    let serch_button = document.getElementsByClassName('searchbutton')[0].childNodes.item(0);
    serch_button.value = 'Loading';
    ConnectingNow = true;

    axios.get('https://fast-fjord-64260.herokuapp.com/camera-data', {
      params: {
        start_time: d1,
        end_time: d2,
      }
    })//レスポンスを処理
    .then(response => {
      console.log("[Info] Successfully connect to server");
      ApiData= response.data
      InterestData = JSON.parse(JSON.stringify(ApiData));
      //console.log(InterestData);
      MICS_class.GetMessage(d1, d2, InterestData)
      //エラー処理
    }).catch(err => {
      //サーバーエラー
      if(err.message == "Network Error"){
        const {
          status,
          statusText
        } = err.response;
        let error_msg = `[Error] Could not connect to server (HTTP Status: ${status} ${statusText})`;
        console.log(error_msg);
        alert(error_msg)
      }
      //その他のエラー
      else{
        //エラーメッセージ
        throw new Error(err.stack)
      }
    }).finally(() => {
      //ボタン再アクティブ化
      ConnectingNow = false;
      serch_button.value = 'Plot';
    });
  }
}