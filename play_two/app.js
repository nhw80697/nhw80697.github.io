const pakman = document.getElementById("pakman");
const frame = document.getElementById("frame");
const audioSwallow = new Audio('./195929_1459167-lq.mp3');
const audioWin = new Audio('./578572_10522382-lq.mp3');
var sumBalls = document.getElementById("sumBalls")

let marginHorizontal = 0;
let marginVertical = 0;

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
        ball.addEventListener('click', function (event) {
            console.log(event)
        })
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
                balls[i].setAttribute('class', "hidden-ball");
                audioSwallow.play();
        }
    }
    sumBalls.innerHTML = 100 - document.getElementsByClassName("hidden-ball").length;
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