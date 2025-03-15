import React from 'react';
import { Link } from 'react-router-dom';
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
import firebase from 'firebase';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: '',
        };
    }

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
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-input'>
                                Create A Password
                            </InputLabel>
                            <Input
                                type='password'
                                id='signup-password-input'
                                onChange={(e) => this.userTyping('password', e)}
                            ></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-confirmation-input'>
                                Confirm Your Password
                            </InputLabel>
                            <Input
                                type='password'
                                id='signup-password-confirmation-input'
                                onChange={(e) =>
                                    this.userTyping('passwordConfirmation', e)
                                }
                            ></Input>
                        </FormControl>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                    {this.state.signupError ? (
                        <Typography
                            className={classes.errorText}
                            component='h5'
                            variante='h6'
                        >
                            {this.state.signupError}
                        </Typography>
                    ) : null}
                    <Typography
                        component='h5'
                        variant='h6'
                        className={classes.hasAccountHeader}
                    >
                        Already Have an Account?
                    </Typography>
                    <Link className={classes.logInLink} to='/login'>
                        Log In
                    </Link>
                </Paper>
            </main>
        );
    }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    userTyping = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({
                    email: e.target.value,
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value,
                });
                break;
            case 'passwordConfirmation':
                this.setState({
                    passwordConfirmation: e.target.value,
                });
                break;
            default:
                break;
        }
    };

    submitSignup = (e) => {
        e.preventDefault();
        if (!this.formIsValid()) {
            this.setState({
                signupError: 'Passwords do not match',
            });
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(
                (authRes) => {
                    const userObj = {
                        email: authRes.user.email,
                    };
                    firebase
                        .firestore()
                        .collection('users')
                        .doc(this.state.email)
                        .set(userObj)
                        .then(
                            () => {
                                this.props.history.push('/dashboard');
                            },
                            (dbError) => {
                                console.log(dbError);
                                this.setState({
                                    signupError: 'Failed to add user ',
                                });
                            }
                        );
                },
                (authError) => {
                    console.log(authError);
                    this.setState({ signupError: 'Failed to add user ' });
                }
            );
    };
}

export default withStyles(styles)(Signup);
