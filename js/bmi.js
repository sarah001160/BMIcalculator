var list = document.querySelector('.show_result');
var send = document.querySelector('.btn_send');
var data = JSON.parse(localStorage.getItem('listData'))||[];//順序要放對,A||B,A或B,沒有A就用B

send.addEventListener('click',addData,false);//點選按鈕傳送身高體重資料
list.addEventListener('click',toggleDone,false);//點選a連結刪除顯示的結果
updateList(data);//出現介面,沒寫這一句則重新整理後介面會空白

function addData(e){//加入資料函式
    var heightStr = document.getElementById('height').value;//取得身高欄位資料
    var weightStr = document.getElementById('weight').value;//取得體重欄位資料
    
    var heightnum = parseInt(heightStr);//字串轉為數值
    var weightnum = parseInt(weightStr);
    var BMInum = weightnum/((heightnum/100)*(heightnum/100));//BMI公式
    var BMInumInteger = BMInum.toFixed(2);//取到小數點第二位
    let status = '';
    let BMIcolor = '';
    console.log(BMInumInteger);
    if(BMInumInteger<18.5){//判斷BMI落點
        status = '體重過輕'
        BMIcolor = 'lesscolor'//lessscolor是class名稱,JS可以直接呼叫class名稱但要用字串表示
    }else if(BMInumInteger<24 && BMInum>=17.5){
        status ='正常範圍'
        BMIcolor = 'finecolor'
    }else if(BMInumInteger<27 && BMInum>=24){
        status = '體重過重'
        BMIcolor = 'medcolor' 
    }else if(BMInumInteger<30 && BMInum>=27){
        status = '輕度肥胖'
        BMIcolor ='medcolor' 
    }else if(BMInumInteger<35 && BMInum>=30){
        status = '中度肥胖'
        BMIcolor = 'medcolor' 
    }else if(BMInumInteger>=35){
        status = '重度肥胖'
        BMIcolor = 'fatcolor' 
    }

    var todo = {//建立物件
        BMIresult:status,
        tagcolor:BMIcolor,
        BMIindex:BMInumInteger,
        tall:heightnum,
        heavy:weightnum
    }
    if(heightStr && weightStr !==''){//身高體重必須輸入後.資料才能傳送到localstorage儲存
        data.push(todo);//把物件推到data空陣列中
        localStorage.setItem('listData',JSON.stringify(data));//更新localstorage資訊
        updateList(data);//更新介面
    }else{
    alert('不得空白') }
}

function updateList(items){//設定介面更新
    console.log(items);
    var len = items.length;//算算data的陣列裡共有幾個物件,底下跑for迴圈
    var today = new Date();
    var str='';
    for(let i=0;i<len;i++){
          str+=`<li class="`+items[i].tagcolor+`">
                    <ul>
                    <li class="BMIstyle"><p>`+items[i].BMIresult+`</p></li>
                    <li class="BMIstyle"><p class="F-small">BMI:</p><p>`+items[i].BMIindex+`</p></li>
                    <li class="BMIstyle"><p class="F-small">weight</p><p>` +items[i].heavy+ `kg</p></li>
                    <li class="BMIstyle"><p class="F-small">height</p><p>`+items[i].tall+`cm</p></li>
                    <li class="BMIstyle"><p class="F-small">Date:`+today.getFullYear()+`/`+(today.getMonth()+1)+`/`+today.getDate()+`</p></li>
                    <li class="BMIstyle"><a style="float:left;margin-top:20px;"  href="#" data-num>移除</a></li> 
                </ul>
            </li>`
           
    }
    list.innerHTML = str;
}  
function toggleDone(e){//刪除顯示資料的函示設定
    e.preventDefault();//不觸發連結
    if(e.target.tagName !== 'A'){return};//不是<a>標籤就不起作用
        var index = e.target.dataset.num;//e.target被觸發事件中指定有data-num的標籤
    data.splice(index,1);//刪除data陣列中有data-num的標籤,一次刪一筆
localStorage.setItem('lisData',JSON.stringify(data));//更新localStorage資訊
updateList(data);//更新介面
}
