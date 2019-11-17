import React, {FC} from "react";
import {CircularProgress} from "@material-ui/core";

export const FullPageSpinner: FC = () =>{
    return (
        <div style={{marginTop: '3em', fontSize: '4em'}}>
            <CircularProgress />
        </div>
    )
}
