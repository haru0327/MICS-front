/*
MICS Front
class関連
*/

class MICS{
    //コンストラクタ
    constructor() {
        this.date_first = -1;
        this.date_last = -1;
        this.interest_data = [];
        this.is_pulled = false;
        this.container = document.getElementById("app");
    }

    //サーバーからデータ取得
    GetMessage(date_first, date_last, interest_data){
        if(interest_data != '[]'){
            if(this.is_pulled == false){
                this.date_first = date_first;
                this.date_last = date_last;
                this.interest_data = interest_data;
                console.log("[Info] Successfully input data into MICS class");
                this.is_pulled = true;
                this.container.style.paddingBottom = 130 + "px";
                this.graph = new MICSGrahp(this);
            }else{
                console.log("[Info] Successfully updated MICS class");
                this.date_first = date_first;
                this.date_last = date_last;
                this.interest_data = interest_data;
                this.graph.Update(this);
            }
        }
        else{
            alert("データがありません")
        }
    }

    //サーバーからデータを取得(ラッパー)
    PullMessage(){
        PullMessage(this)
    }

    //サーバーからデータを取得(ラッパー)
    PullMessageCSV(){
        PullMessageCSV(this)
    }

}

mics_data = new MICS();

//時間仮入力自動化

//空欄に入力
function SetValueToBlank(target, value){
    if(target.value == ""){
        console.log("[Info] Set input value");
        target.value = value;
    }
}

//日付変更を検知して時刻を仮入力
function SetTimeInput(e){
    if(e.currentTarget.value != ""){
        SetValueToBlank(this.time, this.time_set_value);
    }
}

//starttime変更を検知してendtimeを仮入力
function SetDateInput(e){
    if(e.currentTarget.value != ""){
        SetValueToBlank(this.date, e.currentTarget.value);
        if(this.set_time_flag == true){
            SetValueToBlank(this.time, this.time_set_value);
        }
    }
}

//element取得
let date1 = document.getElementById("input-date1");
let date2 = document.getElementById("input-date2");
let time1 = document.getElementById("input-time1");
let time2 = document.getElementById("input-time2");

//イベントリスナーを登録
date1.addEventListener("input", {date: date2, date_set_value: date1.value, set_time_flag: true, time: time2, time_set_value: "23:59", handleEvent: SetDateInput});
date1.addEventListener("input", {time: time1, time_set_value: "00:00", handleEvent: SetTimeInput});
date2.addEventListener("input", {time: time2, time_set_value: "00:00", handleEvent: SetTimeInput});


//server/csv切り替え
let server_option = document.getElementById("server_option");
let csv_option = document.getElementById("csv_option");
let server_csv_button = document.getElementById("server_csv");
server_csv_button.onclick = function(){
    let PlotButton = document.getElementsByClassName('searchbutton')[0].childNodes.item(0)
    if(server_csv_button.checked == true){
        csv_option.style.display="flex"
        server_option.style.display="none"
        PlotButton.onclick = function(){
            mics_data.PullMessageCSV()
        }
    }else{
        csv_option.style.display="none"
        server_option.style.display="flex"
        PlotButton.onclick = function(){
            mics_data.PullMessage()
        }
    }
}

//サーバアドレス変更欄の表示、非表示
let server_option_check = document.getElementById("server_option_check");
server_option_check.onclick = function(){
    let value;
    if(server_option_check.checked == true){
        value = "visible"
    }else{
        value = "hidden"
    }
    document.getElementById("server_address").style.visibility = value
}