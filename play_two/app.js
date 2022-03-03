const frame = document.getElementById("frame");
const ghost = new Ghost(1,100,100);
const pacman = new Pacman(0,0);
let ballsElements;
let sumBalls = document.querySelector("#sumBalls");

const audioSwallow = new Audio('./audio/195929_1459167-lq.mp3');
const audioWin = new Audio('./audio/578572_10522382-lq.mp3');
const audioDeath = new Audio('./audio/death.mp3');

function startPlay(){
    
    frame.appendChild(pacman.element);
    document.addEventListener('keydown', pacman.movePacman);

    for (let i = 0; i != 100; i++){
        let ball = new Ball(i+1,"gray");
        frame.appendChild(ball.element);
    }
    ballsElements = document.querySelectorAll(".ball")
}

function level(color, speed){
    ghost.element.style.backgroundColor = color;
    ghost.speed = speed;
    frame.appendChild(ghost.element);
    ghost.playAnimation();
    pacman.canMove = true;
}

function eatBall(){
    let location = pacman.element.getBoundingClientRect();
    let locationXstart = location.x;
    let locationXend = Number(location.x + location.width);
    let locationYstart = location.y;
    let locationYend = Number(location.y + location.height);

    for (let i = 0; i < ballsElements.length; i++){
        ballsElements = document.querySelectorAll(".ball")
        let locationBall = ballsElements[i].getBoundingClientRect();
        if (locationBall.x >= locationXstart && locationBall.x <= locationXend && locationBall.y >= locationYstart && locationBall.y <= locationYend){
            ballsElements[i].setAttribute('class', "hidden-ball");
            audioSwallow.play();
            break;
        }
    }
    let hiddenBallsElements = document.querySelectorAll(".hidden-ball");
    sumBalls.innerHTML = 100 - hiddenBallsElements.length;
    if (hiddenBallsElements.length == 100){
        audioWin.play();
        alert("ניצחון");
        window.location.reload();
    }
}

//contractors
function Pacman(marginLeft, marginTop){
    this.marginLeft = marginLeft;
    this.marginTop = marginTop;
    this.width = 10;
    this.height = 10;

    this.element = document.createElement('div');
    this.element.classList.add("pacman");
    this.eye = '<div class="eye"></div>';
    this.mouth = '<div class="mouth"></div>';

    this.element.innerHTML += this.eye;
    this.element.innerHTML += this.mouth;

    this.canMove = false;

    this.movePacman = (e) => {
        
        if (this.canMove == false){return}
        switch (e.key) {
            case "ArrowRight":
                this.element.style.transform = 'rotateY(0deg)';
                this.marginLeft += 10;
                break;
            case "ArrowLeft":
                this.element.style.transform = 'rotateY(180deg)';
                this.marginLeft -= 10;
                break
            case "ArrowDown":
                this.element.style.transform = 'rotate(90deg)';
                this.marginTop += 10;
                break
            case "ArrowUp":
                this.element.style.transform = 'rotate(270deg)';
                this.marginTop -= 10;
        }

        if(this.marginLeft >= (100 - this.width)){this.marginLeft = (100 - this.width)}
            if(this.marginTop >= (100 - this.height)){this.marginTop = (100 - this.height)}
            if(this.marginLeft <= 0){this.marginLeft = 0}
            if(this.marginTop <= 0){this.marginTop = 0}
        
        this.element.style.marginLeft = this.marginLeft + "%";
        this.element.style.marginTop = this.marginTop + "%";

        let mouth = document.querySelector(".mouth");
        mouth.style.backgroundColor ==  "white" ? mouth.style.backgroundColor = "orange" : mouth.style.backgroundColor = "white";

        eatBall();
    }
}

function Ball(id, color){
    this.element = document.createElement('div');
    this.element.classList.add("ball");
    this.element.style.backgroundColor = color;
}

function Ghost(id ,marginLeft, marginTop){
    this.id = id;
    this.animation = true;

    this.marginLeft = marginLeft;
    this.marginTop = marginTop;
    this.width = 10;
    this.height = 10;

    this.speed = 10;
    this.steps = 20;

    this.element = document.createElement('div');
    this.element.classList.add("ghost");
    this.element.style.marginLeft = marginLeft + "%";
    this.element.style.marginTop = marginTop + "%";
    this.element.style.backgroundColor = "black";

    let sticks = `<div class="stick" style="margin-left: 15%;"></div><div class="stick" style="margin-right: 15%; float: right;"></div>`;
    this.element.innerHTML += sticks;

    this.playAnimation = ()=>{
        let counter = 0;
        let random = 0;
        setInterval(()=>{
            counter++;
            if (this.animation == false){return}
            if (counter % this.steps == 0){
                random = Math.floor(Math.random() * 4);
            }
            switch (random) {
                case 0:
                    this.marginLeft += 1;
                    break;
                case 1:
                    this.marginLeft -= 1;
                    break
                case 2:
                    this.marginTop += 1;
                    break
                case 3:
                    this.marginTop -= 1;
            }

            if(this.marginLeft >= (100 - this.width)){this.marginLeft = (100 - this.width)}
            if(this.marginTop >= (100 - this.height)){this.marginTop = (100 - this.height)}
            if(this.marginLeft <= 0){this.marginLeft = 0}
            if(this.marginTop <= 0){this.marginTop = 0}

            this.element.style.marginLeft = this.marginLeft + "%";
            this.element.style.marginTop = this.marginTop + "%";

            if((this.marginLeft + (this.width-2)) > pacman.marginLeft &&
                this.marginLeft < (pacman.marginLeft + (pacman.width-2)) && 
                (this.marginTop + (this.height-2)) > pacman.marginTop &&
                this.marginTop < (pacman.marginTop + (pacman.height-2)) 
                ){
                    this.deathAnimation();
                    console.log(this.marginLeft + " " + pacman.marginLeft)
                    console.log(this.marginTop + " " + pacman.marginTop)   
                }
        },this.speed)
    }

    this.deathAnimation = ()=>{
        pacman.canMove = false;
        this.animation = false;
        let lenAnimationSec = 100;
        setInterval(() => {
            if(lenAnimationSec > 0){
                audioDeath.play();
                pacman.width = (lenAnimationSec / 10);
                pacman.height = (lenAnimationSec / 10);
                pacman.element.style.width = pacman.width + "%";
                pacman.element.style.height = pacman.height + "%";
            }else{
                window.location.reload();
                alert("אבוד");
            }
            lenAnimationSec--;
        }, 10);
    }
}
startPlay();
// function swallowBall(){
//     let location = pakman.getBoundingClientRect();
//     let locationXstart = location.x;
//     let locationXend = Number(location.x + location.width);
//     let locationYstart = location.y;
//     let locationYend = Number(location.y + location.height);

//     for (let i = 0; i < balls.length; i++){
//         let locationBall = balls[i].getBoundingClientRect();
//         if (locationBall.x >= locationXstart && locationBall.x <= locationXend && locationBall.y >= locationYstart && locationBall.y <= locationYend){
//                 if(balls[i].id=="golden-egg"){  document.getElementsByClassName("ghost")[0].style.display = "none"};
//                 balls[i].setAttribute('class', "hidden-ball");
//                 audioSwallow.play();
//         }
//     }
//     sumBalls.innerHTML = 100 - document.getElementsByClassName("hidden-ball").length;
//     if (document.getElementsByClassName("hidden-ball").length == 25){
//         let ghosts = document.getElementsByClassName("ghost");
//         if(ghosts.length == 1){
//             let ghost2 = new Ghost(2,93,100);
//             frame.insertAdjacentElement('afterbegin', ghost2.element);
//             ghostAnimation(ghost2.element,20,20);
//             let goldenEgg = document.getElementsByClassName("ball")[Math.floor(Math.random() * document.getElementsByClassName("ball").length)];
//             goldenEggAnimation(goldenEgg)
//         }
//     }
//     if (document.getElementsByClassName("hidden-ball").length == 100){
//         audioWin.play();
//         alert("אתה אלוף!");
//         window.location.reload();
//     }
// }

// function pakmanAnimation(){
//     mouth = document.getElementById("mouth");
//     if (mouth.style.backgroundColor == "white"){
//         mouth.style.backgroundColor = "red"
//     }else{
//         mouth.style.backgroundColor = "white"
//     }
// }


// function goldenEggAnimation(element){
//     element.setAttribute('id', 'golden-egg');

//     setInterval(()=>{
//         if (element.style.backgroundColor == "gold"){
//             element.style.backgroundColor = "gray"
//         }else{
//             element.style.backgroundColor = "gold"; 
//         }
//     },100)
// }