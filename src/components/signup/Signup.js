import React from 'react';
import {
    FormControl,
    InputLabel,
    Input,
    Paper,
    withStyles,
    CssBaseline,
    Typography,
    Button,
} from '@material-ui/core';
import styles from './styles';
const firebase = require('firebase');

class Signup extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}></Paper>
            </main>
        );
    }
}

export default withStyles(styles)(Signup);
