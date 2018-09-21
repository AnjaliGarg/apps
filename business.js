(function(){
    class Player {
        constructor (oBank) {            
            // If required we can make the hard coded values configurable by passing in the constructor
            this.iBalance = 1000;
            this.iJailFineAmount = 150;
            this.aHotelsOwned = [];
            this.iLotteryMoney = 200;            
            this.iCurPosition = 0;
            this.oBank = oBank;
        }
        
        // TODO: Handle case if the iBalance is empty; And corner cases all over the program
        payJailFine() {
            this.iBalance -= this.iJailFineAmount;
            this.oBank.iBalance += this.iJailFineAmount;
        }
        
        // Method to add money of the lottery in the Player's iBalance money
        addLotteryMoney() {
            this.oBank.iBalance -= this.iLotteryMoney;
            this.iBalance += this.iLotteryMoney;
        }
    }
    
    class Bank {
        constructor () {
            this.iBalance = 5000;            
        }
    }
    
    class Hotel {
        constructor () {
            this.sCurState = 'silver';
            this.oType = {
                silver:{value:200, rent:50},
                gold:{value:300, rent:150},
                platinum:{value:500, rent:300},
            },
            this.oOwner = null;
        }

        // TODO: handle logic - How to assign the hotel to the Player
        upgrade(){
            if(this.oOwner === null){
                console.log("Not upgrading; Owner is null")
            }            
        }        
    }


    function billBalance(){
        // aDiceOutput = "2,2,1,4,4,2,4,4,2,2,2,1,4,4,2,4,4,2,2,2,1"
        //  "E,J,H,L,H,E,L,H,L,H,J"
        let aCells = "J,J,E,L,L,J,L,E,E,L,J", aDiceOutput = "1,2,3,4,5,6,7,8,9,10,11,12,2, 14, 15,16,17,18",
        iPlayerCount = 3, iNextPos = 0;

        // Function to return the block number in circular fashion 
        function returnCellBlock(iCurPos, iDiceOut){
            let iNextPos = iCurPos + iDiceOut;

            iCellCount = aCells.length;
            // Logic to get the block number in circular fashion and fetch its value
            if(iNextPos >= iCellCount + 1){    
                iNextPos = iNextPos - iCellCount;
            }

            return iNextPos;
        }

        // Split the cell input and dice output on comma and save values in arrays
        aCells = aCells.split(',');
        aDiceOutput = aDiceOutput.split(',');

        let aPlayers = [];
        let oBank = new Bank();

        // Push the player objects in the array aPlayers
        for (let i=0; i < iPlayerCount; i++){            
            let player = new Player(oBank);
            aPlayers.push(player);
        }

        let iTurnCount = parseInt(aDiceOutput.length/3);
        console.log("Turn count is " + iTurnCount)

        let iIndexDiceOptIterated = 0;

        // Iterate over the dice output in turn by turn fashion
        for(let i=0; i<iTurnCount; i++){
            let sBlockType = 'E'
            console.log("Turn going on is " + i + "================")
            for(let j=0; j< iPlayerCount;j++){
                
                console.log("value"+ aDiceOutput[iIndexDiceOptIterated]);

                let iNextPos = returnCellBlock(aPlayers[j].iCurPosition,aDiceOutput[iIndexDiceOptIterated]);
                console.log("Next position is " + iNextPos + " for player "+j);
                                
                let sBlockType = aCells[iNextPos];                            

                executeBlock(sBlockType,aPlayers[j], iNextPos);
                
                iIndexDiceOptIterated = iIndexDiceOptIterated + 1;
            } 
        }

        // Function to log the balances of the players and bank at last
        function logBalance(){
            console.log("/////////////////////////////////////");
            aPlayers.forEach((e,i)=>console.log("Player #"+ parseInt(i+1) +"'s Balance is " + e.iBalance));
            console.log("Bank balance is " + oBank.iBalance);
            console.log("/////////////////////////////////////");
        }

        logBalance();

        // Based on the bock type - perform required function
        function executeBlock(sBlockType,oPlayer, iNextPos){
            switch (sBlockType){
                case 'E': oPlayer.iCurPos = iNextPos;
                break;
                case 'J': 
                oPlayer.iCurPos = iNextPos;
                oPlayer.payJailFine()
                case 'L': oPlayer.iCurPos = iNextPos;
                oPlayer.addLotteryMoney();
                break;                
                case 'H': oPlayer.iCurPos = iNextPos;
                default: 
                oPlayer.iCurPos = iNextPos;
                break;
            }
        }

    }

    // Main call to the logic
    billBalance();

})();

