// import { Ghost} from "./functions/ghost.js";

const pakman = document.getElementById("pakman");
const frame = document.getElementById("frame");
const audioSwallow = new Audio('./audio/195929_1459167-lq.mp3');
const audioWin = new Audio('./audio/578572_10522382-lq.mp3');
const audioDeath = new Audio('./audio/death.mp3');
var sumBalls = document.getElementById("sumBalls")
const ghost1 = document.getElementById("ghost");

let marginHorizontal = 0;
let marginVertical = 0;

ghostAnimation(ghost1,50,10);

function movePakman(e) {

    switch (e.key) {
        case "ArrowRight":
            pakman.style.transform = 'rotateY(0deg)';
            marginHorizontal += 10;
            break;
        case "ArrowLeft":
            pakman.style.transform = 'rotateY(180deg)';
            marginHorizontal -= 10;
            break
        case "ArrowDown":
            pakman.style.transform = 'rotate(90deg)';
            marginVertical += 10;
            break
        case "ArrowUp":
            pakman.style.transform = 'rotate(270deg)';
            marginVertical -= 10;
    }
    if(marginHorizontal > 93){marginHorizontal = 93};
    if(marginHorizontal < 0){ marginHorizontal = 0};
    if(marginVertical > 93){marginVertical = 93};
    if(marginVertical < 0){marginVertical = 0};

    swallowBall();
    pakmanAnimation();

    pakman.style.marginLeft = marginHorizontal + "%";
    pakman.style.marginTop = marginVertical + "%";

    
}

function creatBalls() {
    for (let i = 0; i != 100; i++) {
        const ball = createBall();
        frame.appendChild(ball);
    }
    balls = document.getElementsByClassName("ball");
    console.log(balls)
}


function createBall() {
    const div = document.createElement('div');
    div.setAttribute('class', "ball");
    return div;
}

function swallowBall(){
    let location = pakman.getBoundingClientRect();
    let locationXstart = location.x;
    let locationXend = Number(location.x + location.width);
    let locationYstart = location.y;
    let locationYend = Number(location.y + location.height);

    for (let i = 0; i < balls.length; i++){
        let locationBall = balls[i].getBoundingClientRect();
        if (locationBall.x >= locationXstart && locationBall.x <= locationXend && locationBall.y >= locationYstart && locationBall.y <= locationYend){
                if(balls[i].id=="golden-egg"){  document.getElementsByClassName("ghost")[0].style.display = "none"};
                balls[i].setAttribute('class', "hidden-ball");
                audioSwallow.play();
        }
    }
    sumBalls.innerHTML = 100 - document.getElementsByClassName("hidden-ball").length;
    if (document.getElementsByClassName("hidden-ball").length == 25){
        let ghosts = document.getElementsByClassName("ghost");
        if(ghosts.length == 1){
            let ghost2 = new Ghost(2,93,100);
            frame.insertAdjacentElement('afterbegin', ghost2.element);
            ghostAnimation(ghost2.element,20,20);
            let goldenEgg = document.getElementsByClassName("ball")[Math.floor(Math.random() * document.getElementsByClassName("ball").length)];
            goldenEggAnimation(goldenEgg)
        }
    }
    if (document.getElementsByClassName("hidden-ball").length == 100){
        audioWin.play();
        alert("אתה אלוף!");
        window.location.reload();
    }
}

function pakmanAnimation(){
    mouth = document.getElementById("mouth");
    if (mouth.style.backgroundColor == "white"){
        mouth.style.backgroundColor = "red"
    }else{
        mouth.style.backgroundColor = "white"
    }
}


function ghostAnimation(ghost, fast, steps){

    let num = 0;
    let random = 0;
    let marginHorizontalGhost = 100;
    let marginVerticalGhost = 93;
    setInterval(()=>{
        num += 1;
        if (num % steps == 0){
             random = Math.floor(Math.random() * 4);
        }
        switch (random) {
            case 0:
                marginHorizontalGhost += 2;
                break;
            case 1:
                marginHorizontalGhost -= 2;
                break
            case 2:
                marginVerticalGhost += 2;
                break
            case 3:
                marginVerticalGhost -= 2;
        }

        
        ghost.style.marginLeft = marginHorizontalGhost + "%";
        ghost.style.marginTop = marginVerticalGhost + "%";
        

    if(marginHorizontalGhost > 93){marginHorizontalGhost = 93};
    if(marginHorizontalGhost < 0){ marginHorizontalGhost = 0};
    if(marginVerticalGhost > 93){marginVerticalGhost = 93};
    if(marginVerticalGhost < 0){marginVerticalGhost = 0};

    if(ghost.style.display != 'none' && marginHorizontalGhost >= marginHorizontal && marginHorizontalGhost <= (marginHorizontal + 7) && marginVerticalGhost >= marginVertical && marginVerticalGhost <= (marginVertical + 7)){
        audioDeath.play();
        marginHorizontal = "0%";
        marginVertical = "0%"
        let i = 6;
        setInterval(()=>{
            if (i > 0){pakman.style.height = i + "%"; pakman.style.width = i + "%"}else{
                window.location.reload();
                alert("אבוד:-(");
            }
            i--;
        },100)
    }
    },fast)
}

function goldenEggAnimation(element){
    element.setAttribute('id', 'golden-egg');

    setInterval(()=>{
        if (element.style.backgroundColor == "gold"){
            element.style.backgroundColor = "gray"
        }else{
            element.style.backgroundColor = "gold"; 
        }
    },100)
}


//contractors

function Ghost(id ,marginLeft, marginTop){
    this.id = id;

    this.element = document.createElement('div');
    this.element.classList.add("ghost");
    this.element.style.marginLeft = marginLeft + "%";
    this.element.style.marginTop = marginTop + "%";
    this.element.style.backgroundColor = "black";

    //סנפירים
    let sticks = ` <div style="height: 100%; width: 5%; background-color: black; display: inline-block; margin-left: 15%;"></div>
                        <div style="height: 100%; width: 5%; background-color: black; display: inline-block; margin-right: 15%; float: right;"></div>`;
    this.element.innerHTML += sticks; 
}