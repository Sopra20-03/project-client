import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ListIcon from '@material-ui/icons/List';
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";


class LobbyIcon extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Button
                style={{
                    size: "fit-content",
                    display: "inline",
                    fontSize: 30,
                    position: "absolute",
                    right: 200,
                    top: 20,
                }}
                onClick={() => {
                    this.props.history.push("/lobby");
                }}
            >
                <Tooltip disableFocusListener disableTouchListener title="Lobby">
                    <ListIcon style={{ fontSize: 30 }} />
                </Tooltip>
            </Button>
        );
    }
}

export default withRouter(LobbyIcon);