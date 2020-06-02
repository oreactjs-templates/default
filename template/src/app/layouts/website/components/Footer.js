import React from 'react';
import {AppBar, Divider, Container, Grid, Typography} from '@material-ui/core';
import {ThemeProvider, makeStyles} from '@material-ui/styles';
import {Link} from '@oreact/core/router';
import {useStores} from '@oreact/core/store';
import {observer} from 'mobx-react';
import Favorite from "@material-ui/icons/Favorite";
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    appBarRoot: {
        width: '100%',
       /* boxShadow: 'none',
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        '@media (min-width: 1280px)' : {
            maxWidth: '100%',
            margin:'0 auto'
        }*/
    },
    root: {
        marginTop: theme.spacing(6),
    },
    footer: {
        padding: theme.spacing(3, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(8, 0),
        },
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        '& img': {
            width: 22,
            height: 22,
            marginRight: theme.spacing(1.5),
        },
    },
    list: {
        marginBottom: theme.spacing(4),
        '& h3': {
            fontWeight: theme.typography.fontWeightMedium,
        },
        '& ul': {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
        '& li': {
            padding: '6px 0',
            color: theme.palette.text.secondary,
        },
    },
    version: {
        marginTop: theme.spacing(3),
    },
}));

export default observer((props) => {
    const classes = useStyles(props);
    const {themeStore} = useStores();
    const themes = themeStore.getMainThemeInfo();

    return (
        <ThemeProvider theme={themes.footerTheme}>
            <AppBar className="relative z-10" color="default" classes={{
                root: classes.appBarRoot
            }}>

                <Divider />
                <Container maxWidth="md">
                    <footer className={classes.footer}>
                        <Grid container>
                            <Grid item xs={12} sm={3}>
                                <div className={classes.logo}>
                                    <img src="/assets/images/logos/oreact-white.png" alt="Oreact" />
                                    <Link variant="body1" color="inherit" to="/">
                                        <Typography className={'text-24'}>
                                            OREACT
                                        </Typography>
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.list}>
                                <Typography component="h2" gutterBottom>
                                    Community
                                </Typography>
                                <ul>
                                    <li>
                                        <Link
                                            color="inherit"
                                            variant="body2"
                                            to="#"
                                        >
                                            GitHub
                                        </Link>
                                    </li>
                                    <li>
                                        <Link color="inherit" variant="body2" to="#">
                                            Twitter
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            color="inherit"
                                            variant="body2"
                                            to="#"
                                        >
                                            StackOverflow
                                        </Link>
                                    </li>
                                    <li>
                                        <Link color="inherit" variant="body2" to="#">
                                            {'Team'}
                                        </Link>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.list}>
                                <Typography component="h2" gutterBottom>
                                    Resources
                                </Typography>
                                <ul>
                                    <li>
                                        <Link color="inherit" variant="body2" to="#">
                                            {'Support'}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link color="inherit" variant="body2" to="#">
                                            {'Blog'}
                                        </Link>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={6} sm={3} className={classes.list}>
                                <Typography component="h2" gutterBottom>
                                    Company
                                </Typography>
                                <ul>
                                    <li>
                                        <Link color="inherit" variant="body2" to="#">
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link color="inherit" variant="body2" to="#">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>
                        <Typography className={classes.version} color="textSecondary" variant="body2">
                            {'Released under the MIT License. Copyright © '}
                            {new Date().getFullYear()}
                            {' OREACT.'}
                        </Typography>
                    </footer>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
});
