import React, { Component } from 'react';
import styled from 'styled-components';

import WordCard from './WordCard';
import InputField from './InputField';
import { ContainerRow } from './Gameplay';
import MessageBox from './MessageBox';
import Clues from './Clues';
//Redux
import { connect } from 'react-redux';
import GameStates from '../../redux/reducers/gameStates';

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
    this.state = {
      msgGamePhase: null,
    };
  }

  createMessage() {
    let gamePhase = "";
    if (gamePhase === "ROUND_ANNOUNCEMENT")
      return `Round ${this.props.gameState.roundNum} of 13`;
    else if (gamePhase === "ROLE_ASSIGNMENT")
      return `You are the ${this.props.gameState.role}`;
    else if (this.props.gameState.currentGameState === GameStates.WRITE_CLUES)
      return "Players are writing clues...";
    else if (gamePhase === "GUESSING")
      return "Waiting for guesser to guess word";
    else if (gamePhase === "GUESS_VALIDATION") return `Guess was CORRECT`;
    else return "This is the default message";
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
              <MessageBox
                msg={this.createMessage}
                delay={3000}
              />
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
