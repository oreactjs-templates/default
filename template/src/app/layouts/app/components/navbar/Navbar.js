import React from 'react';
import {AppBar, Hidden, Icon} from '@material-ui/core';
import {OScrollbar} from '@oreact/ui';
import clsx from 'clsx';
import NavbarHeader from 'components/shared/navbar/NavbarHeader';
import Logo from 'components/shared/Logo';
import NavbarFoldedToggleButton from 'components/shared/navbar/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'components/shared/navbar/NavbarMobileToggleButton';
import Navigation from 'components/shared/navbar/Navigation';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    content: {
        overflowX: 'hidden',
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        background: 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 40px, 100% 10px',
        backgroundAttachment: 'local, scroll'
    }
});

export default (props) => {
    const classes = useStyles();
    return (
        <div className={clsx("flex flex-col overflow-hidden h-full", props.className)}>
            <AppBar
                color="primary"
                position="static"
                elevation={0}
                className="flex flex-row items-center flex-shrink h-64 min-h-64 pl-20 pr-12"
            >
                <div className="flex flex-1 pr-8">
                    <Logo type={'white'} text={true}/>
                </div>

                <Hidden mdDown>
                    <NavbarFoldedToggleButton className="w-40 h-40 p-0"/>
                </Hidden>

                <Hidden lgUp>
                    <NavbarMobileToggleButton className="w-40 h-40 p-0">
                        <Icon>arrow_back</Icon>
                    </NavbarMobileToggleButton>
                </Hidden>
            </AppBar>
            <OScrollbar className={clsx(classes.content)}>
                <NavbarHeader/>
                <Navigation layout="vertical"/>
            </OScrollbar>
        </div>
    );
};


