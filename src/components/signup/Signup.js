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
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Sign Up!
                    </Typography>
                    <form
                        onSubmit={(e) => this.submitSignup(e)}
                        className={classes.form}
                    >
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-email-input'>
                                Enter Your Email
                            </InputLabel>
                            <Input
                                autoComplete='email'
                                onChange={(e) => this.userTyping('email', e)}
                                autoFocus
                                id='signup-email-input'
                            ></Input>
                        </FormControl>
                    </form>
                </Paper>
            </main>
        );
    }

    userTyping = (type, e) => {
        console.log(type, e);
    };

    submitSignup = (e) => {
        console.log('Submitting');
    };
}

export default withStyles(styles)(Signup);
