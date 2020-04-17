import React from "react";
import { FormHeader, TextInput } from "../login/Login";
import { BaseContainer, GameContainer } from "../../helpers/layout";
import { handleError } from "../../helpers/api";
import { withRouter } from "react-router-dom";
import Button from "../../views/design/Button";
import Colors from "../../views/design/Colors";
//Redux
import { connect } from "react-redux";
import { store } from "../../store";
import { logoutUser } from "../../redux/actions/userActions";
import { createGame, joinGame } from "../../redux/actions/lobbyActions";
import LogoutIcon from "./LogoutIcon";
import {SmallLogo} from "../../views/logos/SmallLogo";

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
    };
  }

  async logout() {
    await this.props.logoutUser();
    //await this.props.resetState();
    this.props.history.push("/login");
  }

  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new game is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async createGame() {
    try {
      const requestBody = {
        gameName: this.state.gameName,
        gameMode: this.state.gameMode,
        creatorUsername: store.getState().userReducer.user.username,
      };
      await this.props.createGame(requestBody);
      this.addUserToGame();
    } catch (error) {
      alert(`Something went wrong during the game creation: \n${handleError(error)}`);
    }
  }

  async addUserToGame() {
    const state = store.getState();
    const gameId = state.lobbyReducer.gameId;
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
          <GameContainer>
            <SmallLogo/>
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
              <LogoutIcon/>
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
            <Button
                onClick={() => {
                  this.logout();
                }}
            >
              Logout
            </Button>
          </GameContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(connect(null, { createGame, joinGame, logoutUser })(GameDetails));
