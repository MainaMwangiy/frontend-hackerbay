import React, { Component } from "react";
import Cols from "./Cols";
import sodas from "../images/green.jpg";

export default class Grid extends Component {
  state = {
    count: 1,
    zero: "",
    TopIndex: "",
    RightIndex: "",
    BottomIndex: "",
    LeftIndex: "",
  };
  componentWillMount() {
    this.navigate(this.props.grid, this.props.size);
  }
  componentWillReceiveProps(nextProps) {
    this.navigate(nextProps.grid, nextProps.size);
  }
  shouldComponentUpdate(nextProps) {
    const curr = this.props.grid.join("");
    const next = nextProps.grid.join("");
    return curr !== next;
  }

  navigate = (grid, size) => {
    const zeroIndex = grid.indexOf(0);
    const zeroCoordinate = this.getCoordFromIndex(zeroIndex, size);
    const TopIndex =
      zeroCoordinate.row > 0
        ? this.getIndexFromCoord(
            zeroCoordinate.row - 1,
            zeroCoordinate.column,
            size
          )
        : null;
    const RightIndex =
      zeroCoordinate.column < size
        ? this.getIndexFromCoord(
            zeroCoordinate.row,
            zeroCoordinate.column + 1,
            size
          )
        : null;
    const BottomIndex =
      zeroCoordinate.row < size
        ? this.getIndexFromCoord(
            zeroCoordinate.row + 1,
            zeroCoordinate.column,
            size
          )
        : null;
    const LeftIndex =
      zeroCoordinate.column > 0
        ? this.getIndexFromCoord(
            zeroCoordinate.row,
            zeroCoordinate.column - 1,
            size
          )
        : null;

    this.setState({
      zero: zeroIndex,
      TopIndex: TopIndex,
      RightIndex: RightIndex,
      BottomIndex: BottomIndex,
      LeftIndex: LeftIndex,
    });
  };
  getCoordFromIndex = (idx, size) => {
    return {
      row: Math.floor(idx / size) + 1,
      column: (idx % size) + 1,
    };
  };
  getIndexFromCoord = (row, col, size) => {
    return size * (row - 1) + col - 1;
  };
  cellClickHandler = (index) => {
    if (
      index === this.state.TopIndex ||
      index === this.state.RightIndex ||
      index === this.state.BottomIndex ||
      index === this.state.LeftIndex
    )
      this.nxtGrid(index);
  };
  nxtGrid = (index) => {
    this.setState({ count: this.state.count + 1 });

    const indexx = this.props.sodas.indexOf(index);
    if (indexx > -1) {
      this.props.sodas.splice(indexx, 1);
    }
    if (this.props.sodas.length === 0) {
      alert(`Game Over. Remaining moves: ${this.state.count}`);
      window.location.href = "/";
    }

    const grid = this.props.grid.slice();
    const temp = grid[index];
    grid[index] = grid[this.state.zero];
    grid[this.state.zero] = temp;
    this.props.updategrid(grid);
  };
  render() {
    const squares = this.props.grid.map((val, index) => {
      if ((index + 1) % this.props.size === 0) {
        if (this.props.sodas.includes(val)) {
          return (
            <span key={"i" + index}>
              <img
                key={index}
                alt="sodas"
                style={{ width: 60, height: 60 }}
                src={sodas}
                onClick={() => this.cellClickHandler(index)}
              />
              <br />
            </span>
          );
        } else {
          return (
            <span key={"i" + index}>
              {
                <Cols
                  key={index}
                  value={val}
                  sodas={this.props.sodas}
                  clickHandler={() => this.cellClickHandler(index)}
                />
              }
              <br />
            </span>
          );
        }
      }
      if (this.props.sodas.includes(val)) {
        return (
          <img
            key={index}
            alt="sodas"
            style={{ width: 60, height: 60 }}
            src={sodas}
            onClick={() => this.cellClickHandler(index)}
          />
        );
      } else {
        return (
          <Cols
            key={index}
            value={val}
            clickHandler={() => this.cellClickHandler(index)}
          />
        );
      }
    });
    return <div className="grid">{squares}</div>;
  }
}
