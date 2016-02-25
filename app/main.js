'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./game.js');
var Components = require('./components.js');

ReactDOM.render(<Components.FullGame />, document.getElementById('content'));