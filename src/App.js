import React from 'react';
import './App.css';


class Grid extends React.Component {
  render() {
    return (
      <div id="grid">
        <div className="box box0" dataBox={0} onClick={this.props.handleClick}>
        </div>
        <div className="box box1" dataBox={1} onClick={this.props.handleClick}>
        </div>
        <div className="box box2" dataBox={2} onClick={this.props.handleClick}>
        </div>
        <div className="box box3" dataBox={3} onClick={this.props.handleClick}>
        </div>
        <div className="box box4" dataBox={4} onClick={this.props.handleClick}>
        </div>
        <div className="box box5" dataBox={5} onClick={this.props.handleClick}>
        </div>
        <div className="box box6" dataBox={6} onClick={this.props.handleClick}>
        </div>
        <div className="box box7" dataBox={7} onClick={this.props.handleClick}>
        </div>
        <div className="box box8" dataBox={8} onClick={this.props.handleClick}>
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningPatterns: {0:[0, 1, 2], 1:[0, 3, 6], 2:[3, 4, 5],
                        3:[1, 4, 7], 4:[6, 7, 8], 5:[2, 5, 8],
                        6:[0, 4, 8], 7:[2, 4, 6]},
      currentPlayer: true,
      gameOver: false,
      player1: [],
      player2: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  get initialState() {
    return ({
    winningPatterns: {0:[0, 1, 2], 1:[0, 3, 6], 2:[3, 4, 5],
      3:[1, 4, 7], 4:[6, 7, 8], 5:[2, 5, 8],
      6:[0, 4, 8], 7:[2, 4, 6]},
    currentPlayer: true,
    gameOver: false,
    player1: [],
    player2: []
    });
  }

  checkArrayEquality(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    let a_clone = a;
    a_clone.sort(function(a, b){return a - b});
    let b_clone = b;
    b_clone.sort(function(a, b){return a - b});
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  handleClick(e) {
    let boxNumber = e.target.getAttribute('dataBox');
    let player1Copy, player2Copy;
    if (this.state.player1.includes(Number(boxNumber)) || this.state.player2.includes(Number(boxNumber))) return;
    if(this.state.currentPlayer) {
      player1Copy = this.state.player1;
      e.target.innerHTML = '<h2>X</h2>';
      player1Copy.push(Number(boxNumber));
      for (let i=0; i < Object.keys(this.state.winningPatterns).length; ++i) {
        let pattern = this.state.winningPatterns[i];
        let match = player1Copy.filter(element => pattern.includes(element));
        if (this.checkArrayEquality(pattern, match)) {
          this.setState({
            gameOver: true
          });
        }
      }
      this.setState({
        player1: player1Copy,
        currentPlayer: false
      });
    } else {
      player2Copy = this.state.player2;
      e.target.innerHTML = '<h2>O</h2>';
      player2Copy.push(Number(boxNumber));
      for (let i=0; i < Object.keys(this.state.winningPatterns).length; ++i) {
        let pattern = this.state.winningPatterns[i];
        let match = player2Copy.filter(element => pattern.includes(element));
        if (this.checkArrayEquality(pattern, match)) {
          this.setState({
            gameOver: true
          });
        }
      }
      this.setState({
        player2: player2Copy,
        currentPlayer: true
      });
    }

  }
  
  newGame() {
    let className;
    this.setState(this.initialState);
    for(let i = 0; i < 9; ++i) {
      className = "box" + String(i);
      document.querySelector(className).innerHTML = '';
    }
  }

  render() {
  return (
    <div id="body">
      <div id="header">
        {this.state.gameOver ? 
      (
        <div id="gameOver">
        <h1>Game Over</h1>
        <h2>The winner is: {this.state.currentPlayer ? 'O' : 'X'}</h2>
        <button id='newgame' onClick={this.newGame}>New Game</button>
        </div>
      )
      :
      ( <div id="welcome"> 
        <h1>Welcome to TicTacToe</h1>
        <h2>TicTacToe is now multiplayer.</h2>
        <h3>Soon you can play with the computer.</h3>
        {this.state.currentPlayer ? <h3>Next Player: X</h3> : <h3>Next Player: O</h3>}
        </div>  
       )

      }
      
      </div>
      
      <div id="game">
        <Grid handleClick={this.handleClick}/>
      </div>
      
      <div id="footer">
        Copyright will be worked out if I don't fail at something so simple.
      </div>
    </div>
  );
  }
}

export default App;

     // for (let j=0; j<3; ++j) {
      //   let flag = 0;
      //   for (let k=0; k<3; ++k) {
      //     if (!this.state.player1[j] === pattern[k]) {
      //       flag = 1;
      //       break;
      //     }
      //   }
      // }