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

  return (
    <ContainerRow>
      {colors.map((color, index) => (
        <PlayerBox
          key={colors[index]}
          userName={players[index] ? players[index].userName : "Bot"}
          icon={players[index] ? props.icons[index] : "bot"}
          borderColor={color}
        />
      ))}
    </ContainerRow>
  );
}

export default AllPlayerBoxes;
