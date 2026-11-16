// ======================================
// 💎 SEHRLI KRISTALLAR
// MAIN GAME ENGINE
// Developer: Ulug'bek.R
// ======================================


const boardElement =
document.getElementById("board");

const scoreElement =
document.getElementById("score");

const bestElement =
document.getElementById("best");

const restartButton =
document.getElementById("restart");



const SIZE = 8;


let board = [];

let score = 0;

let selected = null;

let locked = false;







// =============================
// START
// =============================


function startGame(){


    score = 0;

    scoreElement.textContent = score;


    bestElement.textContent =
    Storage.getBest();



    board =
    createBoard(SIZE);



    while(findMatches().length){

        board =
        createBoard(SIZE);

    }



    drawBoard();


}








// =============================
// BOARD CHIZISH
// =============================


function drawBoard(){


    boardElement.innerHTML="";



    board.forEach((crystal,index)=>{


        let item =
        document.createElement("div");



        item.className =
        "crystal "
        +
        crystal.id;



        item.dataset.index =
        index;



        item.onclick = ()=>{

            clickCrystal(index);

        };



        boardElement.appendChild(item);


    });



}








// =============================
// KRISTAL TANLASH
// =============================


function clickCrystal(index){


    if(locked)
        return;



    if(selected===null){


        selected=index;


        boardElement
        .children[index]
        .classList
        .add("selected");


        return;


    }





    if(selected===index){


        clearSelection();

        return;


    }







    if(isNear(selected,index)){


        locked=true;


        let first = selected;


        swapCrystals(
            board,
            first,
            index
        );



        drawBoard();





        setTimeout(()=>{



            let matches =
            findMatches();





            if(matches.length){


                removeMatches(matches);



            }

            else{


                // noto'g'ri yurish

                swapCrystals(
                    board,
                    first,
                    index
                );


                drawBoard();


                locked=false;


            }



        },300);




    }



    clearSelection();


}









// =============================
// MATCH TOPISH
// =============================


function findMatches(){



    let result=[];





    // qator


    for(let row=0;row<SIZE;row++){



        for(let col=0;col<SIZE-2;col++){



            let a =
            row*SIZE+col;


            let b=a+1;


            let c=a+2;



            if(
            board[a].id === board[b].id
            &&
            board[b].id === board[c].id
            ){


                result.push(a,b,c);


            }



        }


    }







    // ustun


    for(let col=0;col<SIZE;col++){



        for(let row=0;row<SIZE-2;row++){



            let a =
            row*SIZE+col;


            let b =
            a+SIZE;


            let c =
            a+SIZE*2;



            if(
            board[a].id === board[b].id
            &&
            board[b].id === board[c].id
            ){


                result.push(a,b,c);


            }



        }


    }



    return [
        ...new Set(result)
    ];



}









// =============================
// YO'QOTISH
// =============================


function removeMatches(matches){



    matches.forEach(index=>{


        let cell =
        boardElement.children[index];


        if(cell){

            cell.classList.add(
                "remove"
            );

        }


    });





    setTimeout(()=>{



        matches.forEach(index=>{


            board[index]=null;


        });



        score +=
        matches.length*10;



        scoreElement.textContent =
        score;



        Storage.saveBest(score);


        bestElement.textContent =
        Storage.getBest();



        dropDown();



    },400);



}









// =============================
// PASTGA TUSHISH
// =============================


function dropDown(){



    for(let col=0;col<SIZE;col++){



        let empty=[];



        for(
        let row=SIZE-1;
        row>=0;
        row--
        ){



            let index =
            row*SIZE+col;



            if(board[index]===null){


                empty.push(index);


            }


        }





        for(let emptyIndex of empty){



            for(
            let row=emptyIndex-SIZE;
            row>=0;
            row-=SIZE
            ){



                if(board[row]){


                    board[emptyIndex]=
                    board[row];


                    board[row]=null;


                    break;


                }


            }


        }



    }





    fillEmpty();



    drawBoard();





    setTimeout(()=>{


        let again =
        findMatches();



        if(again.length){


            removeMatches(again);


        }

        else{


            locked=false;


        }


    },300);


}









// =============================
// BO'SH JOYNI TO'LDIRISH
// =============================


function fillEmpty(){



    for(let i=0;i<board.length;i++){



        if(board[i]===null){


            board[i]=
            randomCrystal();


        }


    }


}








// =============================
// ALMASHTIRISH
// =============================


function swapCrystals(a,b,c){


    let temp =
    a[b];


    a[b]=a[c];


    a[c]=temp;


}








// =============================
// QO'SHNILIK
// =============================


function isNear(a,b){


    let row1 =
    Math.floor(a/SIZE);


    let col1 =
    a%SIZE;



    let row2 =
    Math.floor(b/SIZE);


    let col2 =
    b%SIZE;




    return (

        Math.abs(row1-row2)+
        Math.abs(col1-col2)
        ===1

    );


}








function clearSelection(){



    document
    .querySelectorAll(".selected")
    .forEach(item=>{


        item.classList.remove(
            "selected"
        );


    });



    selected=null;


}









restartButton.onclick=()=>{


    startGame();


};







startGame();