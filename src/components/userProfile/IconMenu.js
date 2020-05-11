import React from 'react';
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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


export default function IconMenu(props) {
    const [icon, setIcon] = React.useState(props.initialIcon);

    const handleChange = (event) => {
        setIcon(event.target.value);
        props.handleIconSelect(event);
    };

    return (
        <div>
            <FormControl>
            <InputLabel id="simple-select-label"/>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={icon}
                onChange={handleChange}
            >
                    <MenuItem value="swan">
                        <img alt="" src={swan} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="dog">
                        <img alt="" src={dog} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="cat">
                        <img alt="" src={cat} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="fish">
                        <img alt="" src={fish} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="bird">
                        <img alt="" src={bird} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="bee">
                        <img alt="" src={bee} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="owl">
                        <img alt="" src={owl} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="hen">
                        <img alt="" src={hen} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="butterfly">
                        <img alt="" src={butterfly} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="iguana">
                        <img alt="" src={iguana} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="female">
                        <img alt="" src={userfemale} height="60rem" width="50rem"/>
                    </MenuItem>
                    <MenuItem value="male">
                        <img alt="" src={usermale} height="60rem" width="50rem"/>
                    </MenuItem>
            </Select>
        </FormControl>
        </div>
    );
}
