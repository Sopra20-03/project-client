import React from "react";
import {FormHeader, TextInput} from "../login/Login";
import {BaseContainer, GameContainer} from "../../helpers/layout";
import {handleError} from "../../helpers/api";
import {withRouter} from "react-router-dom";
//import Button from "../../views/design/Button";
import Colors from "../../views/design/Colors";
//Redux
import {connect} from "react-redux";
import {store} from "../../store";
import {logoutUser} from "../../redux/actions/userActions";
import {createGame, joinGame} from "../../redux/actions/lobbyActions";
import LogoutIcon from "../../views/design/Icons/LogoutIcon";
import {SmallLogo} from "../../views/logos/SmallLogo";
import InputLabel from "@material-ui/core/InputLabel";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import HashLoader from "react-spinners/HashLoader";
import {withStyles} from "@material-ui/core/styles";
import {errorNotification} from "../../helpers/notifications/toasts";

import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  margin: {
    margin: "10px",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 150,
    backgroundColor: "#f3ead8",
    color: "#000000",
    fontSize: "16px",
    borderRadius: "5px",
    height: "40px",
  },
  formControlName: {
    margin: theme.spacing(2),
    minWidth: "510px",
    backgroundColor: "#f3ead8",
    color: "#000000",
    fontSize: "16px",
    borderRadius: "5px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const PrimaryButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#00a4ea",
    "&:hover": {
      backgroundColor: "#0d7bea",
    },
    margin: 20,
  },
}))(Button);

const SecondaryButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#de0006",
    "&:hover": {
      backgroundColor: "#7D0002",
    },
    margin: 20,
  },
}))(Button);

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
      botMode: null,
      duration: "SHORT",
      validGameName: true,
    };
  }

  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new game is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async createGame() {
    if (!this.state.validGameName) {
      errorNotification ('Your game name is too long. The maximum character limit is 20.');
    } else {
      try {
        const requestBody = {
          gameName: this.state.gameName,
          gameMode: this.state.gameMode,
          botMode: this.state.botMode,
          duration: this.state.duration,
          creatorUsername: store.getState().userReducer.user.username,
        };
        await this.props.createGame(requestBody);
        this.addUserToGame();
      } catch (error) {
        errorNotification(
            `Something went wrong during the game creation: \n${handleError(error)}`
        );
      }
    }
  }

  cancel() {
    this.props.history.push(`/lobby`);
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
      errorNotification(
        `Something went wrong while adding you to the game: \n${handleError(
          error
        )}`
      );
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
    if (key==='gameName' && value.length > 20)
      this.setState({validGameName : false});
    else if (key==='gameName')
      this.setState({validGameName : true});
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
    const { classes } = this.props;

    return (
      <BaseContainer>
        <GameContainer>
          <SmallLogo />
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
            <LogoutIcon />
          </FormHeader>

          <div className={classes.col}>
            <div className={classes.margin}>
              <HashLoader size={70} color={Colors.blue} />
            </div>

            <TextInput
              style={{ width: "510px" }}
              onChange={(e) => {
                this.handleInputChange("gameName", e.target.value);
              }}
              type="text"
              placeholder="Game Name"
            ></TextInput>

            <div className={classes.row}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Game Mode
                </InputLabel>
                <Select
                  style={{ height: "40px" }}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.gameMode}
                  onChange={(e) => {
                    this.handleInputChange("gameMode", e.target.value);
                  }}
                  label="Game Mode"
                >
                  <MenuItem value={null}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"STANDARD"}>Normal</MenuItem>
                  <MenuItem value={"RIVAL"}>Rival</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Bot Mode
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.botMode}
                  onChange={(e) => {
                    this.handleInputChange("botMode", e.target.value);
                  }}
                  label="Bot Mode"
                  style={{ height: "40px" }}
                >
                  <MenuItem value={null}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"FRIENDLY"}>Friendly</MenuItem>
                  <MenuItem value={"MALICIOUS"}>Malicious</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Duration
                </InputLabel>
                <Select
                  style={{ height: "40px" }}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.timer}
                  onChange={(e) => {
                    this.handleInputChange("duration", e.target.value);
                  }}
                  label="Round Duration"
                >
                  <MenuItem value={"SHORT"}>
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"SHORT"}>Short</MenuItem>
                  <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                  <MenuItem value={"LONG"}>Long</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.row}>
              <PrimaryButton
                style={{
                  height: "40px",
                  width: "140px",
                }}
                onClick={() => {
                  this.createGame();
                }}
              >
                Create Game
              </PrimaryButton>
              <SecondaryButton
                style={{
                  height: "40px",
                  width: "140px",
                }}
                onClick={() => {
                  this.cancel();
                }}
              >
                Cancel
              </SecondaryButton>
            </div>
          </div>
        </GameContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

export default withRouter(
  withStyles(useStyles)(
    connect(null, { createGame, joinGame, logoutUser })(GameDetails)
  )
);

/*
<TextField
              style={{ textAlign: "center" }}
              className={classes.formControlName}
              id="outlined-basic"
              label="Game Name"
              variant="outlined"
              onChange={(e) => {
                this.handleInputChange("gameName", e.target.value);
              }}
            />
*/
