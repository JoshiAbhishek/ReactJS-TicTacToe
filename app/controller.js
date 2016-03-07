'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./game.js');
var Components = require('./components.js');

//Controller class for game
class Controller {
    constructor() {
        this._gameModel;
        this._canStartGame = false;
        this._initialized = false;
        this._tied = false;
    }
    
    /*
    get gameModel() {
        return this._gameModel();
    }
    */
    
    get tied() {
        return this._tied;
    }
    
    get initialized() {
        return this._initialized;
    }
    
    get canStartGame() {
        return this._canStartGame;
    }

    //Initialize game model according to number of rows, the current player, and the next player
    init(numRows) {
        this._gameModel = new Game.TicTacToeGame(numRows, 2);
        this._gameModel.lastGameStarter = 0;
        this._gameModel.currentPlayerNum = 0;
        this._gameModel.nextPlayerNum = 1;
        this._initialized = true;
        
        update();
    }

    //Add a player to the game
    addPlayer(name) {
        //Functionality for a game with 2 players
        if (this._gameModel.maxPlayerTotal === 2) {
            var symbol;

            //Set the player symbols
            if (this._gameModel.totalNumPlayers === 0) {
                symbol = "X"
            }
            else {
                symbol = "O"
            }

            if (this._gameModel.addPlayer(name, symbol)) {
                if ((this._gameModel.totalNumPlayers >= this._gameModel.minPlayerTotal) && this._gameModel.totalNumPlayers <= this._gameModel.maxPlayerTotal) {
                    this._canStartGame = true;
                }
            }
            else {
                alert("Unexpected error with adding player... quitting");
                
                this._quit();
            }
        }
        else {
            alert("Controller supports up to 2 players currently... quitting");

            this._quit();
        }
        
        update();
    }
    
    getLastGameStarter() {
        return this._gameModel.getPlayer(this._gameModel.lastGameStarter).name;
    }
    
    getCurrentPlayerNum() {
        return this._gameModel.currentPlayerNum;
    }
    
    getBoardRows() {
        return this._gameModel.board.numRows;
    }
    
    getWinner() {
        return this._gameModel.winner;
    }
    
    getPlayers() {
        return this._gameModel.players;
    }

    getPlayer(playerNum) {
        return this._gameModel.getPlayer(playerNum);
    }
    
    getBoardSpot(row, col) {
        return this._gameModel.getBoardSpot(row, col);
    }
    
    getTotalGames() {
        return this._gameModel.numGames;
    }
    
    getNumSpotsTaken() {
        return this._gameModel.numSpotsTaken;
    }
    
    getTotalSpots() {
        return this._gameModel.totalSpots;
    }
    
    getTotalNumPlayers() {
        return this._gameModel.totalNumPlayers;
    }
    
    getCurrentPlayerName() {
        return this._gameModel.getPlayer(this._gameModel.currentPlayerNum).name;
    }
    
    getNextPlayerName() {
        return this._gameModel.getPlayer(this._gameModel.nextPlayerNum).name;
    }

    //Set the current player, the next player, and who started the last game
    startGame() {
        if ((this._gameModel.totalNumPlayers >= this._gameModel.minPlayerTotal) && this._gameModel.totalNumPlayers <= this._gameModel.maxPlayerTotal) {
            this._canStartGame = true;

            if (this._gameModel.lastGameStarter === 0) {
                this._gameModel.currentPlayerNum = 1;
                this._gameModel.nextPlayerNum = 0;
                this._gameModel.lastGameStarter = 1;
            }
            else {
                this._gameModel.currentPlayerNum = 0;
                this._gameModel.nextPlayerNum = 1;
                this._gameModel.lastGameStarter = 0;
            }
        
            //
        }
        
        update();
    }

    //Move to the corresponding board spot, according to row and column
    makeMove(row, col) {
        var playerNum = this._gameModel.currentPlayerNum;

        //Check if the game is tied
        if ((this._gameModel.numSpotsTaken === this._gameModel.totalSpots) && this._gameModel.winner === undefined) {
            alert("All spots are taken. The game is tied.");

            this._gameModel.addTies();        
        }
        else if ((this._gameModel.numSpotsTaken === this._gameModel.totalSpots) && this._gameModel.winner !== undefined) {
            alert("Unexpected error... quitting");

            this._quit();
        }
        else {
            if (this._gameModel.makeMove(playerNum, row, col)) {
                alert("Player " + this._gameModel.players[playerNum].name + " moved to spot " + " (" + row + ", " + col + ").");
                console.log("Player " + this._gameModel.players[playerNum].name + " moved to spot " + " (" + row + ", " + col + ").");

                //Check if the game has been won
                if (this._gameModel.checkWin(playerNum, row, col)) {
                    this._gameModel.winner = playerNum;

                    this._gameModel.addWinAndLosses(playerNum);
                
                    alert("Player " + this._gameModel.players[playerNum].name + " won!!");
                }
                //Set the current and next player
                else {
                    if (playerNum == 0) {
                        this._gameModel.currentPlayerNum = 1;
                        this._gameModel.nextPlayerNum = 0;
                    }
                    else {
                        this._gameModel.currentPlayerNum = 0;
                        this._gameModel.nextPlayerNum = 1;
                    }
                }
            }
            else {
                alert("Board spot" + " (" + row + ", " + col + ") " + "is already occupied by " + this._gameModel.getBoardSpot(row, col).player.name);
            }
        }
        
        update();
        
        //Check if the game is tied
        if ((this._gameModel.numSpotsTaken === this._gameModel.totalSpots) && this._gameModel.winner === undefined) {
            alert("All spots are taken. The game is tied.");

            this._gameModel.addTies();
        
            this._tied = true;
        }
        
        update();
    }

    //Handler for the control buttons (New Game and Exit)
    handleControlButton(buttonID) {
        if(buttonID === "newGame") {
            this.newGame();
        }
        else {
            this.exit();
        }
    }

    //Start a new game
    newGame() {
        alert("Resetting the board for a new game.");

        this._reset();
        this.startGame();
        
        update();
    }

    //Exit the game
    exit() {
        alert("Exiting the game.");

        this._quit();
        update();
    }

    //Quit functionality
    _quit() {        
        this._reset();
        
        //this._gameModel = undefined;
        this._canStartGame = false;
        this._initialized = false;
    }

    //Reset functionality
    _reset() {
        this._gameModel.reset();
        this._tied = false;
    }

}

//Update the game
function update() {
    ReactDOM.render(<Components.FullGame />, document.getElementById('content'));
}

module.exports.Controller = Controller;