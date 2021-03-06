import React, { Component } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { handleError } from '../../helpers/api';
import { connect } from 'react-redux';
import { gameSubmitClue, gameSubmitGuess, timerStop } from '../../redux/actions/gameplayActions';
import GameStates from '../../redux/reducers/gameStates';
import SubmitIcon from '../../views/design/Menu/SubmitIcon';
import { errorNotification, infoNotification } from '../../helpers/notifications/toasts';

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function WhiteTextField(props) {
  const classes = useStyles();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

function Guesser(props) {
  async function submitGuess() {
    try {
      console.log("SUBMIT GUESS - '", props.guess, "'");
      const requestData = {
        gameId: props.gameState.gameId,
        playerId: props.gameState.playerId,
        word: props.guess,
      };
      await props.gameSubmitGuess(requestData);
    } catch (error) {
      errorNotification(
        `Something went wrong while submitting the guess: \n${handleError(
          error
        )}`
      );
    }
  }

  return (
    <SubmitIcon
      handleSubmit={() => {
        submitGuess();
      }}
    />
  );
}

function ClueWriter(props) {
  async function submitClue() {
    try {
      console.log("SUBMIT CLUE - '", props.clue, "'");
      const clueId = props.gameState.clues.find(
        (x) => x.ownerId === props.gameState.playerId
      ).clueId;
      const requestData = {
        gameId: props.gameState.gameId,
        playerId: props.gameState.playerId,
        clueId: clueId,
        word: props.clue,
      };
      await props.gameSubmitClue (requestData)
        .then (
          infoNotification ('Clue was submitted! 💡', 2000)
        );
    } catch (error) {
      errorNotification(
        `Something went wrong while submitting the clue: \n${handleError(
          error
        )}`
      );
    }
  }

  return (
    <SubmitIcon
      handleSubmit={() => {
        submitClue();
      }}
    />
  );
}

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: null,
      clue: null,
    };
  }

  componentDidMount() {
    console.log("InputField Mount");
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    if (
      this.props.gameState.role === "GUESSER" &&
      this.props.gameState.currentGameState === GameStates.GUESSING
    ) {
      return (
        <div>
          <WhiteTextField
            label="Enter guess here..."
            variant="filled"
            id="guess"
            onChange={(e) => {
              this.handleInputChange("guess", e.target.value);
            }}
          />
          <Guesser
            gameSubmitGuess={this.props.gameSubmitGuess}
            gameState={this.props.gameState}
            guess={this.state.guess}
          />
        </div>
      );
    } else if (this.props.gameState.role === "CLUE_WRITER") {
      return (
        <div>
          <WhiteTextField
            label="Enter clue here..."
            variant="filled"
            id="clue"
            onChange={(e) => {
              this.handleInputChange("clue", e.target.value);
            }}
          />
          <ClueWriter
            gameSubmitClue={this.props.gameSubmitClue}
            gameState={this.props.gameState}
            userState={this.props.userState}
            clue={this.state.clue}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state) => ({
  lobbyState: state.lobbyReducer,
  gameState: state.gameplayReducer,
  userState: state.userReducer,
});

export default connect(mapStateToProps, {
  gameSubmitClue,
  gameSubmitGuess,
  timerStop,
})(InputField);
