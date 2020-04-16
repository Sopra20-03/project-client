import React, from "react";
import PlayerBox from "./PlayerBox";
import Colors from "../../views/design/Colors";
import {ContainerRow} from "./Gameplay";

function AllPlayerBoxes(props) {
    let players = props.opponents;
    let colors = [Colors.blue, Colors.orange, Colors.violet, Colors.green];
    let icons = ['female', 'male', 'female', 'male'];
    return (
        <ContainerRow>
            { players.map((player, index) => (
                <PlayerBox userName={player === null ? 'empty' : player.userName}
                           gender={icons[index]}
                           borderColor={colors[index]}
                />
                ))}
        </ContainerRow>
    );
}

export default AllPlayerBoxes;
