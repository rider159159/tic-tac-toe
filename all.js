let startBtn = document.querySelector('.startBtn');
let restart = document.querySelector('.restartBtn');
let game = document.querySelector('.game');
let inTheGmae = false;
let oxStatus = false;
let winning_array = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
let circle_array = []
let cross_array = []
let owin = document.querySelector('.o-win')
let xwin = document.querySelector('.x-win')
let draw = document.querySelector('.draw')
let winOScore = Number(localStorage.getItem('Score-O'))||0;
let winXScore = Number(localStorage.getItem('Score-X')) || 0;
//監聽
restart.addEventListener('click', restartgame)
startBtn.addEventListener('click', start)
game.addEventListener('click', function (e) {
    showClick(e)
})

//點極start開啟play關閉start
function start(e) {
    let startPicture = document.querySelector('.start');
    let playPicture = document.querySelector('.play');
    startPicture.classList.add("hide");
    playPicture.classList.remove("hide");
    document.body.style.backgroundColor = '#FF6D70';
    updataScore()
}

//restrat初始化設定
function restartgame() {
    const ox = document.querySelectorAll('.ox');
    circle_array = [];
    cross_array = [];
    oxStatus = false;
    owin.classList.add('hide');
    xwin.classList.add('hide');
    draw.classList.add('hide');
    game.classList.remove('hide');
    //透過ox選取所有九宮格並移除內容
    ox.forEach(o => o.textContent = '');
   
    for (let i = 0; i < ox.length; i++) {
        ox[i].setAttribute('id', 'open')
    }
    yourTurn()
    updataScore()
}
//判斷並顯示O、X符號
function showClick(e) {
    let check = e.target.getAttribute("id") == 'open'
    let data = e.target
    if (!check) { return }
    if (!oxStatus) {
        e.target.innerHTML = '<div class="circle"></div>';
        getData(data, circle_array)
    }
    else {
        e.target.innerHTML = '<div class="cross"></div>';
        getData(data, cross_array)
    }
    data.removeAttribute('id')
}

//將九宮格位置帶入陣列
function getData(data, oxarray) {
    let box = data.getAttribute("data-box");
    if (!oxStatus) {
        circle_array.push(box)
        oxStatus = !oxStatus;
    }
    else {
        cross_array.push(box)
        oxStatus = !oxStatus;
    }
    yourTurn()
    checkWin(oxarray)   
}
function yourTurn() {
    let Xturn = document.querySelector('.x-turn');
    let Oturn = document.querySelector('.o-turn');
    let Xmark = document.querySelector('.x-mark');
    let Omark = document.querySelector('.o-mark')
    Xturn.style.visibility = oxStatus ? 'visible' : 'hidden';
    Oturn.style.visibility = !oxStatus ? 'visible' : 'hidden';
    Xmark.style.backgroundColor = oxStatus ? '#ED494C' : 'black';
    Omark.style.backgroundColor = !oxStatus ? '#ED494C' : 'black';
}
function updataScore(){
    const scoreX = document.querySelector('.x-score');
    const scoreO = document.querySelector('.o-score');
    localStorage.setItem('Score-O', winOScore);
    scoreO.textContent = winOScore;
    localStorage.setItem('Score-X', winXScore)
    scoreX.textContent = winXScore;

}
//檢查是否有獲勝，並顯示結果設定
function checkWin(oxarray) {
    //將陣列中字串數字變為純數字字串
    let comp = oxarray.map(val => parseInt(val, 10)).sort();
    for (let i = 0; i < winning_array.length; i++) {
        //輸入的ox字串去比對三連字串，0、1、2都有回傳true
        let answerarry = comp.includes(winning_array[i][0]) &&
            comp.includes(winning_array[i][1]) &&
            comp.includes(winning_array[i][2])
        //o win
            if (answerarry && oxStatus == true) {
            game.classList.add('hide');
            owin.classList.remove('hide');
            draw.classList.add('hide')
            winOScore += 1
            updataScore()
            return
        }
        //x win
        if (answerarry && oxStatus== false) {
            game.classList.add('hide');
            xwin.classList.remove('hide');
            winXScore+=1
            updataScore()
            return
        }
       
        if (circle_array.length + cross_array.length == 9) {
            game.classList.add('hide');
            draw.classList.remove('hide');
            
    }
}
}
