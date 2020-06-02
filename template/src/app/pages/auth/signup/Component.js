import React, {useEffect} from 'react';
import {Grid, Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import JwtSignup from './components/JwtSignup';
import {PageHead} from '@oreact/core/client';
import {useLoggedIn} from "@oreact/core/auth";
import {useHistory} from "@oreact/core/router";
import runtimeConfig from 'runtimeConfig';
import {observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardRoot: {
        background: 'transparent',
        boxShadow: 'none'
    }
}));

export default observer((props) => {
    const classes = useStyles(props);
    const isLoggedInd = useLoggedIn();
    const history = useHistory();

    useEffect(() => {
        if(isLoggedInd) {
            history.push(runtimeConfig.ROUTE_HOME);
        }
    }, [isLoggedInd]);

    return (
        <Grid
            container
            alignItems="stretch"
            justify="center"
            style={{minHeight: '100vh'}}>
            <PageHead>
                <title>Signup</title>
            </PageHead>
            <Grid container item xs={4} justify="center" alignItems="center">
                <Card className="w-full max-w-400 mx-auto" square classes={{
                    root: classes.cardRoot
                }} style={{marginTop: '-50px'}}>

                    <CardContent className="flex flex-col items-center justify-center p-32">

                        <Typography variant="h6" className="text-center w-full mb-32">CREATE AN ACCOUNT</Typography>

                        <JwtSignup/>

                    </CardContent>
                </Card>

            </Grid>
            <Grid container item xs={8} justify="center" alignItems="center">
                <div className={'p-32'} style={{marginTop: '-50px'}}>
                    <img src={'/assets/website/img/Asset-5.png'}/>
                </div>
            </Grid>
        </Grid>
    );

});

