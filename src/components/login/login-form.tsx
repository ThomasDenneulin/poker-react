import React, {createRef, FC, FormEvent, useState} from "react";

import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button} from "@material-ui/core";

interface Props {
    loginUser: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        button: {
            margin: theme.spacing(1),
        }
    }),
);

const LoginForm: FC<Props> = (props: Props) => {
    const classes = useStyles();
    const {loginUser} = props;
    let [state,setState] = useState({
        email: '',
        password: ''
    });

    const handleOnChange = (e: any) => {
        let value = e.target.value;
        let name = e.target.name;

        setState((prevState: any) => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        loginUser(state);
    };

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={event => handleLogin(event)}>
            <div>
                <TextField
                    required
                    id="standard-required"
                    label="Email"
                    className={classes.textField}
                    value={state.email}
                    margin="normal"
                    name='email'
                    onChange={(event => handleOnChange(event))}
                />
                <TextField
                    required
                    id="standard-required"
                    label="Password"
                    value={state.password}
                    className={classes.textField}
                    margin="normal"
                    name='password'
                    onChange={(event => handleOnChange(event))}
                />
                <Button variant="contained" className={classes.button} type="submit">
                    Login
                </Button>
            </div>
        </form>
    )
};

export default LoginForm;
