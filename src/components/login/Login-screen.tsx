import React from 'react';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoginForm from "./login-form";
import {useAuth} from "../../context/auth-context";
import {Button, Card, CardContent, colors, Container} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            maxWidth: 300,
        },
        container: {
            height: "100%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }),
);

export default function LoginScreen() {
    const history: any = useHistory();
    const classes = useStyles();
    const {login}: any = useAuth();

    return (
        <Container className={classes.container}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h3">
                        Login
                    </Typography>
                    <LoginForm loginUser={login}/>
                    <Button onClick={ev => {history.push('/register')}}>
                        Register
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}
