/*
MICS Front
データ成形
*/
class DataIN{
    constructor(d1, d2, InterestData){
        //選択期間
        let bet_time = d2 - d1;

        //選択期間　0分～3時間
        if(bet_time<10800 && bet_time>=0){
            this.#data_process(10800,600,d1,d2,InterestData);
            console.log("[Info] 0~3hour");
        }
        //選択期間　3時間～1日
        else if (bet_time<86400 && bet_time>=10800){
            this.#data_process(86400,3600,d1,d2,InterestData);
            console.log("[Info] 3h~1d");
        }
        //選択期間　1日～31日
        else if(bet_time<=2678400 && bet_time>=86400){
            this.#data_process(2678400,86400,d1,d2,InterestData);
            console.log("[Info] 1d~31d");
        }
    };

    //データ分割関数
    #data_process(max_time,div_time,user_intime,user_outtime,InterestData){

        let backdata_arr = JSON.parse(InterestData);

        //関心度調整変数
        let max_intline = 45;
        let not_intline = 20;

        //graphプロットデータ変数
        this.C1_maxint_data   = [];
        this.C1_nomalint_data = [];
        this.C1_notint_data   = [];

        this.D11_10_data = [];
        this.D11_20_data = [];
        this.D11_30_data = [];
        this.D11_40_data = [];
        this.D11_50_data = [];
        this.D11_60_data = [];

        this.D12_10_data = [];
        this.D12_20_data = [];
        this.D12_30_data = [];
        this.D12_40_data = [];
        this.D12_50_data = [];
        this.D12_60_data = [];

        this.D13_10_data = [];
        this.D13_20_data = [];
        this.D13_30_data = [];
        this.D13_40_data = [];
        this.D13_50_data = [];
        this.D13_60_data = [];

        this.D21_10_data = [];
        this.D21_20_data = [];
        this.D21_30_data = [];
        this.D21_40_data = [];
        this.D21_50_data = [];
        this.D21_60_data = [];

        this.D22_10_data = [];
        this.D22_20_data = [];
        this.D22_30_data = [];
        this.D22_40_data = [];
        this.D22_50_data = [];
        this.D22_60_data = [];

        this.D23_10_data = [];
        this.D23_20_data = [];
        this.D23_30_data = [];
        this.D23_40_data = [];
        this.D23_50_data = [];
        this.D23_60_data = [];

        let label_unix_in = []; 

        let backdata_arr_time = [];

        let max_int_arr   = [];
        let nomal_int_arr = [];
        let all_int_arr   = [];
        let not_int_arr   = [];

        let male_max_int_arr   = [];
        let female_max_int_arr = [];
        
        let male_all_int_arr   = [];
        let female_all_int_arr = [];
        
        //ラベル変数
        this.label_time_arr = [];

        //時間変化ラベル作成    
        for(let h = user_intime - 32400; h < (user_outtime - 32400) + div_time; h = h + div_time){
            label_unix_in.push(h);
        };

        let plot_num = (d2 - d1) / div_time;

        for(let i = 0; i < plot_num; i = i + 1){
            let label_time_in= new Date(label_unix_in[i] * 1000);
            this.label_time_arr.push(label_time_in.getMonth() + 1 + "/" + label_time_in.getDate() + "/ " + label_time_in.getHours() + ":" + label_time_in.getMinutes());
        };

        //関心度分割
        let all_max_int_arr   = backdata_arr.filter(x => x.interested <= 100 && x.interested > max_intline);
        let all_nomal_int_arr = backdata_arr.filter(x => x.interested <= max_intline && x.interested > not_intline);
        let all_all_int_arr   = backdata_arr.filter(x => x.interested <= 100 && x.interested > not_intline);
        let all_not_int_arr   = backdata_arr.filter(x => x.interested <= not_intline && x.interested >= 0);           

        //性別分割
        let all_male_max_int_arr_in   = all_max_int_arr.filter(x => x.gender === 0);
        let all_female_max_int_arr_in = all_max_int_arr.filter(x => x.gender === 1);
        let all_male_all_int_arr_in   = all_all_int_arr.filter(x => x.gender === 0);
        let all_female_all_int_arr_in = all_all_int_arr.filter(x => x.gender === 1);

        //時間分割無しのgraphプロット変数in
        //A1
        this.A1_data = [all_max_int_arr.length, all_nomal_int_arr.length, all_not_int_arr.length];

        //A21
        this.A21_data = [all_male_max_int_arr_in.length, all_female_max_int_arr_in.length];

        //A22
        this.A22_data = [all_male_all_int_arr_in.length, all_female_all_int_arr_in.length] ;    

        //B1
        [this.B1_10_data, this.B1_20_data, this.B1_30_data, this.B1_40_data, this.B1_50_data, this.B1_60_data] = this.#GrahpBFilter(all_male_max_int_arr_in, all_female_max_int_arr_in);

        //B2
        [this.B2_10_data, this.B2_20_data, this.B2_30_data, this.B2_40_data, this.B2_50_data, this.B2_60_data] = this.#GrahpBFilter(all_male_all_int_arr_in, all_female_all_int_arr_in);

        //時間分割
        for(let i=0 ;i<max_time ;i=i+div_time){
            backdata_arr_time.push(backdata_arr.filter(x => x.end_time_unix <= user_intime+(i+div_time) && x.end_time_unix > user_intime + i));
        };

        for(let i=0 ;i<plot_num ;i=i+1){
            //関心度分割
            max_int_arr.push(backdata_arr_time[i].filter(x => x.interested <= 100 && x.interested >= max_intline));
            nomal_int_arr.push(backdata_arr_time[i].filter(x => x.interested < max_intline && x.interested > not_intline));
            all_int_arr.push(backdata_arr_time[i].filter(x => x.interested <= 100 && x.interested > not_intline));
            not_int_arr.push(backdata_arr_time[i].filter(x => x.interested <= not_intline && x.interested >= 0));

            //性別分割
            male_max_int_arr.push(max_int_arr[i].filter(x => x.gender === 0));
            female_max_int_arr.push(max_int_arr[i].filter(x => x.gender === 1));
            male_all_int_arr.push(all_int_arr[i].filter(x => x.gender === 0));
            female_all_int_arr.push(all_int_arr[i].filter(x => x.gender === 1));

            //プロットデータ作成
            this.C1_maxint_data.push(max_int_arr[i].length);
            this.C1_nomalint_data.push(nomal_int_arr[i].length);
            this.C1_notint_data.push(not_int_arr[i].length);
               
            //D1, D2
            this.#GrahpDFilter(max_int_arr, i, this.D11_10_data, this.D11_20_data, this.D11_30_data, this.D11_40_data, this.D11_50_data, this.D11_60_data)
            this.#GrahpDFilter(male_max_int_arr, i, this.D12_10_data, this.D12_20_data, this.D12_30_data, this.D12_40_data, this.D12_50_data, this.D12_60_data)
            this.#GrahpDFilter(female_max_int_arr, i, this.D13_10_data, this.D13_20_data, this.D13_30_data, this.D13_40_data, this.D13_50_data, this.D13_60_data)
            this.#GrahpDFilter(all_int_arr, i, this.D21_10_data, this.D21_20_data, this.D21_30_data, this.D21_40_data, this.D21_50_data, this.D21_60_data)
            this.#GrahpDFilter(male_all_int_arr, i, this.D22_10_data, this.D22_20_data, this.D22_30_data, this.D22_40_data, this.D22_50_data, this.D22_60_data)
            this.#GrahpDFilter(female_all_int_arr, i, this.D23_10_data, this.D23_20_data, this.D23_30_data, this.D23_40_data, this.D23_50_data, this.D23_60_data)
        };
    };

    #GrahpBFilter(male,female){
        return [
            [male.filter(x => x.age < 20).length                ,female.filter(x => x.age < 20).length               ],
            [male.filter(x => x.age < 30 && x.age>=20).length   ,female.filter(x => x.age < 30 && x.age>=20).length  ],
            [male.filter(x => x.age < 40 && x.age>=30).length   ,female.filter(x => x.age < 40 && x.age>=30).length  ],
            [male.filter(x => x.age < 50 && x.age>=40).length   ,female.filter(x => x.age < 50 && x.age>=40).length  ],
            [male.filter(x => x.age < 60 && x.age>=50).length   ,female.filter(x => x.age < 60 && x.age>=50).length  ],
            [male.filter(x => x.age <= 120 && x.age>=60).length ,female.filter(x => x.age <= 120 && x.age>=60).length]
        ]
    }

    #GrahpDFilter(max_int_arr,i,D10_data,D20_data,D30_data,D40_data,D50_data,D60_data){
        D10_data.push(max_int_arr[i].filter(x => x.age < 20).length); 
        D20_data.push(max_int_arr[i].filter(x => x.age < 30 && x.age >= 20).length); 
        D30_data.push(max_int_arr[i].filter(x => x.age < 40 && x.age >= 30).length);
        D40_data.push(max_int_arr[i].filter(x => x.age < 50 && x.age >= 40).length);
        D50_data.push(max_int_arr[i].filter(x => x.age < 60 && x.age >= 50).length);
        D60_data.push(max_int_arr[i].filter(x => x.age <= 120 && x.age >= 60).length);
    }
};