import React from 'react';
import {AppBar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root  : {

    }
}));

export default observer((props) => {
    const classes = useStyles();

    return (
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            classes={{root: classes.root}}
            className="relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
        >
            {/* Your navigation header */}
        </AppBar>
    );
});
