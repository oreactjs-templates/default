import React, {useEffect} from 'react';
import {Grid, Card, CardContent, Typography, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import JwtLogin from './components/JwtLogin';
import SocialMediaLogin from './components/SocialMediaLogin';
import {PageHead} from '@oreact/core/client';
import runtimeConfig from 'runtimeConfig';

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

export default (props) => {
    const classes = useStyles(props);

    useEffect(() => {

    }, []);

    return (
        <Grid
            container
            alignItems="stretch"
            justify="center"
            style={{minHeight: '100vh'}}>
            <PageHead>
                <title>Login</title>
            </PageHead>
            <Grid container item xs={4} justify="center" alignItems="center">
                <Card className="w-full max-w-400 mx-auto" square classes={{
                    root: classes.cardRoot
                }} style={{marginTop: '-50px'}}>

                    <CardContent className="flex flex-col items-center justify-center p-32">

                        <Typography variant="h6" className="text-center w-full mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                        <SocialMediaLogin/>

                        {(runtimeConfig.GOOGLE_CLIENT_ID || runtimeConfig.FACEBOOK_APP_ID) &&
                            <div className="my-24 flex items-center justify-center">
                                <Divider className="w-32"/>
                                <span className="mx-8 font-bold">OR</span>
                                <Divider className="w-32"/>
                            </div>
                        }

                        <JwtLogin/>

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

};

