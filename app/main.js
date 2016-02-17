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

var init = function (numRows) {
    gameModel = new TicTacToeGame(numRows, 2);
    maxNumPlayers = 2;
    currentPlayerNum = 0;
    nextPlayerNum = 0;
    canStartGame = false;
};

var addPlayer = function (name) {
    if (maxNumPlayers === 2) {
        var symbol;
        
        if(gameModel.totalNumPlayers === 0) {
            symbol = "X"
        }
        else {
            symbol = "O"
        }        
        
        gameModel.addPlayer(name, symbol);
    }
};

var startGame = function () {
    if((gameModel.totalNumPlayers >= gameModel.minPlayerTotal) && gameModel.totalNumPlayers <= gameModel.maxPlayerTotal) {
        canStartGame = true;
    }
};

var makeMove = function () {

};

var newGame = function () {

};

var exit = function () {

};

var _quit = function () {

};

var _reset = function () {
    gameModel.reset();
};

ReactDOM.render(<Components.FullGame />, document.getElementById('content'));