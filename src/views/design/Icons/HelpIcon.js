import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

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
                        <HelpIcon style={{ fontSize: 30 }} />
                    </Tooltip>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClick={() => {this.setState({open: false})}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div>
                        Here are the instructions.
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default InstructionsIcon;
