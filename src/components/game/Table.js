import React, { Component } from "react";
import styled from "styled-components";

import WordCard from "./WordCard";
import InputField from "./InputField";
import { ContainerRow } from "./Gameplay";
import MessageBox from "./MessageBox";
import Clues from "./Clues";
import GameStates from "../../redux/reducers/gameStates";
//Redux
import { connect } from "react-redux";

export const GameTable = styled.div`
  display: flex;
  flex-direction: column;
  /**width: fit-content;
  height: fit-content;**/
  background-color: #f8f3eb;
  border-radius: 200px;
  border: 3px solid #cab48a;
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 850px;
  height: fit-content;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
`;

class Table extends Component {
  constructor(props) {
    super(props);
  }

  createMessage() {
    if (this.props.gameState.role === "GUESSER") {
      if (this.props.gameState.currentGameState == GameStates.SELECT_WORD)
        return "Please select a word!";
      if (this.props.gameState.currentGameState == GameStates.WRITE_CLUES)
        return "Clue writers are writing the clues!";
      if (this.props.gameState.currentGameState == GameStates.VALIDATE_CLUES)
        return "Clue writers are validating the clues!";
      if (this.props.gameState.currentGameState == GameStates.GUESSING)
        return "Please submit your guess!";
    } else {
      if (this.props.gameState.currentGameState == GameStates.SELECT_WORD)
        return "Guesser is selecting a word!";
      if (this.props.gameState.currentGameState == GameStates.WRITE_CLUES)
        return "Please submit your clue!";
      if (this.props.gameState.currentGameState == GameStates.VALIDATE_CLUES)
        return "Please validate the clues!";
      if (this.props.gameState.currentGameState == GameStates.GUESSING)
        return "Guesser is guessing!";
    }
  }

  render() {
    if (this.props.gameState.round == null) {
      return <h3>Loading...</h3>;
    } else {
      return (
        <div>
          <GameTable>
            <ContainerRow>
              <Clues
                clues={this.props.gameState.clues}
                players={this.props.gameState.gamePlayers.filter(
                  (x) => x.userId !== this.props.gameState.userId
                )}
              />
            </ContainerRow>
            <ContainerRow style={{ justifyContent: "center" }}>
              <WordCard />
            </ContainerRow>
            <ContainerRow>
              <MessageBox msg={this.createMessage()} />
            </ContainerRow>
            <ContainerRow style={{ justifyContent: "center" }}>
              {(this.props.ownerClue && !this.props.ownerClue.word) ||
              (this.props.gameState.role === "GUESSER" &&
                this.props.gameState.round.wordCard.selectedWord) ? (
                <InputField />
              ) : (
                <div />
              )}
            </ContainerRow>
          </GameTable>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  gameState: state.gameplayReducer,
  userState: state.userReducer,
});

export default connect(mapStateToProps, {})(Table);
