import React, {FC, useEffect, useState} from "react";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const remote = window.require('electron').remote;
const fs = window.require('fs');
const app = remote.app;

interface Form {
    playerName: string,
    email: string,
    password: string
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface Props {
    submit: any;
}

const RegisterForm: FC<Props> = (props) => {
    const classes = useStyles();
    const {submit}  = props;
    let [playerNames, setPlayerNames] = useState<string[]>([]);

    let [form, setForm] = useState<Form>({
        playerName: "",
        email: "",
        password: ""
    });

    const getPlayerNames = (): Promise<Array<string>> => {
        return new Promise<Array<string>>(((resolve, reject) => {
            const documents = app.getPath("documents");
            const playerNamePath = documents + "/Winamax Poker/accounts/";

            //Lecture des dossiers dans le dossier de winamax
            fs.readdir(playerNamePath, ((err: any, files: Array<string>) => {
                if (err) return reject(err);
                return resolve(files);
            }))
        }));
    };

    useEffect(() => {
        getPlayerNames()
            .then((files: Array<string>) => {
                setForm((prevState: any) => {
                    return {
                        ...prevState,
                        playerName: files[0]
                    }
                });
                setPlayerNames(files);
            });
    }, []);

    const handleChange = (event: any) => {
        event.persist();

        setForm((prevState: any) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    };


    return (
        <FormControl className={classes.formControl}>
            <FormHelperText>Nom winamax</FormHelperText>
            <Select
                name="playerName"
                value={form.playerName}
                onChange={event => handleChange(event)}
            >
                {playerNames.map((name: any, index: any) => {
                    return (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>)
                })}
            </Select>



            <TextField
                name="email"
                label="Required"
                value={form.email}
                margin="normal"
                onChange={event => handleChange(event)}
            />

            <TextField
                name="password"
                label="Required"
                margin="normal"
                value={form.password}
                type="password"
                onChange={event => handleChange(event)}
            />

            <Button onClick={e => {submit(form)}}>
                S'inscrire
            </Button>
        </FormControl>
    );
};

export default RegisterForm;
