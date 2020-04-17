import React from 'react';
import { fade, makeStyles, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    focused: {},
}));

export default function WhiteTextField(props) {
    const classes = useStyles();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}


export function InputField() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <WhiteTextField
                label="Guess here..."
                className={classes.margin}
                variant="filled"
                id="guess"
            />
        </form>
    );
}
