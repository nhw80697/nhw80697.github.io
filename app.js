function addBoard(){
    var mainBoardTemplet = `<div class="main_board"></div>`;
    var squareTemplet = ` <div class="square" ></div><div class="square" ></div><div class="square" ></div><div class="square" ></div><div class="square" ></div>`;

    document.body.innerHTML += mainBoardTemplet;
    const main_board = document.getElementsByClassName("main_board");
    main_board[main_board.length-1].innerHTML += squareTemplet;
}

var random = randomNumber();
var string = [];
function addKey(e){    
    let main_board = document.getElementsByClassName("main_board");
    let squares = main_board[main_board.length-1].childNodes;

    if (!isNaN(e.key) && string.length < 5){
        string.push(e.key);
        squares[string.length].innerHTML = e.key;
    }

    if (e.keyCode === 13 && string.length == 5){
        let sumString = 0;
        [...random].forEach((value, key) => {
            string.forEach((valueString, keyString)=>{
                if (value == valueString && key == keyString){
                    squares[key + 1].style = "background-color: red";
                    string[key] = 10;
                    console.log(string[key]);
                }else if(value == valueString){
                    squares[keyString + 1].style = "background-color: yellow";
                }
            })
        });
        string.forEach(valueString => {sumString += Number(valueString)})
        if (sumString == 50){endPlay(main_board.length)}
        console.log(sumString)
        string = [];
        addBoard()
    }
}

function randomNumber(){
    let num = Math.random() * 100000;
    while (num < 10000){num = Math.random() * 100000;}
    num = Math.round(num).toString();
    return num;
}

function endPlay(guesses){
    let numGuesses = guesses;
    alert("סיימת את המשחק תוך" + numGuesses + " ניחושים!");
    location.reload();
}

addBoard();


