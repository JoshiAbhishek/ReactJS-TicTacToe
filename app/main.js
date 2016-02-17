'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./game.js');
var Components = require('./components.js');

var gameModel;
var currentPlayerNum;
var nextPlayerNum;
var maxNumPlayers;
var canStartGame;
var lastGameStarter;

var init = function (numRows) {
    gameModel = new TicTacToeGame(numRows, 2);
    maxNumPlayers = 2;
    lastGameStarter = 0;
    currentPlayerNum = 0;
    nextPlayerNum = 0;
    canStartGame = false;
};

var addPlayer = function (name) {
    if (maxNumPlayers === 2) {
        var symbol;

        if (gameModel.totalNumPlayers === 0) {
            symbol = "X"
        }
        else {
            symbol = "O"
        }

        gameModel.addPlayer(name, symbol);
        
        //
        
    }
    else {
        alert("Controller supports up to 2 players currently... quitting");
        
        _quit();
    }
};

var getPlayer = function (playerNum) {
    return gameModel.getPlayer(playerNum);
};

var startGame = function () {
    if ((gameModel.totalNumPlayers >= gameModel.minPlayerTotal) && gameModel.totalNumPlayers <= gameModel.maxPlayerTotal) {
        canStartGame = true;
        
        if(lastGameStarter === 0) {
            currentPlayerNum = 1;
            nextPlayerNum = 0;
        }
        else {
            currentPlayerNum = 0;
            nextPlayerNum = 1;
        }
        
        //
    }
};

var makeMove = function (playerNum, row, col) {
    if(currentPlayerNum !== playerNum) {
        alert("Unexpected error... current player number does not equal player number... quitting");
        
        _quit();
    }    
    
    if ((gameModel.numSpotsTaken === gameModel.totalSpots) && gameModel.winner === undefined) {
        alert("All spots are taken. The game is tied.");
        
        gameModel.addTies();
        
        //
        
    }
    else if((gameModel.numSpotsTaken === gameModel.totalSpots) && gameModel.winner !== undefined) {
        alert("Unexpected error... quitting");
        
        _quit();
    }
    else {
        if (gameModel.makeMove(playerNum, row, col)) {
            alert("Player " + gameModel.players[playerNum].name + " moved to spot " + " (" + row + ", " + col + ").");
        
            if (gameModel.checkWin(playerNum, row, col)) {
                gameModel.winner = playerNum;

                gameModel.addWinAndLosses(playerNum);
                gameModel.numGames++;
                
                //
                
            }
            else {
                if(playerNum == 0) {
                    currentPlayerNum = 1;
                    nextPlayerNum = 1;
                }
                else {
                    currentPlayerNum = 1;
                    nextPlayerNum = 0;
                }
                
                //
            }
        }
        else {
            alert("Board spot" + " (" + row + ", " + col + ") " + "is already occupied by " + gameModel.getBoardSpot(row, col).player.name);
        }
    }
};

var newGame = function () {
    alert("Resetting the board for a new game.");    
    
    _reset();
};

var exit = function () {
    alert("Exiting the game.");

    _quit();
};

var _quit = function () {
    _reset();
    canStartGame = false;
};

var _reset = function () {
    gameModel.reset();
};

ReactDOM.render(<Components.FullGame />, document.getElementById('content'));