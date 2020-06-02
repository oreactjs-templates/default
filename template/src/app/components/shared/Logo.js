import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {Link} from '@oreact/core/router';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .logo-icon': {
            width: 30,
            height: 30,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            }),
            margin: '0 auto',
            '& img': {
                width: '100%',
                height: '100%'
            }
        },
        '& .logo-text': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            })
        }
    }
}));

export default (props) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, "flex items-center", props.className)}>
            <Link to={`/home`} underline={'none'} role={"button"} className="logo-icon">
                {!props.type &&
                    <img src="/assets/images/logos/oreact.png" alt="logo"/>
                }

                {props.type === 'white' &&
                    <img src="/assets/images/logos/oreact-white.png" alt="logo"/>
                }
            </Link>
            {props.text &&
                <Typography className="text-16 ml-12 logo-text">Oreact</Typography>
            }
        </div>
    );
}
