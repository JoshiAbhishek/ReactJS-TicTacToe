'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./game.js');
var Components = require('./components.js');

class Controller {
    constructor() {
        this._gameModel;
        this._canStartGame = false;
        this._initialized = false;
    }
    
    /*
    get gameModel() {
        return this._gameModel();
    }
    */
    
    get initialized() {
        return this._initialized;
    }
    
    get canStartGame() {
        return this._canStartGame;
    }

    init(numRows) {
        this._gameModel = new Game.TicTacToeGame(numRows, 2);
        this._gameModel.lastGameStarter = 0;
        this._gameModel.currentPlayerNum = 0;
        this._gameModel.nextPlayerNum = 1;
        this._initialized = true;
        
        update();
    }

    addPlayer(name) {
        if (this._gameModel.maxPlayerTotal === 2) {
            var symbol;

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

    makeMove(row, col) {
        var playerNum = this._gameModel.currentPlayerNum;
        
        /*
        if (this._gameModel.currentPlayerNum !== playerNum) {
            alert("Unexpected error... current player number does not equal player number... quitting");

            this._quit();
        }
        */

        if ((this._gameModel.numSpotsTaken === this._gameModel.totalSpots) && this._gameModel.winner === undefined) {
            alert("All spots are taken. The game is tied.");

            this._gameModel.addTies();
        
            //
        
        }
        else if ((this._gameModel.numSpotsTaken === this._gameModel.totalSpots) && this._gameModel.winner !== undefined) {
            alert("Unexpected error... quitting");

            this._quit();
        }
        else {
            if (this._gameModel.makeMove(playerNum, row, col)) {
                alert("Player " + this._gameModel.players[playerNum].name + " moved to spot " + " (" + row + ", " + col + ").");
                console.log("Player " + this._gameModel.players[playerNum].name + " moved to spot " + " (" + row + ", " + col + ").");

                if (this._gameModel.checkWin(playerNum, row, col)) {
                    this._gameModel.winner = playerNum;

                    this._gameModel.addWinAndLosses(playerNum);
                    this._gameModel.numGames++;
                
                    alert("Player " + this._gameModel.players[playerNum].name + " won!!");
                }
                else {
                    if (playerNum == 0) {
                        this._gameModel.currentPlayerNum = 1;
                        this._gameModel.nextPlayerNum = 0;
                    }
                    else {
                        this._gameModel.currentPlayerNum = 0;
                        this._gameModel.nextPlayerNum = 1;
                    }
                
                    //
                }
            }
            else {
                alert("Board spot" + " (" + row + ", " + col + ") " + "is already occupied by " + this._gameModel.getBoardSpot(row, col).player.name);
            }
        }
        
        update();
    }

    handleControlButton(buttonID) {
        if(buttonID === "newGame") {
            this.newGame();
        }
        else {
            this.exit();
        }
    }

    newGame() {
        alert("Resetting the board for a new game.");

        this._reset();
        this.startGame();
        
        update();
    }

    exit() {
        alert("Exiting the game.");

        this._quit();
        update();
    }

    _quit() {        
        this._reset();
        
        this._gameModel = undefined;
        this._canStartGame = false;
        this._initialized = false;
    }

    _reset() {
        this._gameModel.reset();
    }

}

function update() {
    ReactDOM.render(<Components.FullGame />, document.getElementById('content'));
}

module.exports.Controller = Controller;