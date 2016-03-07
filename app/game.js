'use strict';

//Player class represeting one game player's name, number, symbol, and stats
class Player {
    constructor(name, playerNum, symbol) {
        this._name = name;
        this._playerNum = playerNum;
        this._symbol = symbol;
        this._wins = 0;
        this._ties = 0;
        this._losses = 0;
    }

    set playerNum(playerNum) {
        this._playerNum = playerNum;
    }

    get playerNum() {
        return this._playerNum;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set symbol(symbol) {
        this._symbol = symbol;
    }

    get symbol() {
        return this._symbol;
    }

    set wins(wins) {
        this._wins = wins;
    }

    get wins() {
        return this._wins;
    }

    set ties(ties) {
        this._ties = ties;
    }

    get ties() {
        return this._ties;
    }

    set losses(losses) {
        this._losses = losses;
    }

    get losses() {
        return this._losses;
    }
}

//Represents a board spot with row, column, and occupying player values
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

//The game board, constructed by the number of rows for board spots, and the total number of players
class GameBoard {
    constructor(numRows, totalNumPlayers) {
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

    //Reset the board's board spots and their players
    resetBoard() {
        for (var i = 0; i < this._numRows; i++) {
            for (var j = 0; j < this._numRows; j++) {
                this._board[i][j].player = undefined;
                this._board[i][j] = undefined;
                this._board[i][j] = new BoardSpot(undefined, i, j);
            }
        }
    }

    setBoardSpot(player, row, col) {
        this._board[row][col].player = player;
    }

    getBoardSpot(row, col) {
        return this._board[row][col]
    }

    //Check if a row has been fully completed by a player
    rowCompletion(passedPlayer, row, col) {
        //var j = this._numRows - 1;
        for (var i = 0; i < this._numRows; i++) {
            if (col !== i) {
                if (this._board[row][i].player === undefined || this._board[row][i].player.playerNum !== passedPlayer.playerNum) {
                    return false;
                }
                // if (i === j) {
                //     break;
                // }
                // if (this._board[row][j].player === undefined || this._board[row][j].player.playerNum !== passedPlayer.playerNum) {
                //     return false;
                // }
            }
            //j--;
        }

        return true;
    }

    //Check if a column has been fully completed by a player
    colCompletion(passedPlayer, row, col) {
        //var j = this._numRows - 1;
        for (var i = 0; i < this._numRows; i++) {
            //if (col !== i) {
            if (this._board[i][col].player === undefined || this._board[i][col].player.playerNum !== passedPlayer.playerNum) {
                return false;
            }
            // if (i === j) {
            //     break;
            // }
            // if (this._board[j][col].player === undefined || this._board[j][col].player.playerNum !== passedPlayer.playerNum) {
            //     return false;
            // }
            //}
            //j--;
        }

        return true;
    }

    //Check if a diagonal has been fully completed by a player
    diagonalCompletion(passedPlayer) {
        return (this.diagonalComplU2D(passedPlayer) || this.diagonalComplD2U(passedPlayer));
    }
    
    //Check if the first diagonal has been completed
    diagonalComplU2D(passedPlayer) {
        for (var i = 0; i < this._numRows; i++) {
            if (this._board[i][i].player === undefined || this._board[i][i].player.playerNum !== passedPlayer.playerNum) {
                return false;
            }
        }
        
        return true;
    }
    //Check if the second diagonal has been completed
    diagonalComplD2U(passedPlayer) {
        var k = this._numRows - 1;
        for (var j = 0; j < this._numRows; j++) {
            if (this._board[k][j].player === undefined || this._board[k][j].player.playerNum !== passedPlayer.playerNum) {
                return false;
            }

            k--;
        }
        
        return true;
    }
}

//The tic tac toe game with the game board, stats, and players
class TicTacToeGame {
    constructor(totalRows, maxPlayerTotal) {
        this._players = [];
        this._numGames = 0;
        this._maxPlayerTotal = maxPlayerTotal;
        this._minPlayerTotal = 2;
        this._totalNumPlayers = 0;
        this._nextPlayerNumInit = 0;
        this._currentPlayerNum = 0;
        this._nextPlayerNum = 1;
        this._lastGameStarter = 0;
        this._winner = undefined;
        this._board = new GameBoard(totalRows, maxPlayerTotal);
        this._totalSpots = totalRows * totalRows;
        this._numSpotsTaken = 0;
    }

    set lastGameStarter(lastGameStarter) {
        this._lastGameStarter = lastGameStarter;
    }

    get lastGameStarter() {
        return this._lastGameStarter;
    }
    
    // set minPlayerTotal(minPlayerTotal) {
    //     this._minPlayerTotal = minPlayerTotal;
    // }   
    
    get minPlayerTotal() {
        return this._minPlayerTotal;
    }

    set numSpotsTaken(numSpotsTaken) {
        this._numSpotsTaken = numSpotsTaken;
    }

    get numSpotsTaken() {
        return this._numSpotsTaken;
    }

    set totalSpots(totalSpots) {
        this._totalSpots = totalSpots;
    }

    get totalSpots() {
        return this._totalSpots;
    }

    set board(board) {
        this._board = board;
    }

    get board() {
        return this._board;
    }

    set winner(winner) {
        this._winner = winner;
    }

    get winner() {
        return this._winner;
    }

    set maxPlayerTotal(maxPlayerTotal) {
        this._maxPlayerTotal = maxPlayerTotal;
    }

    get maxPlayerTotal() {
        return this._maxPlayerTotal;
    }

    set nextPlayerNumInit(nextPlayerNumInit) {
        this._nextPlayerNumInit = nextPlayerNumInit;
    }

    get nextPlayerNumInit() {
        return this._nextPlayerNumInit;
    }

    set totalNumPlayers(totalNumPlayers) {
        this._totalNumPlayers = totalNumPlayers;
    }

    get totalNumPlayers() {
        return this._totalNumPlayers;
    }

    set currentPlayerNum(currentPlayerNum) {
        this._currentPlayerNum = currentPlayerNum;
    }

    get currentPlayerNum() {
        return this._currentPlayerNum;
    }

    set nextPlayerNum(nextPlayerNum) {
        this._nextPlayerNum = nextPlayerNum;
    }

    get nextPlayerNum() {
        return this._nextPlayerNum;
    }

    set numGames(numGames) {
        this._numGames = numGames;
    }

    get numGames() {
        return this._numGames;
    }
    
    /*
    set players(players) {
        this._players = players
    }
    */

    get players() {
        return this._players;
    }

    //Add a new player to the game by name and symbol
    addPlayer(name, symbol) {
        if (this._totalNumPlayers === this._maxPlayerTotal) {

            return false;
        }
        else {
            this._players[this._nextPlayerNumInit] = new Player(name, this._nextPlayerNumInit, symbol);
            this._totalNumPlayers++;
            this._nextPlayerNumInit++;

            return true;
        }
    }

    getPlayer(playerNum) {
        return this._players[playerNum];
    }

    //Make a move on the game board
    makeMove(playerNum, row, col) {
        var boardSpot = this._board.getBoardSpot(row, col);

        if (boardSpot.player === undefined) {
            this._board.setBoardSpot(this._players[playerNum], row, col);
            this._numSpotsTaken++;

            return true;
        }
        else {
            return false;
        }

    }

    //Check if a player has completed a row, column, or diagonal
    checkWin(playerNum, row, col) {
        var player = this._players[playerNum];

        return (this._board.rowCompletion(player, row, col) || this._board.colCompletion(player, row, col) || this._board.diagonalCompletion(player));
    }

    addPlayerWin(playerNum) {
        this._players[playerNum].wins++;
    }

    addPlayerLoss(playerNum) {
        this._players[playerNum].losses++;
    }

    addPlayerTie(playerNum) {
        this._players[playerNum].ties++;
    }

    //Add a win to the given player, and losses to the other players
    addWinAndLosses(playerNum) {
        this.addPlayerWin(playerNum);

        for (var i = 0; i < this._players.length; i++) {
            if (this._players[i].playerNum !== playerNum) {
                this._players[i].losses++;
            }
        }
        
        this._numGames++;
    }

    //Add a tie to all players
    addTies() {
        for (var i = 0; i < this._players.length; i++) {
            this._players[i].ties++;
        }
        
        this._numGames++;
    }

    getBoardSpot(row, col) {
        return this._board.getBoardSpot(row, col);
    }

    //Reset the game
    reset() {
        this._winner = undefined;
        this._numSpotsTaken = 0;
        this._board.resetBoard();
    }
}

module.exports.TicTacToeGame = TicTacToeGame;