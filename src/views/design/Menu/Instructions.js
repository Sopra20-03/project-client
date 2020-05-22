import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Colors from "../Colors/Colors";
import Grid from "@material-ui/core/Grid";
import {BoxHeader} from "../../../components/lobby/Lobby";

class InstructionsIcon extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
    }

    render() {
        return (
            <div>
                <Button
                    style={{
                        size: "fit-content",
                        display: "inline",
                    }}
                    onClick={() => {
                        this.setState({open: true})
                    }}
                >
                    <Tooltip disableFocusListener disableTouchListener title="Help">
                        <HelpIcon style={{fontSize: 30}}/>
                    </Tooltip>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClick={() => {
                        this.setState({open: false})
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{padding: 10, background: '#f3ead8'}}>
                        <Grid container alignItems="center" justify={"left"}>
                            <Grid item sm={8} md={8} lg={8}>
                                <BoxHeader>
                                    <span style={Colors.textOrange}>I</span>
                                    <span style={Colors.textRed}>n</span>
                                    <span style={Colors.textPink}>s</span>
                                    <span style={Colors.textViolet}>t</span>
                                    <span style={Colors.textBlue}>r</span>
                                    <span style={Colors.textGreen}>u</span>
                                    <span style={Colors.textYellow}>c</span>
                                    <span style={Colors.textBlack}>t</span>
                                    <span style={Colors.textOrange}>i</span>
                                    <span style={Colors.textRed}>o</span>
                                    <span style={Colors.textPink}>n</span>
                                    <span style={Colors.textViolet}>s</span>
                                </BoxHeader>
                            </Grid>
                        </Grid>
                        <div style={Colors.textOrange}>
                            <h3>Objective:</h3>
                            <p>Just One is a party game. You all play together to get the best score!
                                If you are the clue writer your job is to provide a clue to the guesser to help
                                them guess the correct word. if you are the guesser, you select a mystery word and
                                use the other players clues to guess that word!
                            </p>
                        </div>
                        <div style={Colors.textRed}>
                            <h3>Guesser Details:</h3>
                            <p>First, you will select a word from the given wordcard anonymously. You will not be able
                                to see this word, but the other players will see the word you selected in order to write
                                clues.
                                After your teammates are done writing clues, you are shown only the valid clues and must
                                guess
                                the word before the time runs out. If you are correct, everyone gets one point. If you
                                are
                                incorrect,
                                no points are awarded.
                            </p>
                        </div>
                        <div style={Colors.textPink}>
                            <h3>Clue Writer Details:</h3>
                            <p>After the guesser selects a word, you must think of a clue to help them guess that word.
                                You
                                cannot communicate or collaborate with any team members while writing your clue. Once
                                all
                                clue
                                writers have submitted their clues, the clues are validated.</p>
                            <h4>Invalid Clues</h4>
                            <ul>
                                <li>The clue is more than one word (contains a space)</li>
                                <li>The clue matches or contains a substring of the selected word</li>
                                <li>The clue matches or contains a substring of another player's clue</li>
                            </ul>
                            <p>These clues will be automatically validated before being shown to the guesser.</p>
                        </div>
                        <div style={Colors.textViolet}>
                            <h3>Bot Players:</h3>
                            <p>Each game is intended to have 5 players. If you do not have enough in your game, the
                                remaining
                                player slots will be filled with Bots. These bots can only play as the clue writer role
                                and
                                will automatically provide similar words to the word the guesser selected...or not.</p>
                            <h4>Friendly vs. Malicious Bots:</h4>
                            <p>Friendly bots are programmed to provide you with a clue very similar to the selected
                                word.
                                This should make it much easier to guess.</p>
                            <p>Malicious bots are programmed to give very bad clues that are often unrelated to the
                                selected word.
                                You can play with these bots when you don't want any assistance and want the main focus
                                to be
                                on the clues given by your other human players.</p>
                            <p>Keep in mind the bot clues are compared against the other player's clues, so they can be
                                invalidated the same ways.</p>
                        </div>
                        <div style={Colors.textBlue}>
                            <h3>Rival Mode:</h3>
                            <p>This variation of the game allows each player to get an individual score based on their
                                clue or guess validity as well as the time it takes them to submit their word. Since
                                this is a team game, no winner is declared, but your individual score can be found on
                                the leaderboard. </p>
                        </div>
                        <div style={Colors.textGreen}>
                            <h3>End of the Game:</h3>
                            <p>After 13 rounds the game is over and each player is awarded the same game score according
                                to the number of correct guesses.</p>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default InstructionsIcon;
