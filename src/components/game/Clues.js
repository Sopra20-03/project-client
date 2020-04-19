import React, { Component } from "react";
import { api } from "../../helpers/api";
import ClueCard from "./ClueCard";
import Colors from "../../views/design/Colors/Colors";

export default class Clues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clues: [],
      colors: [],
    };
  }

  componentDidMount() {
    this.getClues();
    this.setupColors();
  }

  setupColors() {
    let colors = [];
    colors.push(Colors.blue);
    colors.push(Colors.green);
    colors.push(Colors.pink);
    colors.push(Colors.orange);
    colors.push(Colors.red);
    this.setState({
      colors: colors,
    });
  }

  //TODO
  getClues() {
    this.setState({
      clues: ["joey", "chandler", "sitcom", "coffeehouse", "new york"],
    });
  }

  render() {
    return this.state.clues.map((clue, index) => {
      console.log(clue);
      console.log(index);
      return (
        <ClueCard
          key={clue}
          borderColor={this.state.colors[index]}
          clue={clue}
        />
      );
    });
  }
}
