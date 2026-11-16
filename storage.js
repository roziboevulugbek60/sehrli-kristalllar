
// ======================================
// 💎 SEHRLI KRISTALLAR
// STORAGE SYSTEM
// Developer: Ulug'bek.R
// ======================================



const Storage = {




    // Rekord olish

    getBest(){


        let best =

        localStorage.getItem(
            "crystalBest"
        );



        return best
        ?
        Number(best)
        :
        0;


    },







    // Rekord saqlash


    saveBest(score){



        let best =
        this.getBest();



        if(score > best){


            localStorage.setItem(

                "crystalBest",

                score

            );


            return true;


        }



        return false;


    },







    // O'yinlar soni



    getGames(){


        let games =

        localStorage.getItem(
            "crystalGames"
        );



        return games
        ?
        Number(games)
        :
        0;


    },






    addGame(){


        let games =
        this.getGames();



        games++;



        localStorage.setItem(

            "crystalGames",

            games

        );


    },







    // Oxirgi natija


    saveLast(score){


        localStorage.setItem(

            "crystalLast",

            JSON.stringify({

                score:score,

                date:
                new Date()
                .toLocaleString()

            })

        );


    },







    getLast(){


        let data =

        localStorage.getItem(
            "crystalLast"
        );



        return data
        ?
        JSON.parse(data)
        :
        null;


    },







    // Hammasini o'chirish


    clear(){


        localStorage.removeItem(
            "crystalBest"
        );


        localStorage.removeItem(
            "crystalGames"
        );


        localStorage.removeItem(
            "crystalLast"
        );


    }



};
