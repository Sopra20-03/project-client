import React, {Component} from "react";
import styled from "styled-components";

import WordCard from "./WordCard";

import Player from "./Player";
import GuessCard from "./GuessCard";
import Button from "../../views/design/Button";
import RolePopup from "./RolePopup";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background-color: #00a839;
  border-radius: 100px;
  border: 2px solid black;
`;

export const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const CurrentPlayer = {
  id: 1,
  role: "clue writer"
};


export default class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {showRolePopup: false, player: CurrentPlayer};
  }

  getRole() {
    // TODO implement method to get players for current game --> get role by logged in player id
  }

  togglePopup() {
    this.setState({
      showRolePopup: !this.state.showRolePopup
    });
  }

  render() {
    return (
      <div>
        <Container>
          <ContainerRow>
            <Player/>
            <Player/>
            <Player/>
            <Player/>
          </ContainerRow>

          <ContainerRow>
            <GuessCard/>
            <GuessCard/>
            <GuessCard/>
            <GuessCard/>
          </ContainerRow>

          <ContainerRow style={{justifyContent: "center"}}>
            <WordCard/>
          </ContainerRow>
          <Button onClick={() => {
            this.togglePopup()
          }}>Toggle Role</Button>
          {this.state.showRolePopup ?
          <RolePopup role={this.state.player.role} closePopup={this.togglePopup.bind(this)}/> : null}
        </Container>
      </div>

    );
  }
}
