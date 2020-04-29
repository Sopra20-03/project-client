import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';

const FormButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#00a4ea',
        '&:hover': {
            backgroundColor: '#0d7bea',
        },
        margin: 20,
    },
}))(Button);

export default FormButton;
