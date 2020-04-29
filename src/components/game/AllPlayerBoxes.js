import React from "react";
import PlayerBox from "./PlayerBox";
import Colors from "../../views/design/Colors";
import { ContainerRow } from "./Gameplay";
import { store } from "../../store";

function AllPlayerBoxes(props) {
  let players = props.players.filter(
    (x) => x.userId !== store.getState().gameplayReducer.userId
  );
  let colors = [Colors.blue, Colors.orange, Colors.violet, Colors.green];
  let icons = ["female", "male", "female", "male"];

  return (
      <ContainerRow>
        {colors.map((color, index) => (
            <PlayerBox
                key={players[index] ? players[index].playerId : index}
                userName={players[index] ? players[index].userName : 'Bot'}
                gender={players[index] ? icons[index] : 'bot'}
                borderColor={color}
            />
        ))}
      </ContainerRow>
  );

}

export default AllPlayerBoxes;
