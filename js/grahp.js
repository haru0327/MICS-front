/*
MICS Front
Grahp表示関係
*/

//指定した要素を子含めて全削除
function RemoveAll(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
    element.remove();
}

//グラフ表示クラス
class MICSGrahp{
    //public--------------------------------------------------------------------------------------------

    //コンストラクタ
    constructor(MICS_class) {
        this.#AddGraphDOM();
        this.data = new DataIN(MICS_class.date_first, MICS_class.date_last, MICS_class.interest_data);
        this.#LoadGrahps();
    }

    //グラフの再描画
    Update(MICS_class){
        RemoveAll(document.getElementById("graphA" ))
        RemoveAll(document.getElementById("graphB" ))
        RemoveAll(document.getElementById("graphC" ))
        RemoveAll(document.getElementById("graphD1"))
        RemoveAll(document.getElementById("graphD2"))
        this.#AddGraphDOM();
        this.data = new DataIN(MICS_class.date_first, MICS_class.date_last, MICS_class.interest_data);
        this.#LoadGrahps();
    }

    //private-------------------------------------------------------------------------------------------
    
    //グラフの描画
    #LoadGrahps(){
        this.#GrahpA1();
        this.#GrahpA2('graph_A21',this.data.A21_data);
        this.#GrahpA2('graph_A22',this.data.A22_data);
        this.#GrahpB('graph_B1',this.data.B1_10_data,this.data.B1_20_data,this.data.B1_30_data,this.data.B1_40_data,this.data.B1_50_data,this.data.B1_60_data);
        this.#GrahpB('graph_B2',this.data.B2_10_data,this.data.B2_20_data,this.data.B2_30_data,this.data.B2_40_data,this.data.B2_50_data,this.data.B2_60_data);
        this.#GrahpC1();
        this.#GrahpD('graph_D11',this.data.D11_10_data,this.data.D11_20_data,this.data.D11_30_data,this.data.D11_40_data,this.data.D11_50_data,this.data.D11_60_data);
        this.#GrahpD('graph_D12',this.data.D12_10_data,this.data.D12_20_data,this.data.D12_30_data,this.data.D12_40_data,this.data.D12_50_data,this.data.D12_60_data);
        this.#GrahpD('graph_D13',this.data.D13_10_data,this.data.D13_20_data,this.data.D13_30_data,this.data.D13_40_data,this.data.D13_50_data,this.data.D13_60_data);
        this.#GrahpD('graph_D21',this.data.D21_10_data,this.data.D21_20_data,this.data.D21_30_data,this.data.D21_40_data,this.data.D21_50_data,this.data.D21_60_data);
        this.#GrahpD('graph_D22',this.data.D22_10_data,this.data.D22_20_data,this.data.D22_30_data,this.data.D22_40_data,this.data.D22_50_data,this.data.D22_60_data);
        this.#GrahpD('graph_D23',this.data.D23_10_data,this.data.D23_20_data,this.data.D23_30_data,this.data.D23_40_data,this.data.D23_50_data,this.data.D23_60_data);
    }

    //それぞれのグラフを表示する関数

    #GrahpA1(){
        const element = document.getElementById('graph_A1').getContext('2d');
        const chart = new Chart(element, {
            type:'pie',
            data: {
                labels: ["特に関心あり", "関心あり", "関心なし"],
                datasets: [{
                    backgroundColor: [
                    'rgba(220, 53, 69, 1)'  ,
                    'rgba(255, 141, 152, 1)',
                    'rgba(138, 138, 138, 1)',
                    ],
                    data: this.data.A1_data
                }]
            },
       });
    }

    #GrahpA2(id, data){
        const element = document.getElementById(id).getContext('2d');
        const chart = new Chart(element, {
            type:'pie',
            data: {
                labels: ["男性", "女性"],
                datasets: [{
                    backgroundColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    data: data
                }]
            },
       });
    }

    #GrahpB(id, data_10, data_20, data_30, data_40, data_50, data_60){
        const element = document.getElementById(id).getContext('2d');
        Chart.register(ChartjsPluginStacked100.default);
        const chart = new Chart(element, {
            type:'bar',
            data: {
                labels: ["男性", "女性"],
                datasets: [
                {
                    barPercentage:0.6,
                    label:           "10代以下",
                    data:            data_10,
                    backgroundColor: "rgba(220,53,69, 0.8)",
                    borderColor:     "rgba(220,53,69, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "20代",
                    data:            data_20,
                    backgroundColor: "rgba(255,142,10, 0.8)",
                    borderColor:     "rgba(255,142,10, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "30代",
                    data:            data_30,
                    backgroundColor: "rgba(255,228,88, 0.8)",
                    borderColor:     "rgba(255,228,88, 1.0)",
                    borderWidth:     1,
                },
                {
                    barPercentage:0.6,
                    label:           "40代",
                    data:            data_40,
                    backgroundColor: "rgba(84,241,100, 0.8)",
                    borderColor:     "rgba(84,241,100, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "50代",
                    data:            data_50,
                    backgroundColor: "rgba(53,90,220, 0.8)",
                    borderColor:     "rgba(53,90,220, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "60代以上",
                    data:            data_60,
                    backgroundColor: "rgba(151,71,255, 0.8)",
                    borderColor:     "rgba(151,71,255, 1.0)",
                    borderWidth:     1,
                }],
            },
            options: {
                responsive: true,
                indexAxis: "y",
                plugins: {
                    stacked100: { enable: true },
                },
            },
       });
    }

    #GrahpC1(){
        const element = document.getElementById('graph_C1').getContext('2d');
        const chart = new Chart(element, {
            type:'bar',
            data: {
                labels: this.data.label_time_arr,
                datasets: [
                {
                    barPercentage:0.6,
                    label:           "関心度なし",
                    data:            this.data.C1_notint_data,
                    backgroundColor: "rgba(171, 171, 171, 0.8)",
                    borderColor:     "rgba(171, 171, 171, 1.0)",
                    borderWidth:     1,
                }, 
                {  
                    barPercentage:0.6,
                    label:           "関心度有り",
                    data:            this.data.C1_nomalint_data,
                    backgroundColor: "rgba(232, 123, 134, 0.8)",
                    borderColor:     "rgba(232, 123, 134, 1.0)",
                    borderWidth:     1,
                }, 
                {   
                    barPercentage:0.6,
                    label:           "関心度特に有り",
                    data:            this.data.C1_maxint_data,
                    backgroundColor: "rgba(220, 53, 69, 0.8)",
                    borderColor:     "rgba(220, 53, 69, 1.0)",
                    borderWidth:     1,
                }],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display:      true,
                        stacked:      true,
                        suggestedMax: 100,
                        suggestedMin: 0,
                        ticks: {
                        stepSize: 10,
                        },
                    },
                    y: {
                        display:      true,
                        stacked:      true,
                    }
                }
            }
        });
    }

    #GrahpD(id, data_10, data_20, data_30, data_40, data_50, data_60){
        const element = document.getElementById(id).getContext('2d');
        const chart = new Chart(element, {
            type:'bar',
            data: {
                labels: this.data.label_time_arr,
                datasets: [
                {
                    barPercentage:0.6,
                    label:           "10代以下",
                    data:            data_10,
                    backgroundColor: "rgba(220,53,69, 0.8)",
                    borderColor:     "rgba(220,53,69, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "20代",
                    data:            data_20,
                    backgroundColor: "rgba(255,142,10, 0.8)",
                    borderColor:     "rgba(255,142,10, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "30代",
                    data:            data_30,
                    backgroundColor: "rgba(255,228,88, 0.8)",
                    borderColor:     "rgba(255,228,88, 1.0)",
                    borderWidth:     1,
                },
                {
                    barPercentage:0.6,
                    label:           "40代",
                    data:            data_40,
                    backgroundColor: "rgba(84,241,100, 0.8)",
                    borderColor:     "rgba(84,241,100, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    barPercentage:0.6,
                    label:           "50代",
                    data:            data_50,
                    backgroundColor: "rgba(53,90,220, 0.8)",
                    borderColor:     "rgba(53,90,220, 1.0)",
                    borderWidth:     1,
                }, 
                {
                    
                    barPercentage:0.6,
                    label:           "60代以上",
                    data:            data_60,
                    backgroundColor: "rgba(151,71,255, 0.8)",
                    borderColor:     "rgba(151,71,255, 1.0)",
                    borderWidth:     1,
                }],
            },
            options: {
               responsive: true,
               scales: {
                    x: {
                        display:      true,
                        stacked:      true,
                        suggestedMax: 100,
                        suggestedMin: 0,
                        ticks: {
                            stepSize: 10,
                        },
                    },
                    y: {
                        display:      true,
                        stacked:      true,
                    }
                }
            }
       });
    }

    //HTMLにグラフ部分を追加するする関数
    #AddGraphDOM(){
        this.new_HTML_data = `
        <div class="graphA" id="graphA">
            <div class="graphA1">
                <div class="graphA1title">
                    <h1>関心度別人数比</h1>
                </div>
                <hr noshade>    
                <div class="graphA1inner">
                    <canvas id="graph_A1" style="max-height: 320px"></canvas>
                </div> 
            </div>
            <div class="graphA2">
                <div class="graphA2title">
                    <h1>関心度別男女比</h1>
                </div>
                <div class="graphA2inner">
                    <div class="A21">
                    <hr noshade> 
                        <h2>特に関心あり</h2>
                        <canvas id="graph_A21" height="100" style="max-height: 290px"></canvas>
                    </div>
                    <div class="A22">
                    <hr noshade> 
                        <h2>特に関心あり & 関心あり</h2>
                        <canvas id="graph_A22" height="100" style="max-height: 290px"></canvas>
                    </div>
                 
                </div>
            </div>                     
        </div>

        <div class="graphB" id="graphB">
            <div class="graphBtitle">
                <h1>関心度別男女年齢比</h1>
            </div>
            <hr noshade> 
            <div class="B1">
                <div class="B1h2"><h2>特に関心あり</h2></div>
                <div class="B1inner">
                    <canvas id="graph_B1" width="90" height="100" style="max-height: 100%"></canvas>
                </div>
            </div>
            <hr noshade> 
            <div class="B2">
                <div class="B2h2">
                    <h2>特に関心あり & 関心あり</h2>
                </div>
                <div class="B2inner">
                    <canvas id="graph_B2" width="90" height="100" style="max-height: 100%"></canvas>
                </div>
            </div>
        
        </div>

        <div class="graphC" id="graphC">
            <div class="graphCtitle">
                <h1>関心度時間推移</h1>
            </div>
            <div><hr noshade></div>
            <div class="C1">
                <canvas id="graph_C1" width="100" height="300" style="max-height: 100%"></canvas>
            </div>
        </div>

        <div class="graphD1" id="graphD1">
            <div class="graphD1title">
                <h1>【特に関心あり】年齢比時間推移</h1>
            </div>
            <hr noshade> 
            <div class="graphD11">
                <h2>全体</h2>
                <div class="graphD11inner">
                    <canvas id="graph_D11" width="100" height="280" style="max-height: 100%"></canvas>
                </div>
            </div>
            <hr>
            <div class="graphD12">
                <h2>男性</h2>
                <div class="graphD12inner">
                    <canvas id="graph_D12" width="100" height="280" style="max-height: 100%"></canvas>
                </div>
            </div>
            <hr>
            <div class="graphD13">
                <h2>女性</h2>
                <div class="graphD13inner">
                    <canvas id="graph_D13" width="100" height="280" style="max-height: 100%"></canvas>
                </div>
            </div>
        </div>

        <div class="graphD2" id="graphD2">
            <div class="graphD2title">
                <h1>【特に関心あり＆関心あり】年齢比時間推移</h1>
            </div>
            <hr noshade> 
            <div class="graphD21">
                <h2>全体</h2>
                <div class="graphD21inner">
                    <canvas id="graph_D21" width="100" height="280" style="max-height: 100%"></canvas>
                </div>
            </div>
            <hr>
            <div class="graphD22">
                <h2>男性</h2>
                <div class="graphD22inner">
                    <canvas id="graph_D22" width="100" height="280" style="max-height: 100%"></canvas>
                </div>
            </div>
            <hr>
            <div class="graphD23">
                <h2>女性</h2>
                <div class="graphD23inner">
                    <canvas id="graph_D23" width="100" height="280" style="max-height: 100%"></canvas>
                </div>         
            </div>
        </div>`;

        //DOM操作実行
        this.app_element = document.getElementById("app");
        this.app_element.insertAdjacentHTML('afterbegin', this.new_HTML_data);

        //ページ上部に戻るボタンのイベントを登録(デスクトップのみ)
        if (!navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
            window.addEventListener('scroll', function(){
                let button = document.getElementById("back_to_top");
                let footer = document.getElementById("footer");
                if(button.style.visibility == 'hidden'){
                    if(200 < window.scrollY){
                        button.animate(
                            [
                                { opacity: 0 },
                                { opacity: 1 }
                            ],
                            {
                                duration: 100,
                                fill: 'forwards'
                            }
                        );
                        button.style.visibility = 'visible';
                    }
                }else{
                    if(200 >= window.scrollY){
                        button.animate(
                            [
                                { opacity: 1 },
                                { opacity: 0 }
                            ],
                            {
                                duration: 100,
                                fill: 'forwards'
                            }
                        );
                        setTimeout(function(){
                            button.style.visibility = 'hidden';
                        }, 200);
                    }
                    if(GetAbsolutePositionTopY(footer) < window.innerHeight + window.scrollY){
                        button.style.bottom = 30 + (window.innerHeight + window.scrollY - GetAbsolutePositionTopY(footer)) + "px";
                    }else{
                        button.style.bottom = 30 + "px";
                    }
                }
            });
        }
    }
}

//要素の絶対座標を取得(Y, Top)
function GetAbsolutePositionTopY(element){
    let rect = element.getBoundingClientRect();
    return rect.top + window.pageYOffset;
}
//要素の絶対座標を取得(Y, Bottom)
function GetAbsolutePositionBottomY(element){
    let rect = element.getBoundingClientRect();
    return rect.bottom + window.pageYOffset;
}