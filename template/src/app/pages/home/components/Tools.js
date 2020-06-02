import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Button, NoSsr} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(
    (theme) => ({
        root: {
            padding: theme.spacing(2),
            minHeight: 160,
            marginTop: theme.spacing(2),
        },
        container: {
            marginBottom: theme.spacing(0),
        },
        logos: {
            padding: theme.spacing(10, 4, 0),
        },
        grid: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
        img: {
            margin: theme.spacing(1.5, 3),
        },
    }),
    { name: 'Themes' },
);

const logos = [
    {
        caption: 'React',
        path: 'react.webp',
        width: '50px',
        height: '50px'
    },
    {
        caption: 'ExpressJS',
        path: 'express.png',
        width: 'auto',
        height: '50px'
    },
    {
        caption: 'Material-UI',
        path: 'material-ui.png',
        width: 'auto',
        height: '50px'
    },
    /*{
        caption: 'MongoDB',
        path: 'mongodb.png',
        width: 'auto',
        height: '50px'
    },*/
    {
        caption: 'Webpack',
        path: 'webpack.png',
        width: 'auto',
        height: '50px'
    },
    {
        caption: 'Apollo',
        path: 'apollo-graphql-1.svg',
        width: 'auto',
        height: '50px'
    },
    {
        caption: 'MongoDB',
        path: 'mongodb.png',
        width: 'auto',
        height: '40px'
    }
];

export default (props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.container} disableGutters>
                <Grid container justify="center" className={classes.grid}>
                    {logos.map((logo) => (
                        <img
                            key={logo.caption}
                            src={`/assets/images/brands/${logo.path}`}
                            alt={logo.caption}
                            className={clsx(classes.img)}
                            style={{width: logo.width, height: logo.height}}
                        />
                    ))}
                </Grid>

            </Container>
        </div>
    );
}
