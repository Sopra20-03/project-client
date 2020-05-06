import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import userfemale from "../../views/logos/user_female.png";
import usermale from "../../views/logos/user_male.png";
import bird from "../../views/logos/001-bird.png";
import dog from "../../views/logos/002-dog.png";
import cat from "../../views/logos/003-cat.png";
import fish from "../../views/logos/004-clown-fish.png";
import iguana from "../../views/logos/005-iguana.png";
import hen from "../../views/logos/006-hen.png";
import owl from "../../views/logos/007-owl.png";
import bee from "../../views/logos/008-bee.png";
import swan from "../../views/logos/009-swan.png";
import butterfly from "../../views/logos/010-butterfly.png";

export default function IconMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickItem = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Icons
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClickItem}>
                    <img alt="" src={swan} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClickItem}>
                <img alt="" src={dog} height="60rem" width="50rem"/>
            </MenuItem>
                <MenuItem onClick={handleClickItem}>
                    <img alt="" src={cat} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClickItem}>
                    <img alt="" src={fish} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClickItem}>
                    <img alt="" src={bird} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={bee} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={owl} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={hen} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={butterfly} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={iguana} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={userfemale} height="60rem" width="50rem"/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <img alt="" src={usermale} height="60rem" width="50rem"/>
                </MenuItem>
            </Menu>
        </div>
    );
}
