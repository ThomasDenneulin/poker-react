import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import SyncIcon from '@material-ui/icons/Sync';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import parseFile from '../../../parsers/parser';
import Hand from "../../../parsers/models/hand";
import axios from "axios";
const remote = window.require('electron').remote;
const fs = window.require('fs');
const dialog = remote.dialog;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function TransitionsModal() {
    const classes = useStyles();
    const [loading,setLoading] = React.useState(false);

    //Quand on clique sur le bouton
    function handleSync() {
        setLoading(true);
        //Ouverture de lq boite de dialogue
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then((res) => {
            let hands: Array<Promise<Hand[]>> = new Array<Promise<Hand[]>>();

            //Parcourt du repertoire
            fs.readdir(res.filePaths[0], ((err: any, files: Array<string>) => {
                files.forEach((filePath: string) => {
                    try {
                        //Recuperation des promesses
                        let hand: Promise<Hand[]>=  parseFile('winamax', res.filePaths[0] + '/' +filePath);
                        hands.push(hand);
                    } catch (exception){
                        console.log(exception);
                    }
                });
                //Execution des promesses
                Promise.all(hands)
                    .then((res: any)=>{
                        postHands(res.flat(Infinity))
                            .then();
                    })
            }));
        });
    }

    const postHands = (hands: Array<Hand>) => {
        return axios
            .post('http://192.168.10.10/api/hands',{
                "hands": hands
            })
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(JSON.stringify(error)));
    };

    return (
        <div>
            <Fab color="inherit" onClick={handleSync}>
                <SyncIcon/>
                {loading && <CircularProgress size={68} />}
            </Fab>
        </div>
    );
}

