import React, {Component} from "react";
import ClueCard from "./ClueCard";
import Colors from "../../views/design/Colors/Colors";
// Redux
import {connect} from "react-redux";

class Clues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clues: [],
            colors: [],
        };
    }

    componentDidMount() {
      console.log("Clues Mount");
        this.setupColors();
    }


    setupColors() {
        let colors = [];
        colors.push(Colors.blue);
        colors.push(Colors.orange);
        colors.push(Colors.violet);
        colors.push(Colors.green);
        this.setState({
            colors: colors,
        });
    }

    render() {
        return this.props.clues.map((clue, index) => {
            //console.log(clue);
            //console.log(index);
            return (
                <ClueCard
                    key={clue}
                    borderColor={this.state.colors[index]}
                    clue={clue.word}
                />
            );
        });
    }
}


const mapStateToProps = (state) => ({
    lobbyState: state.lobbyReducer,
    gameState: state.gameplayReducer,
    userState: state.userReducer,
});

export default connect(mapStateToProps, {})(Clues);
