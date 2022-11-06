/*
MICS Front
Server関連
*/

let ApiData = []
,   d1=0
,   d2=0
,   InterestData=[]
,   ConnectingNow=false;

function GetDateTime(){
  const datebox1 = document.getElementById("input-date1");
  const timebox1 = document.getElementById("input-time1");

  const datebox2 = document.getElementById("input-date2");
  const timebox2 = document.getElementById("input-time2");

  const inputdateValue1 = datebox1.value;
  const inputtimeValue1 = timebox1.value;
  const datetime1=inputdateValue1+" "+inputtimeValue1;

  d1=(Date.parse(datetime1)/1000)+32400;

  const inputdateValue2 = datebox2.value;
  const inputtimeValue2 = timebox2.value;
  const datetime2=inputdateValue2+" "+inputtimeValue2;

  d2=(Date.parse(datetime2)/1000)+32400;

  return d1, d2
}

//ロード後のボタン再アクティブ化処理
function ButtonReActivate(serch_button){
  //ボタン再アクティブ化
  serch_button.value = 'Loaded!!';
  new Promise((resolve) => {
    //1秒後に実行する処理
    setTimeout(() => {
      resolve();
    }, 600);
  }).then(() => {
    serch_button.value = 'Plot';
  });
  return false;
}

// JSONオブジェクトへ変換
//指定された時間の受け取りとデータのリクエスト
function PullMessage(MICS_class){
  if(ConnectingNow == false){
    d1, d2 = GetDateTime();

    //時間範囲の確認
    // if(d2 - d1 > 2678400){
    //   alert("時間指定の範囲を1ヶ月以内にしてください。");
    //   return 0;
    // }else 
    if(isNaN(d2 - d1) || d2 - d1 < 0){
      alert("有効な開始時刻と終了時刻を指定してください。");
      return 0;
    }
    //通信をおこなってデータゲット
    console.log("[Info] Connect to server");

    //ボタン非アクティブ化(2重リクエスト防止)
    let serch_button = document.getElementsByClassName('searchbutton')[0].childNodes.item(0);
    serch_button.value = 'Loading…';
    ConnectingNow = true;

    axios.get(document.getElementById('server_address').value, {
      params: {
        start_time: d1,
        end_time: d2,
      }
    })//レスポンスを処理
    .then(response => {
      console.log("[Info] Successfully connect to server");
      ApiData = response.data;
      InterestData = JSON.parse(JSON.stringify(ApiData));
      //console.log(InterestData);
      MICS_class.GetMessage(d1, d2, InterestData);
      //エラー処理
    }).catch(err => {
      //サーバーエラー
      if(err.message == "Network Error"){
        alert("サーバに接続できませんでした\n(Network Error)");
        const {
          status,
          statusText
        } = err.response;
        let error_msg = `[Error] Could not connect to server (HTTP Status: ${status} ${statusText})`;
        console.log(error_msg);
      }
      //その他のエラー
      else{
        //エラーメッセージ
        throw new Error(err.stack);
      }
    }).finally(() => {
      //ボタン再アクティブ化
      ConnectingNow = ButtonReActivate(serch_button);
    });
  }
}

let file = document.getElementById('input_file');
let converted_json = [];
let min_time = 0;
let max_time = 0;

function str_to_time(time){
  return time.substr(0,4) + "-" + time.substr(4,2) + "-" + time.substr(6,2) + "T" + time.substr(8,2) + ":" + time.substr(10,2) + ":" + time.substr(12,2)+".000Z";
} 
//{"id":104,"interested":15,"age":61,"gender":0,"start_time":"2022-08-02T22:02:27.000Z","end_time":"2022-08-02T22:19:45.000Z","end_time_unix":1659478785},{"id":114,"interested":73,"age":31,"gender":1,"start_time":"2022-08-01T16:27:20.000Z","end_time":"2022-08-01T16:45:30.000Z","end_time_unix":1659372330},

function str_to_unixtime(time){
  time = time.substr(0,4) + "/" + time.substr(4,2) + "/" + time.substr(6,2) + " " + time.substr(8,2) + ":" + time.substr(10,2) + ":" + time.substr(12,2);
  let date = (new Date(time).getTime() / 1000);
  date += 18 * 60 * 60;
  return date.toString();
}

function unixtime_to_datetime(unix_time){
  datetime = new Date();
  unix_time += datetime.getTimezoneOffset() * 60;
  datetime = new Date((unix_time) * 1000);
  date = datetime.getFullYear().toString().padStart(4, '0') + "-" + (datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + datetime.getDate().toString().padStart(2, '0');
  time = datetime.getHours().toString().padStart(2, '0') + ":" + datetime.getMinutes().toString().padStart(2, '0');
  return [date, time]
}

// File APIに対応しているか確認
if(window.File && window.FileReader && window.FileList && window.Blob) {
  function LoadLocalCsvToJson(e) {
      let fileData = e.target.files[0];
 
      if(!fileData.name.match('.csv$')) {
          alert('CSVファイルを選択してください');
          return;
      }
      let reader = new FileReader();
      reader.onload = function() {
          let cols = reader.result.split('\n');
          let data = {};
          min_time = 0;
          max_time = 0;
          let str = "["
          for (let i = 0; i < cols.length; i++) {
            data[i] = cols[i].split(',');
            if(data[i][0] != "id" && data[i] != ""){
              let time = parseInt(str_to_unixtime(data[i][5]))
              if(str != "["){
                str = str + ','
              }else{
                min_time=time;
                max_time=time;
              }
              str = str + '{"id":' + data[i][0] + ',"interested":' + parseInt(data[i][1], 10)  + ',"age":' + data[i][2] + ',"gender":' + data[i][3] + ',"start_time":"' + str_to_time(data[i][4]) + '","end_time":"' + str_to_time(data[i][5]) + '","end_time_unix":' + str_to_unixtime(data[i][5]) + '}'
              if(time < min_time)min_time=time;
              if(time > max_time)max_time=time;
            }
          }
          str = str + ']'
          converted_json = str;
          //console.log(converted_json);
          //console.log(min_time);
          //console.log(max_time);
          //console.log(max_time - min_time);
          if(max_time - min_time > 2678400){
            converted_json = [];
            alert("1ヶ月より範囲の大きいデータは扱えません");
            min_time = 0;
            max_time = 0;
          }
          else if (max_time - min_time == 0){
            max_time += 60 * 10;
          }
          //console.log(str);

          //時刻自動入力
          if(document.getElementById("csv_datetime_auto_fill").checked == true){
            let datetime = unixtime_to_datetime(min_time)
            date1.value = datetime[0]
            time1.value = datetime[1]
            datetime = unixtime_to_datetime(max_time)
            date2.value = datetime[0]
            time2.value = datetime[1]
          }


      }
      reader.readAsText(fileData);
  }
  file.addEventListener('change', LoadLocalCsvToJson, false);
}

function PullMessageCSV(MICS_class){
  
  if(ConnectingNow == false){
    if(converted_json.length == 0){
      alert("ファイルを選択してください")
      return 0;
    }

    //選択した時間の取得
    d1, d2 = GetDateTime();
    
    //時間範囲の確認
    // if(d2 - d1 > 2678400){
    //   alert("時間指定の範囲を1ヶ月以内にしてください。");
    //   return 0;
    // }else 
    if(isNaN(d2 - d1) || d2 - d1 < 0){
      alert("有効な開始時刻と終了時刻を指定してください。");
      return 0;
    }else{
      InterestData = JSON.stringify(JSON.parse(converted_json).filter(data => data.end_time_unix > d1 && data.end_time_unix < d2));
    }
    //ロードしたことを表示
    console.log("[Info] Load from CSV");

    //ボタン非アクティブ化(2重リクエスト防止)
    let serch_button = document.getElementsByClassName('searchbutton')[0].childNodes.item(0);
    serch_button.value = 'Loading…';
    ConnectingNow = true;

    MICS_class.GetMessage(d1, d2, InterestData);

    //ボタン再アクティブ化
    ConnectingNow = ButtonReActivate(serch_button);
  }
}