import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {PageHead} from '@oreact/core/client';
import {Typography, Container, Button, Link} from '@material-ui/core';
import clsx from 'clsx';
import {usePermission, useLoggedIn} from '@oreact/core/auth';
import {useParams} from '@oreact/core/router';
import Why from './components/Why';
import Features from './components/Features';
import Tools from './components/Tools';

const useStyles = makeStyles(theme => ({
    root: {
        flex: '1 0 auto',
    },
    hero: {
        paddingTop: theme.spacing(8),
        color: theme.palette.primary.main,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
        },
    },
    logo: {
        flexShrink: 0,
        width: 120,
        height: 120,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(8),
            width: 175,
            height: 175,
        },
    },
    button: {
        marginTop: theme.spacing(4),
    },
}));

const GettingStartedLink = React.forwardRef((props, ref) => {
    return <Link href={'http://oreactjs.com/docs/getting-started/installation'} underline={'none'} role={"button"} {...props} />;
});

export default (props) => {
    const isLoggedIn = useLoggedIn();
    const {granted} = usePermission((ac) => ac.readAny('home'));
    const classes = useStyles(props);
    const params = useParams();

    useEffect(() => {

    }, []);

    return (
        <div className={clsx("flex flex-col overflow-hidden relative mb-32", classes.root)}>
            <PageHead>
                <title>OreactJs: A full stack javascript solution</title>
            </PageHead>

            <div className={classes.hero}>
                <Container maxWidth="md" className={classes.content}>
                    <img src="/assets/images/logos/oreact.png" alt="" className={classes.logo} />
                    <div className={'container'}>
                        <Typography
                            variant="h3"
                            component="h1"
                            color="inherit"
                            gutterBottom
                            className={classes.title}
                        >
                            {'OREACT'}
                        </Typography>
                        <Typography variant="h5" component="p" color="inherit">
                            {'A full-stack javascript solution for your next big idea.'}
                        </Typography>
                        <Button
                            component={GettingStartedLink}
                            className={classes.button}
                            variant="outlined"
                            color="primary">{'Get Started'}
                        </Button>
                    </div>

                </Container>
                <Container maxWidth="md" >
                    <Tools/>
                </Container>
            </div>
            <Why/>
            <Features/>
        </div>
    );


};
