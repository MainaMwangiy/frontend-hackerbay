import React, { Component } from "react";

import Grid from './Grid'

class Logic extends Component {
  state = { grid: [0, 1, 2, 3, 4, 5, 6, 7, 8], size: 3, sodas: [] };

  componentWillMount() {
    const size = window.prompt("What size do you want?");
    if (/^\d+$/.test(size)) {
      this.newGame(size);
    } else {
      alert("Please input a number");
      window.location.href = "/";
    }
  }

  checkArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) !== i) return false;
    }
    return true;
  };

  newGame = (size) => {
    let grid = new Array(size * size);
    let sodas = new Array(size);
    for (let i = 0; i < size * size; ++i) grid[i] = i;

    do {
      for (let x = 0; x < size; x++) {
        sodas[x] = Math.floor(Math.random() * (size * size - 1) + 1);
      }
    } while (!this.checkArray(sodas));
    const sizee = size - 1;
    let mid = Math.round(Math.abs((sizee * sizee) / 2));
    let middata = grid[mid];
    let firstdata = grid[0];
    grid[0] = middata;
    grid[mid] = firstdata;
    this.updategrid(grid, size);
    this.setState({ size: size, sodas });
  };
  updategrid = (grid) => {
    this.setState({ grid: grid });
  };
  shuffle = (o) => {
    const temp = o.slice();
    for (
      var j, x, i = temp.length;
      i;
      j = Math.floor(
        Math.random() * i,
        (x = temp[--i]),
        (temp[i] = temp[j]),
        (temp[j] = x)
      )
    );
    return temp;
  };
  render() {
    return (
      <div className="logic">
        <h1>Start the Game</h1>

        {this.state && this.state.grid ? (
          <Grid
            size={this.state.size}
            grid={this.state.grid}
            updategrid={this.updategrid}
            sodas={this.state.sodas}
          />
        ) : null}
      </div>
    );
  }
}

export default Logic;
