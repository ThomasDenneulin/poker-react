import React, {FC, useEffect, useState} from "react";
import RegisterForm from "./register-form";
import {Button, Card, CardContent, Container, createStyles, makeStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../context/auth-context";

const remote = window.require('electron').remote;

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

const RegisterScreen: FC = () => {

    const classes: any = useStyles();
    const history: any = useHistory();
    const {register}: any = useAuth();

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        S'inscrire
                    </Typography>

                    <RegisterForm
                        submit={register}
                    />

                    <Button onClick={ev => {
                        history.push('/')
                    }}>
                        Cancel
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RegisterScreen;
