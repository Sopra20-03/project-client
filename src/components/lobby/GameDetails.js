import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import Button from "../../views/design/Button";
import Game from "../shared/models/Game";
import Colors from "../../views/design/Colors";

//Redux
import {connect, useSelector} from "react-redux";
import { store } from "../../store"
import { createGame, joinGame } from "../../redux/actions/gameActions";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
`;

const FormContent = styled.div`
  margin-top: 2em;
  --webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 5px 5px 5px 5px;
  background: #ffffff;
  padding: 1.2rem;
  width: 90%;
  width: 60%;
  position: relative;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const FormHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 10px;
  margin: auto;
`;

const TextInput = styled.input`
  background-color: #f3ead8;
  border: none;
  color: #0d0d0d;
  padding: 0.5rem 0.8rem;
  margin: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 85%;
  border: 2px solid;
  transition: all 0.5s ease-in-out;
  border-radius: 5px;

  &::focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
    border-radius: 5px;
  }
`;

/**
 * @Class
 */
class GameDetails extends React.Component {
  /**
   * The initial state is defined in the constructor. The state is a JS object containing two fields: gameName and creator
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      gameId: null,
      gameName: null,
      gameMode: null,
      creator: null,
    };
  }

  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new game is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async createGame() {
    const state = store.getState();
    const creator = state.userReducer.user.username;
    try {
      const requestBody = {
        gameName: this.state.gameName,
        gameMode: this.state.gameMode,
        creatorUsername: creator,
      };
      await this.props.createGame(requestBody);
      this.addUserToGame();
    } catch (error) {
      alert(`Something went wrong during the game creation: \n${handleError(error)}`);
    }
  }

  async addUserToGame() {
    const state = store.getState();
    const gameId = state.gameReducer.gameId;
    const userId = state.userReducer.user.id;
    try {
      const requestBody = {
        userId: userId,
      };
      await this.props.joinGame(gameId, requestBody);
      this.props.history.push(`/lobby`);
    } catch (error) {
      alert(`Something went wrong while adding you to the game: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is gameName, this statement is the equivalent to the following one:
    // this.setState({'gameName': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <FormContent>
            <FormHeader>
              <span style={Colors.textOrange}>G</span>
              <span style={Colors.textRed}>a</span>
              <span style={Colors.textPink}>m</span>
              <span style={Colors.textViolet}>e </span>
              <span style={Colors.textBlue}>D</span>
              <span style={Colors.textGreen}>e</span>
              <span style={Colors.textYellow}>t</span>
              <span style={Colors.textBlack}>a</span>
              <span style={Colors.textOrange}>i</span>
              <span style={Colors.textRed}>l</span>
              <span style={Colors.textPink}>s</span>
            </FormHeader>

            <TextInput
              onChange={(e) => {
                this.handleInputChange("gameName", e.target.value);
              }}
              type="text"
              placeholder="Game Name"
            ></TextInput>
            <Button
              width="25%"
              onClick={() => {
                this.createGame();
              }}
            >
              Create Game
            </Button>
          </FormContent>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(connect(null, { createGame, joinGame })(GameDetails));
