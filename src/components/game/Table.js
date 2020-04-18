import React, { Component } from "react";
import styled from "styled-components";

import WordCard from "./WordCard";
import WhiteTextField from "./InputField";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { api, handleError } from "../../helpers/api";
import { ContainerRow } from "./Gameplay";
import { store } from "../../store";
import Colors from "../../views/design/Colors";
import MessageBox from "./MessageBox";
import Clues from "./Clues";

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

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.getRound();
    this.state = {
      guessInput: "",
      isGuessCorrect: "",
      showVerifyGuessPopup: false,
      gamePhase: "",
      wordCard: "",
    };
  }

  async getRound() {
    //let gameId = store.getState().lobbyReducer.gameId;
    let gameId = 1;
    let currentRound = 1;
    try {
      console.log("***API CALL - GET ROUND***");
      const response = await api.get(
        `/games/${gameId}/rounds/${currentRound}`,
        {
          withCredentials: true,
        }
      );
      this.setState({ wordCard: response.data.wordCard });
      console.log("Current Round: ", this.state.wordCard);
    } catch (error) {
      alert(
        `Something went wrong while getting round: \n${handleError(error)}`
      );
    }
  }

  async submitGuess() {
    const state = store.getState();
    const gameId = state.gameId;
    const currentPlayer = this.props.player;
    try {
      console.log("***API CALL - SUBMIT GUESS***");
      const requestBody = {
        word: this.state.guessInput,
      };
      const response = await api.post(
        `/games/${gameId}/players/${currentPlayer}/guess`,
        requestBody,
        {
          withCredentials: true,
        }
      );
      this.setState({ isGuessCorrect: response.data.isValid });
    } catch (error) {
      alert(
        `Something went wrong during the guess submission: \n${handleError(
          error
        )}`
      );
    }
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  createMessage(gamePhase) {
    if (gamePhase === "ROUND_ANNOUNCEMENT") return "Round X of 13";
    else if (gamePhase === "ROLE_ASSIGNMENT") return "You are the GUESSER";
    else if (gamePhase === "WAITING_FOR_CLUES")
      return "Players are writing clues...";
    else return "This is the default message";
  }

  render() {
    return (
      <div>
        <GameTable>
          <ContainerRow>
            <Clues />
          </ContainerRow>
          <ContainerRow style={{ justifyContent: "center" }}>
            <WordCard wordCard={this.state.wordCard} />
          </ContainerRow>
          <ContainerRow>
            <MessageBox msg={this.createMessage("ROUND_ANNOUNCEMENT")} />
          </ContainerRow>
          <ContainerRow style={{ justifyContent: "center" }}>
            <WhiteTextField
              label="Guess here..."
              variant="filled"
              id="guess"
              onChange={(e) => {
                this.handleInputChange("guessInput", e.target.value);
              }}
            />
            <CheckCircleOutlineIcon
              style={{ fontSize: 60, color: Colors.green }}
              onClick={() => {
                this.submitGuess();
              }}
            ></CheckCircleOutlineIcon>
          </ContainerRow>
        </GameTable>
      </div>
    );
  }
}
