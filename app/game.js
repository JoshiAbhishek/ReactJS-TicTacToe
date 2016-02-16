'use strict';

class Player {
    constructor(name, playerNum, symbol) {
        this._name = name;
        this._playerNum = playerNum;
        this._symbol = symbol;
    }

    get playerNum() {
        return this._playerNum;
    }
    /*
    set name(name) {
        this._name = name;
    }
    */
    get name() {
        return this._name;
    }
    /*
    set symbol(symbol) {
        this._symbol = symbol;
    }
    */
    get symbol() {
        return this._symbol;
    }

    set wins(wins) {
        this._wins = wins;
    }

    get wins() {
        return this._wins;
    }

    set loses(loses) {
        this._loses = loses;
    }

    get loses() {
        return this._loses;
    }
}

class BoardSpot {
    constructor(player, row, col) {
        this._player = player;
        this._row = row;
        this._col = col;
    }

    set player(player) {
        this._player = player;
    }

    get player() {
        return this._player;
    }
    /*
    set row(row) {
        this._row = row;
    }
    */
    get row() {
        return this._row;
    }
    /*
    set col(col) {
        this._col = col;
    }
    */
    get col() {
        return this._col;
    }
}

class GameBoard {
    constructor(numRows) {
        this._board = [];
        this._numRows = numRows;

        for (var i = 0; i < numRows; i++) {
            this._board[i] = [];
            for (var j = 0; j < numRows; j++) {
                this._board[i][j] = new BoardSpot(undefined, i, j);
            }
        }

        this._totalSpots = numRows * numRows;
    }

    get numRows() {
        return this._numRows;
    }

    get totalSpots() {
        return this._totalSpots;
    }

    resetBoard() {
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numRows; j++) {
                this._board[i][j].player = undefined;
                this._board[i][j] = undefined;
                this.board[i][j] = new BoardSpot(undefined, i, j);
            }
        }
    }

    setBoardSpot(player, row, col) {
        this._board[row][col].player = player;
    }

    getBoardSpot(row, col) {
        return this._board[row][col]
    }

    rowCompletion(player, row, col) {
        var j = numRows - 1;
        for (var i = 0; i < numRows; i++) {
            if (col !== i) {
                if (this._board[row][i].player.symbol !== player.symbol) {
                    return false;
                }
                if (i === j) {
                    break;
                }
                if (this._board[row][j].player.symbol !== player.symbol) {
                    return false;
                }
            }
            j--;
        }

        return true;
    }

    colCompletion(player, row, col) {
        var j = numRows - 1;
        for (var i = 0; i < numRows; i++) {
            if (col !== i) {
                if (this._board[i][col].player.symbol !== player.symbol) {
                    return false;
                }
                if (i === j) {
                    break;
                }
                if (this._board[j][col].player.symbol !== player.symbol) {
                    return false;
                }
            }
            j--;
        }

        return true;
    }

    diagonalCompletion(player) {
        /*
        for(var i = 0; i < numRows; i += (numRows + 1)) {
            if() {
                return false;
            }
        }
        
        for(var j = (numRows - 1); j < numRows; j += (numRows - 1)) {
            if() {
                return false;
            }
        }
        
        return true;
        */
        
        for(var i = 0; i < numRows; i++) {
            if(this._board[i][i].player.symbol !== player.symbol) {
                return false;
            }
        }
        
        var k = numRows - 1;
        for(var j = 0; j < numRows; j++) {
            if(this._board[k][j].player.symbol !== player.symbol) {
                return false;
            }
            
            k--;
        }
        
        return true;
    }
}

class TicTacToeGame {
    constructor() {

    }

    makeMove() {

    }

    isWon() {

    }
}