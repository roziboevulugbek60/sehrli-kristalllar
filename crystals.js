
// ======================================
// 💎 SEHRLI KRISTALLAR
// Crystal Generator
// Developer: Ulug'bek.R
// ======================================



const crystals = [


{
    id:"red",
    emoji:"🔴"
},


{
    id:"blue",
    emoji:"🔵"
},


{
    id:"green",
    emoji:"🟢"
},


{
    id:"yellow",
    emoji:"🟡"
},


{
    id:"purple",
    emoji:"🟣"
},


{
    id:"orange",
    emoji:"🟠"
}


];







// Tasodifiy kristal olish


function randomCrystal(){


    let crystal =

    crystals[

        Math.floor(
            Math.random()
            *
            crystals.length
        )

    ];



    return crystal;

}








// Boshlang'ich doska yaratish


function createBoard(size=8){


    let board=[];



    for(let i=0;i<size*size;i++){


        board.push(
            randomCrystal()
        );


    }



    return board;


}








// Kristal HTML


function createCrystalHTML(crystal,index){


    return `


    <div

    class="
    crystal
    ${crystal.id}
    "

    data-index="${index}"

    >

    ${crystal.emoji}

    </div>


    `;


}








// Ikki kristal almashtirish


function swapCrystals(board,a,b){


    let temp =
    board[a];


    board[a]=board[b];


    board[b]=temp;


}







// Qo'shni tekshirish


function isNear(a,b,size=8){


    let rowA =
    Math.floor(a/size);


    let colA =
    a%size;



    let rowB =
    Math.floor(b/size);


    let colB =
    b%size;





    return (

        Math.abs(rowA-rowB)<=1 &&

        Math.abs(colA-colB)<=1 &&

        !(rowA===rowB && colA===colB)

    );


}
