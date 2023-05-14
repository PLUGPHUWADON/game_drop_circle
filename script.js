let btnplay = document.querySelector(".btnplay");
let boxgame = document.querySelector(".boxgame");
let points = document.querySelectorAll(".boxgame > div");
let Highscore = document.querySelector(".heightscore");
let Scoredefault = document.querySelector(".scoredefault");
let Counttime = document.querySelector(".counttime");

let pointposition = [];
let startspeed = [];
let speed = [];
let color = ["red","green","yellow","tomato","violet","red","green","yellow","tomato","violet"]

let counttime = 60;
let move;
let resetgame;

let highscore = parseInt(sessionStorage.getItem("high"));
if (isNaN(highscore)) {
    highscore = 0;
}
Highscore.innerHTML = `คะแนนสูงสุด : ${highscore}`;
let scoredefault = 0;

for (let i = 0 ; i < points.length ; i++) {
    pointposition[i] = Math.floor(Math.random() * window.innerWidth - 150) + 150;
    startspeed[i] = 0;
    speed[i] = Math.floor(Math.random() * 5) + 1;

    points[i].style.top = "0px";
    points[i].style.left = `${pointposition[i]}px`;
    points[i].style.backgroundColor = `${color[i]}`;
}

// click move
btnplay.addEventListener("click",() => {
    move = setInterval(() => {
        for (let i = 0 ; i < points.length ; i++) {
            startspeed[i] += speed[i];
            points[i].style.top = `${startspeed[i]}px`;
            if (startspeed[i] > window.innerHeight) {
                startspeed[i] = -60;
                pointposition[i] = Math.floor(Math.random() * window.innerWidth - 150) + 150;
                points[i].style.left = `${pointposition[i]}px`;
            }
        }
    },50);
    btnplay.style.display = "none";
    scoredefault = 0;
    Scoredefault.innerHTML = `คะแนน : ${scoredefault}`;


    Counttime.innerHTML = `นับถอยหลัง : ${counttime}`;
    resetgame = setInterval(() => {
        counttime -= 1;
        Counttime.innerHTML = `นับถอยหลัง : ${counttime}`;
        if(counttime == 0) {
            clearInterval(resetgame);
            clearInterval(move);
            btnplay.style.display = "grid";
            counttime = 60;
        }
    },1000);
});


// click remove
boxgame.addEventListener("click",(event) => {
    scoredefault += 1;
    Scoredefault.innerHTML = `คะแนน : ${scoredefault}`;
    if (scoredefault > highscore) {
        highscore += 1;
        sessionStorage.setItem("high",highscore);
        Highscore.innerHTML = `คะแนนสูงสุด : ${highscore}`;
    }
    const index = Array.from(boxgame.children).indexOf(event.target);
    event.target.style.display = "none"
    startspeed[index] = -60;
    pointposition[index] = Math.floor(Math.random() * window.innerWidth - 150) + 150;
    event.target.style.left = `${pointposition[index]}px`;
    let visible = setTimeout(() => {
        event.target.style.display = "block";
    },600);
});