'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var main = require('./main.js');
var Components = require('./components.js');
var controll = require("./controller.js");
var Controller = new controll.Controller();

//Style for board buttons
var buttonStyle = {
    height: '100px',
    width: '100px'
};

//Page for setting the board's number of rows and columns
var SetBoardPage = React.createClass({
    getInitialState: function () {
        return { boardSize: '' };
    },
    handleSizeChange: function (e) {
        this.setState({ boardSize: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var boardSize = this.state.boardSize.trim();

        if (!boardSize) {
            return;
        }
        if(boardSize < 1 || boardSize >= 11) {
            alert("Please choose a board size greater than one and less than 11");
        }
        else {
            Controller.init(boardSize); 
        }

        
        //update();       
    },

    render: function () {
        return (
            <form className="SetBoardForm" onSubmit= { this.handleSubmit } >
            <input type="number"
        placeholder = "Enter A Board Size"
        value = { this.state.boardSize }
        onChange = { this.handleSizeChange } />
                
        <input type="submit" value= "Post" />
        </form>
        );
    }
});

//Page for adding players by name
var PlayerRegistrationPage = React.createClass({
    getInitialState: function () {
        return { name: '' };
    },
    handleNameChange: function (e) {
        this.setState({ name: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var name = this.state.name.trim();

        if (!name) {
            return;
        }

        Controller.addPlayer(name);
        this.setState({ name: '' });
        //update();
    },

    render: function () {
        return (
            <form className="mainForm" onSubmit= { this.handleSubmit } >
            <input 
                    type="text"
        placeholder = "Your name"
        value = { this.state.name }
        onChange = { this.handleNameChange } />
        <inupt type="submit" value= "Post" />
        </form>
        );
    }
});

//The game title
var Title = React.createClass({
    render: function () {
        return (
            <h1>{ this.props.title } < /h1>
            );
    }
});

//A box with a player's stats and information
var PlayerBox = React.createClass({
    render: function () {
        var playerBoxes = [];
        var players = Controller.getPlayers();

        for (var i = 0; i < players.length; i++) {
            playerBoxes.push(
                <div className="col-md-6 playerBox">
                <h2 className="playerName">{ players[i].name } < /h2>
                < h3 > Player Symbol: { players[i].symbol } < /h3>
                < h3 > Player Number: { players[i].playerNum } < /h3>
                < h3 > Player Wins: { players[i].wins } < /h3>
                < h3 > Player Ties: { players[i].ties } < /h3>
                < h3 > Player Losses: { players[i].losses } < /h3>
                < /div>
                );
        }

        return (
            <div className="jumbotron playerBoxes" >
            <div className="row" >
            { playerBoxes }
            < /div>
            < /div>
            );
    }
});

//A spot on the game board
var BoardSpot = React.createClass({
    click: function () {
        console.log("clicked spot " + this.props.row + " , " + this.props.col);

        Controller.makeMove(this.props.row, this.props.col);
    },

    render: function () {
        var symbol;
        var isDisabled = false;
        var player = Controller.getBoardSpot(this.props.row, this.props.col).player;
        var playerSymbol;
        var playerN;

        if (player !== undefined) {
            playerSymbol = player.symbol;

            if (playerSymbol === "X") {
                symbol = "X";
            } else if (playerSymbol === "O") {
                symbol = "O";
            }

            playerN = player.playerNum;
        }
        else {
            symbol = "empty";
            playerN = undefined;
        }

        if (Controller.tied === true || Controller.getWinner() !== undefined) {
            isDisabled = true;
        }
        else {
            isDisabled = false;
        }

        return (
            <button style={ buttonStyle } playerNum= { playerN } onClick= { this.click } disabled= { isDisabled } > { symbol } < /button>
    );
    }
});

//An information box for the game's stats and details
var InfoBox = React.createClass({
    render: function () {
        return (
            <div className="jumbotron" >
                <div className="row infoBox" >
                    <div className="col-md-6" >
                        <h3>Total Games: { Controller.getTotalGames() } </h3>
                        < h3 > Last Game Starter: { Controller.getLastGameStarter() } </h3>
                        < h3 > Total Players: { Controller.getTotalNumPlayers() } </h3>
                    < /div>
                    < div className= "col-md-6" >
                        < h3 > Current Player: { Controller.getCurrentPlayerName() } </h3>
                        < h3 > Spots Taken: { Controller.getNumSpotsTaken() } </h3>
                        < h3 > Total Spots: { Controller.getTotalSpots() } </h3>
                    < /div>
                < /div>
            < /div>
        );
    }
});

//The game board
var GameBoard = React.createClass({
    spotClick: function (row, col) {
        alert("Clicked Spot");
        console.log("clicked spot " + row + " , " + col);

        Controller.makeMove(Controller.getCurrentPlayerNum(), row, col);
    },

    render: function () {
        var rows = [];
        var headCols = [];

        for (var i = 0; i < Controller.getBoardRows(); i++) {
            var cols = [];

            for (var j = 0; j < Controller.getBoardRows(); j++) {
                cols.push(
                    <td>
                    <BoardSpot row={ i } col= { j } spotClick = { this.spotClick } />
                    </td>
                    );
            }

            rows.push(<tr>{ cols } < /tr>);
        }
        
        for (var i = 0; i < rows.length; i++) {
            headCols.push(<th></th>);
        }

        return (
            <table>
            <thead><tr>{ headCols } < /tr></thead >
            <tbody>{ rows } < /tbody>
            < /table>
            );
    }
});

//A control button (New Game or Exit)
var ControlButton = React.createClass({
    click() {
        Controller.handleControlButton(this.props.buttonID);
    },

    render: function () {
        var isDisabled = true;
        
        if (Controller.tied === true || Controller.getWinner() !== undefined) {
            isDisabled = false;
        }
        else {
            isDisabled = true;
        }
        
        return (
            <button className="controlButton" disabled = {isDisabled} onClick={ this.click } > { this.props.text } < /button>
        );
    }
});

//The game's control buttons
var ControlButtons = React.createClass({
    render: function () {
        return (
            <div>
            <ControlButton text="Exit" buttonID= "exit" />
            <ControlButton text="New Game" buttonID= "newGame" />
            </div>
        );
    }
});

//The game's page
var GamePage = React.createClass({
    render: function () {
        var buttons;
        
        /*
        if (Controller.tied === true || Controller.getWinner() !== undefined) {
            buttons = <ControlButtons />;
        }
        else {
            buttons = <div></div>;
        }
        */
        
        return (
            <div>
            <InfoBox />
            < PlayerBox />
            <GameBoard />
            <ControlButtons />
        < /div>
            );
    }
});

//The full game display
var FullGame = React.createClass({
    render: function () {
        var display;

        if (!Controller.initialized) {
            display = <SetBoardPage/>;
        }
        else {
            if (Controller.canStartGame) {
                display = <GamePage />;
            } else {
                display = <PlayerRegistrationPage />;
            }
        }

        return (
            <div>
            <Title title='React.js Tic-Tac-Toe' />  
            { display }
            < /div>
        );
    }
});

//Update the view
function update() {
    ReactDOM.render(<Components.FullGame />, document.getElementById('content'));
}

module.exports.FullGame = FullGame;