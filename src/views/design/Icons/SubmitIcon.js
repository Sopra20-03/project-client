import React from "react";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Colors from "../Colors/Colors";

class SubmitIcon extends React.Component {
    render() {
        return (
            <Button
                style={{
                    size: "fit-content",
                    display: "inline",
                    fontSize: 30,
                }}
                onClick={() => {
                    this.props.handleSubmit();
                }}
            >
                <Tooltip disableFocusListener disableTouchListener title="Submit">
                    <CheckCircleOutlineIcon style={{ fontSize: 60, color: Colors.green }} />
                </Tooltip>
            </Button>
        );
    }
}

export default SubmitIcon;