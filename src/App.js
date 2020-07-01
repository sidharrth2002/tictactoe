import React from 'react';
import './App.css';


class Grid extends React.Component {
  render() {
    return (
      <div id="grid">
        {
          this.props.grid.map((value, index) => {
            return <Box index={index} handleClick={this.props.handleClick} content={value}/>
          })
        }
      </div>
    )
  }
}

function Box(props) {
  return (
    <div className="box" dataBox={props.index} onClick={props.handleClick}>
      <h1>{props.content}</h1>
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winningPatterns: {0:[0, 1, 2], 1:[0, 3, 6], 2:[3, 4, 5],
                        3:[1, 4, 7], 4:[6, 7, 8], 5:[2, 5, 8],
                        6:[0, 4, 8], 7:[2, 4, 6]},
      grid: ['', '', '', '', '', '', '', '', ''],
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
    grid: ['', '', '', '', '', '', '', '', ''],
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
    let boxNumber = Number(e.target.getAttribute('dataBox'));
    let player1Copy, player2Copy;
    let gridCopy = this.state.grid;
    if (this.state.player1.includes(boxNumber) || this.state.player2.includes(boxNumber)) return;
    if(this.state.currentPlayer) {
      player1Copy = this.state.player1;
      gridCopy[boxNumber] = 'X';
      player1Copy.push(Number(boxNumber));
      for (let i=0; i < Object.keys(this.state.winningPatterns).length; ++i) {
        let pattern = this.state.winningPatterns[i];
        let match = player1Copy.filter(element => pattern.includes(element));
        if (this.checkArrayEquality(pattern, match)) {
          this.setState({
            gameOver: true,
          });
        }
      }
      this.setState({
        player1: player1Copy,
        currentPlayer: false,
        grid: gridCopy
      });
    } else {
      player2Copy = this.state.player2;
      gridCopy[boxNumber] = 'O';
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
        currentPlayer: true,
        grid: gridCopy
      });
    }

  }
  
  newGame() {
    this.setState(this.initialState);
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
        <Grid handleClick={this.handleClick} grid={this.state.grid}/>
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