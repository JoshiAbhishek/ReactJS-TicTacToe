'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var main = require('./main.js');
var Components = require('./components.js');
var controll = require("./controller.js");
var Controller = new controll.Controller();

var buttonStyle = {
    height: '100px',
    width: '100px'
};

var infoBoxStyle = {
    color: "blue"  
};

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

        Controller.init(boardSize); 
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


var Title = React.createClass({
    render: function () {
        return (
            <h1>{ this.props.title } < /h1>
            );
    }
});


var PlayerBox = React.createClass({
    render: function () {
        var playerBoxes = [];
        var players = Controller.getPlayers();

        for (var i = 0; i < players.length; i++) {
            playerBoxes.push(
                <div>
                <h2>{ players[i].name } < /h2>
                < h3 > Player Symbol: { players[i].symbol } < /h3>
                < h3 > Player Number: { players[i].playerNum } < /h3>
                < h3 > Player Wins: { players[i].wins } < /h3>
                < h3 > Player Ties: { players[i].ties } < /h3>
                < h3 > Player Losses: { players[i].losses } < /h3>
                < /div>
                );
        }

        return (
            <div>
            { playerBoxes }
            < /div>
            );
    }
});


var BoardSpot = React.createClass({
    click: function () {        
        this.props.spotClick(this.props.row, this.props.col);
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

        if (Controller.getWinner() !== undefined) {
            isDisabled = true;
        }

        return (
            <button style={buttonStyle} playerNum={ playerN } onclick= { this.click } disabled= {isDisabled}> { symbol } < /button>
    );
    }
});


var InfoBox = React.createClass({
    render: function () {
        return (
            <div style={infoBoxStyle}>
            <h3>Total Games: { Controller.getTotalGames() } </h3>
            < h3 > Current Player: { Controller.getCurrentPlayerName() } </h3>
            < h3 > Next Player: { Controller.getNextPlayerName() } </h3>
            < h3 > Total Players: { Controller.getTotalNumPlayers() } </h3>
            < h3 > Spots Taken: { Controller.getNumSpotsTaken() } </h3>
            < h3 > Total Spots: { Controller.getTotalSpots() } </h3>
            < /div>
        );
    }
});

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
                    <BoardSpot row={ i } col= { j } spotClick = { this.spotClick} />
                    </td>
                    );
            }

            rows.push(<tr>{ cols } < /tr>);
        }
        
        for(var i = 0; i < rows.length; i++) {
            headCols.push(<th></th>);
        }

        return (
            <table>
            <thead><tr>{headCols}</tr></thead>
            <tbody>{rows}< /tbody>
            </table>
            

            );
    }
});

var GamePage = React.createClass({
    render: function () {
        return (
            <div>
            <InfoBox />
            < PlayerBox />
            <GameBoard />
            < /div>
            );
    }
});

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

function update() {
    ReactDOM.render(<Components.FullGame />, document.getElementById('content'));
}

module.exports.FullGame = FullGame;