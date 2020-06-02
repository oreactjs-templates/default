import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {PageHead} from '@oreact/core/client';
import {Typography, Container, Button} from '@material-ui/core';
import clsx from 'clsx';
import {usePermission, useLoggedIn} from '@oreact/core/auth';
import {useParams} from '@oreact/core/router';
import {Link} from 'react-router-dom';

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
    }
}));

const GettingStartedLink = React.forwardRef((props, ref) => {
    return <Link to={'/docs/getting-started/installation'} underline={'none'} role={"button"} ref={ref} {...props} />;
});

export default (props) => {
    const classes = useStyles(props);

    useEffect(() => {

    }, []);

    return (
        <div className={clsx("flex flex-col overflow-hidden relative mb-32", classes.root)}>
            <PageHead>
                <title>Dashboard</title>
            </PageHead>

            <div className={classes.hero}>
                <Container maxWidth="md" className={classes.content}>
                    <div className={'container'}>
                        <Typography
                            variant="h3"
                            component="h1"
                            color="inherit"
                            gutterBottom
                            className={classes.title}
                        >
                            {'Application Dashboard'}
                        </Typography>
                        <Typography variant="h5" component="p" color="inherit">
                            {'Start building your awesome SaaS application.'}
                        </Typography>
                    </div>
                </Container>
            </div>
        </div>
    );


};
