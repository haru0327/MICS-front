/*
MICS Front
データ成形
*/
class DataIN{
    constructor(d1, d2, InterestData){
        
        //選択期間
        let bet_time=d2-d1;

  
        //選択期間　0分～3時間
        if(bet_time<10800 && bet_time>=0){
            this.data_process(10800,600,18,d1,d2,InterestData);
            console.log("[Info] 0~3hour");
        }
        //選択期間　3時間～1日
        else if (bet_time<86400 && bet_time>=10800){
            this.data_process(86400,3600,24,d1,d2,InterestData);
            console.log("[Info] 3h~1d");
        
        }
        //選択期間　1日～31日
        else if(bet_time<=2678400 && bet_time>=86400){
            this.data_process(2678400,86400,31,d1,d2,InterestData);
            console.log("[Info] 1d~31d");
        };

    };

    //データ分割関数
    data_process(max_time,div_time,plot_num,user_intime,user_outtime,InterestData){

        let backdata_arr = JSON.parse(InterestData);

        //関心度調整変数
        let max_intline = 45;
        let not_intline = 20;

        //graphプロットデータ変数
        this.A1_data  = [];
        this.A21_data = [];
        this.A22_data = [];

        this.B1_10_data = [];
        this.B1_20_data = [];
        this.B1_30_data = [];
        this.B1_40_data = [];
        this.B1_50_data = [];
        this.B1_60_data = [];

        this.B2_10_data = [];
        this.B2_20_data = [];
        this.B2_30_data = [];
        this.B2_40_data = [];
        this.B2_50_data = [];
        this.B2_60_data = [];

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
        for(let h = user_intime - 32400 ; h < (user_outtime - 32400) + div_time ; h = h + div_time){
            label_unix_in.push(h);
        };

        for(let i=0 ;i<plot_num ;i=i+1){
            let label_time_in = new Date(label_unix_in[i] * 1000);
            let label_time_in_2 = label_time_in.getMonth() + 1 + "/" + label_time_in.getDate() + "/ " + label_time_in.getHours() + ":" + label_time_in.getMinutes();
            this.label_time_arr.push(label_time_in_2);
        };

        //関心度分割
        let all_max_int_arr   = backdata_arr.filter(x => x.interested <= 100 && x.interested > max_intline);
        let all_nomal_int_arr = backdata_arr.filter(x => x.interested <= max_intline && x.interested > not_intline);
        let all_all_int_arr   = backdata_arr.filter(x => x.interested <= 100 && x.interested > not_intline);
        let all_not_int_arr   = backdata_arr.filter(x => x.interested <= not_intline && x.interested >= 0);           


        //性別分割
        let all_mail_max_int_arr_in   = all_max_int_arr.filter(x => x.gender === 0);
        let all_femail_max_int_arr_in = all_max_int_arr.filter(x => x.gender === 1);
        let all_mail_all_int_arr_in   = all_all_int_arr.filter(x => x.gender === 0);
        let all_femail_all_int_arr_in = all_all_int_arr.filter(x => x.gender === 1);

        //時間分割無しのgraphプロット変数in
        //A1
        this.A1_data = [all_max_int_arr.length ,all_nomal_int_arr.length ,all_not_int_arr.length];

        //A21
        this.A21_data = [all_mail_max_int_arr_in.length ,all_femail_max_int_arr_in.length];

        //A22
        this.A22_data = [all_mail_all_int_arr_in.length ,all_femail_all_int_arr_in.length] ;    

        //B1
        let B1_mail_10_data_in   = all_mail_max_int_arr_in.filter(x => x.age < 20);    
        let B1_mail_20_data_in   = all_mail_max_int_arr_in.filter(x => x.age < 30 && x.age >= 20);    
        let B1_mail_30_data_in   = all_mail_max_int_arr_in.filter(x => x.age < 40 && x.age >= 30);
        let B1_mail_40_data_in   = all_mail_max_int_arr_in.filter(x => x.age < 50 && x.age >= 40);
        let B1_mail_50_data_in   = all_mail_max_int_arr_in.filter(x => x.age < 60 && x.age >= 50);    
        let B1_mail_60_data_in   = all_mail_max_int_arr_in.filter(x => x.age <= 120 && x.age >= 60);
        let B1_femail_10_data_in = all_femail_max_int_arr_in.filter(x => x.age < 20);      
        let B1_femail_20_data_in = all_femail_max_int_arr_in.filter(x => x.age < 30 && x.age >= 20);      
        let B1_femail_30_data_in = all_femail_max_int_arr_in.filter(x => x.age < 40 && x.age >= 30);  
        let B1_femail_40_data_in = all_femail_max_int_arr_in.filter(x => x.age < 50 && x.age >= 40);  
        let B1_femail_50_data_in = all_femail_max_int_arr_in.filter(x => x.age < 60 && x.age >= 50);       
        let B1_femail_60_data_in = all_femail_max_int_arr_in.filter(x => x.age <= 120 && x.age >= 60);

        this.B1_10_data = [B1_mail_10_data_in.length,B1_femail_10_data_in.length];
        this.B1_20_data = [B1_mail_20_data_in.length,B1_femail_20_data_in.length];
        this.B1_30_data = [B1_mail_30_data_in.length,B1_femail_30_data_in.length];
        this.B1_40_data = [B1_mail_40_data_in.length,B1_femail_40_data_in.length];
        this.B1_50_data = [B1_mail_50_data_in.length,B1_femail_50_data_in.length];
        this.B1_60_data = [B1_mail_60_data_in.length,B1_femail_60_data_in.length];

        //B2
        let B2_mail_10_data_in   = all_mail_all_int_arr_in.filter(x => x.age < 20);           
        let B2_mail_20_data_in   = all_mail_all_int_arr_in.filter(x => x.age < 30 && x.age >= 20);           
        let B2_mail_30_data_in   = all_mail_all_int_arr_in.filter(x => x.age < 40 && x.age >= 30);       
        let B2_mail_40_data_in   = all_mail_all_int_arr_in.filter(x => x.age < 50 && x.age >= 40);       
        let B2_mail_50_data_in   = all_mail_all_int_arr_in.filter(x => x.age < 60 && x.age >= 50);            
        let B2_mail_60_data_in   = all_mail_all_int_arr_in.filter(x => x.age <= 120 && x.age >= 60);      
        let B2_femail_10_data_in = all_femail_all_int_arr_in.filter(x => x.age < 20);            
        let B2_femail_20_data_in = all_femail_all_int_arr_in.filter(x => x.age < 30 && x.age >= 20);            
        let B2_femail_30_data_in = all_femail_all_int_arr_in.filter(x => x.age < 40 && x.age >= 30);        
        let B2_femail_40_data_in = all_femail_all_int_arr_in.filter(x => x.age < 50 && x.age >= 40);        
        let B2_femail_50_data_in = all_femail_all_int_arr_in.filter(x => x.age < 60 && x.age >= 50);             
        let B2_femail_60_data_in = all_femail_all_int_arr_in.filter(x => x.age <= 120 && x.age >= 60);   

        this.B2_10_data = [B2_mail_10_data_in.length,B2_femail_10_data_in.length];
        this.B2_20_data = [B2_mail_20_data_in.length,B2_femail_20_data_in.length];
        this.B2_30_data = [B2_mail_30_data_in.length,B2_femail_30_data_in.length];
        this.B2_40_data = [B2_mail_40_data_in.length,B2_femail_40_data_in.length];
        this.B2_50_data = [B2_mail_50_data_in.length,B2_femail_50_data_in.length];
        this.B2_60_data = [B2_mail_60_data_in.length,B2_femail_60_data_in.length];


        //時間分割
        for(let i=0 ;i<max_time ;i=i+div_time){
            let backdata_arr_time_in = backdata_arr.filter(x => x.end_time_unix <= user_intime+(i+div_time) && x.end_time_unix > user_intime + i);
            backdata_arr_time.push(backdata_arr_time_in);
        };


        for(let i=0 ;i<plot_num ;i=i+1){
            //関心度分割
            let max_int_arr_in = backdata_arr_time[i].filter(x => x.interested <= 100 && x.interested >= max_intline);
            max_int_arr.push(max_int_arr_in);

            let nomal_int_arr_in = backdata_arr_time[i].filter(x => x.interested < max_intline && x.interested > not_intline);
            nomal_int_arr.push(nomal_int_arr_in);

            let all_int_arr_in = backdata_arr_time[i].filter(x => x.interested <= 100 && x.interested > not_intline);
            all_int_arr.push(all_int_arr_in);

            let not_int_arr_in = backdata_arr_time[i].filter(x => x.interested <= not_intline && x.interested >=0);
            not_int_arr.push(not_int_arr_in);

            //性別分割
            let mail_max_int_arr_in = max_int_arr[i].filter(x => x.gender === 0);
            male_max_int_arr.push(mail_max_int_arr_in);
            
            let femail_max_int_arr_in = max_int_arr[i].filter(x => x.gender === 1);
            female_max_int_arr.push(femail_max_int_arr_in);

            let mail_all_int_arr_in = all_int_arr[i].filter(x => x.gender === 0);
            male_all_int_arr.push(mail_all_int_arr_in);
            
            let femail_all_int_arr_in = all_int_arr[i].filter(x => x.gender === 1);
            female_all_int_arr.push(femail_all_int_arr_in);


            //プロットデータ作成

            //C1
            this.C1_maxint_data.push(max_int_arr[i].length);
            this.C1_nomalint_data.push(nomal_int_arr[i].length);
            this.C1_notint_data.push(not_int_arr[i].length);

            //D11
            let D11_10_data_in = max_int_arr[i].filter(x => x.age < 20);
            let D11_20_data_in = max_int_arr[i].filter(x => x.age < 30 && x.age >= 20);
            let D11_30_data_in = max_int_arr[i].filter(x => x.age < 40 && x.age >= 30);
            let D11_40_data_in = max_int_arr[i].filter(x => x.age < 50 && x.age >= 40);
            let D11_50_data_in = max_int_arr[i].filter(x => x.age < 60 && x.age >= 50);
            let D11_60_data_in = max_int_arr[i].filter(x => x.age <= 120 && x.age >= 60);

            this.D11_10_data.push(D11_10_data_in.length); 
            this.D11_20_data.push(D11_20_data_in.length); 
            this.D11_30_data.push(D11_30_data_in.length);
            this.D11_40_data.push(D11_40_data_in.length);
            this.D11_50_data.push(D11_50_data_in.length);
            this.D11_60_data.push(D11_60_data_in.length);

            //D12
            let D12_10_data_in = male_max_int_arr[i].filter(x => x.age < 20);
            let D12_20_data_in = male_max_int_arr[i].filter(x => x.age < 30 && x.age >= 20);
            let D12_30_data_in = male_max_int_arr[i].filter(x => x.age < 40 && x.age >= 30);
            let D12_40_data_in = male_max_int_arr[i].filter(x => x.age < 50 && x.age >= 40);
            let D12_50_data_in = male_max_int_arr[i].filter(x => x.age < 60 && x.age >= 50);
            let D12_60_data_in = male_max_int_arr[i].filter(x => x.age <= 120 && x.age >= 60); 

            this.D12_10_data.push(D12_10_data_in.length);
            this.D12_20_data.push(D12_20_data_in.length);
            this.D12_30_data.push(D12_30_data_in.length);
            this.D12_40_data.push(D12_40_data_in.length);
            this.D12_50_data.push(D12_50_data_in.length);
            this.D12_60_data.push(D12_60_data_in.length);

            //D13
            let D13_10_data_in = female_max_int_arr[i].filter(x => x.age < 20);
            let D13_20_data_in = female_max_int_arr[i].filter(x => x.age < 30 && x.age >= 20);
            let D13_30_data_in = female_max_int_arr[i].filter(x => x.age < 40 && x.age >= 30);
            let D13_40_data_in = female_max_int_arr[i].filter(x => x.age < 50 && x.age >= 40);
            let D13_50_data_in = female_max_int_arr[i].filter(x => x.age < 60 && x.age >= 50);
            let D13_60_data_in = female_max_int_arr[i].filter(x => x.age <= 120 && x.age >= 60);

            this.D13_10_data.push(D13_10_data_in.length);
            this.D13_20_data.push(D13_20_data_in.length);
            this.D13_30_data.push(D13_30_data_in.length);
            this.D13_40_data.push(D13_40_data_in.length);
            this.D13_50_data.push(D13_50_data_in.length);
            this.D13_60_data.push(D13_60_data_in.length);

            //D21
            let D21_10_data_in = all_int_arr[i].filter(x => x.age < 20);
            let D21_20_data_in = all_int_arr[i].filter(x => x.age < 30 && x.age >= 20);
            let D21_30_data_in = all_int_arr[i].filter(x => x.age < 40 && x.age >= 30);
            let D21_40_data_in = all_int_arr[i].filter(x => x.age < 50 && x.age >= 40);
            let D21_50_data_in = all_int_arr[i].filter(x => x.age < 60 && x.age >= 50);
            let D21_60_data_in = all_int_arr[i].filter(x => x.age <= 120 && x.age >= 60);

            this.D21_10_data.push(D21_10_data_in.length);
            this.D21_20_data.push(D21_20_data_in.length);
            this.D21_30_data.push(D21_30_data_in.length);
            this.D21_40_data.push(D21_40_data_in.length);
            this.D21_50_data.push(D21_50_data_in.length);
            this.D21_60_data.push(D21_60_data_in.length);

            //D22
            let D22_10_data_in = male_all_int_arr[i].filter(x => x.age < 20);
            let D22_20_data_in = male_all_int_arr[i].filter(x => x.age < 30 && x.age >= 20);
            let D22_30_data_in = male_all_int_arr[i].filter(x => x.age < 40 && x.age >= 30);
            let D22_40_data_in = male_all_int_arr[i].filter(x => x.age < 50 && x.age >= 40);
            let D22_50_data_in = male_all_int_arr[i].filter(x => x.age < 60 && x.age >= 50);
            let D22_60_data_in = male_all_int_arr[i].filter(x => x.age <= 120 && x.age >= 60);

            this.D22_10_data.push(D22_10_data_in.length);
            this.D22_20_data.push(D22_20_data_in.length);
            this.D22_30_data.push(D22_30_data_in.length);
            this.D22_40_data.push(D22_40_data_in.length);
            this.D22_50_data.push(D22_50_data_in.length);
            this.D22_60_data.push(D22_60_data_in.length);

            //D23
            let D23_10_data_in = female_all_int_arr[i].filter(x => x.age < 20);
            let D23_20_data_in = female_all_int_arr[i].filter(x => x.age < 30 && x.age >= 20);
            let D23_30_data_in = female_all_int_arr[i].filter(x => x.age < 40 && x.age >= 30);
            let D23_40_data_in = female_all_int_arr[i].filter(x => x.age < 50 && x.age >= 40);
            let D23_50_data_in = female_all_int_arr[i].filter(x => x.age < 60 && x.age >= 50);
            let D23_60_data_in = female_all_int_arr[i].filter(x => x.age <= 120 && x.age >= 60); 

            this.D23_10_data.push(D23_10_data_in.length);
            this.D23_20_data.push(D23_20_data_in.length);
            this.D23_30_data.push(D23_30_data_in.length);
            this.D23_40_data.push(D23_40_data_in.length);
            this.D23_50_data.push(D23_50_data_in.length);
            this.D23_60_data.push(D23_60_data_in.length);
        };
    };
};