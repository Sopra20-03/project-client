import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function LogoutIcon() {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
            <Tooltip disableFocusListener disableTouchListener title="Logout">
                <ExitToAppIcon style = {{ display: "inline", fontSize: 30, position: "absolute", right: 20, top: 20}}/>
            </Tooltip>
    );
}