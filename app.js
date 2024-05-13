let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; //player X , player O
let count = 0; //to track tie between two players

//Winning conditions
const winPatterns = [ 
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


//Reset button
const resetGame = () =>
{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};


// each player turns
boxes.forEach((box) => {
    box.addEventListener("click",() => {
        
        if(turnO){
            //player O
            box.innerText = "O";
            turnO = false;
        } else{
            //Player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

       let isWinner =  checkWinner();
        
       if(count === 9 && !isWinner){
        gameDraw();
       }
    });
});

//draw function
const gameDraw = () => {
    msg.innerText = `Game was a draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
 
//Disabling the grid buttons
const disableBoxes = () => {
         for( let box of boxes){
            box.disabled = true;
         }
}
//Enable the  grid boxes
const enableBoxes = () => {
    for( let box of boxes){
       box.disabled = false;
       box.innerText = "";
    }
}


//Showing the winner
const showWinner = (winner) => {
           msg.innerText = `Congratulations, Winner is ${winner}`;
           msgContainer.classList.remove("hide");
           disableBoxes();
}


//LOGIC
const checkWinner = () => {
          for(let pattern of winPatterns){
                    
                let pos1 = boxes[pattern[0]].innerText;
                let pos2 = boxes[pattern[1]].innerText;
                let pos3 = boxes[pattern[2]].innerText;

                if(pos1 != "" && pos2 != "" && pos3 != ""){
                    if(pos1 === pos2 && pos2 === pos3){
                        console.log("Winner is",pos1);

                        showWinner(pos1);
                        return true;
                    }
                } 
                    
          }
};

//button 
newGame.addEventListener("click", resetGame);
resetbtn.addEventListener("click",resetGame);
