import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import Confetti from "react-confetti";

import { FormHeader, TextInput } from "../login/Login";

import Colors from "../../views/design/Colors";

import React, { Component } from "react";

import PacmanLoader from "react-spinners/PacmanLoader";

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  box: {
    width: "600px",
  },
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
});

class RoundMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleState(bool) {
    this.setState({
      open: bool,
    });
  }

  render() {
    const { classes } = this.props;

    if (this.props.mode === "round") {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClick={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className={classes.box}>
              <div className={classes.col}>
                <div className={classes.row}>
                  <FormHeader>
                    <span style={Colors.textOrange}>R</span>
                    <span style={Colors.textRed}>o</span>
                    <span style={Colors.textPink}>u</span>
                    <span style={Colors.textViolet}>n</span>
                    <span style={Colors.textBlue}>d</span>
                    <span style={Colors.textGreen}> </span>
                    <span style={Colors.textYellow}>S</span>
                    <span style={Colors.textBlack}>t</span>
                    <span style={Colors.textOrange}>a</span>
                    <span style={Colors.textRed}>t</span>
                    <span style={Colors.textPink}>s</span>
                  </FormHeader>
                </div>

                {this.props.result === "success" ? (
                  <div className={classes.col}>
                    <div className={classes.row}>
                      <ThumbUpIcon style={{ fontSize: 60, color: "#00a839" }} />
                      <Confetti />
                    </div>
                    <div className={classes.row}>
                      <h1 style={Colors.textGreen}>
                        Points: {this.props.score}
                      </h1>
                    </div>
                  </div>
                ) : (
                  <div className={classes.col}>
                    <div className={classes.row}>
                      <ThumbDownIcon
                        style={{ fontSize: 60, color: "#de0006" }}
                      />
                    </div>
                    <div className={classes.row}>
                      <h1 style={Colors.textRed}>Points: {this.props.score}</h1>
                    </div>
                  </div>
                )}

                <div className={classes.row}>
                  <h2>Word: {this.props.selectedWord}</h2>
                </div>

                {this.props.playerrole === "CLUE_WRITER" ? (
                  <div className={classes.col}>
                    <div className={classes.row}>
                      <h2>Your Clue: {this.props.userClue}</h2>
                    </div>
                    <div className={classes.row}>
                      <h2>Guesser's Guess: {this.props.guess}</h2>
                    </div>
                  </div>
                ) : (
                  <div className={classes.col}>
                    <div className={classes.row}>
                      <h2>Your Guess: {this.props.guess}</h2>
                    </div>
                  </div>
                )}
              </div>

              <DialogActions>
                <Button
                  onClick={() => {
                    this.handleState(false);
                  }}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      );
    } else {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClick={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className={classes.box}>
              <div className={classes.col}>
                <div className={classes.row}>
                  <FormHeader>
                    <span style={Colors.textOrange}>G</span>
                    <span style={Colors.textRed}>a</span>
                    <span style={Colors.textPink}>m</span>
                    <span style={Colors.textViolet}>e</span>
                    <span style={Colors.textBlue}> </span>
                    <span style={Colors.textGreen}>O</span>
                    <span style={Colors.textYellow}>v</span>
                    <span style={Colors.textBlack}>e</span>
                    <span style={Colors.textOrange}>r</span>
                  </FormHeader>
                </div>

                <div className={classes.row}>
                  <SportsEsportsIcon
                    style={{ fontSize: 60, color: "#00a839" }}
                  />
                  <Confetti />
                </div>
                <div className={classes.row}>
                  <h1 style={Colors.textGreen}>Points: {this.props.score}</h1>
                </div>

                <div className={classes.row}>
                  <h1 style={Colors.textGreen}>Goodbye!</h1>
                </div>
              </div>

              <DialogActions>
                <Button
                  onClick={() => {
                    this.handleState(false);
                  }}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      );
    }
  }
}

export default withStyles(useStyles)(RoundMessage);
