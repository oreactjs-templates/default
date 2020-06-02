import React from 'react';
import runtimeConfig from 'runtimeConfig';
import {AppBar, Hidden, Toolbar, Tooltip, Button} from '@material-ui/core';
import {withStyles, makeStyles, ThemeProvider} from '@material-ui/styles';
import NavbarMobileToggleButton from 'components/shared/navbar/NavbarMobileToggleButton';
import AccountMenu from 'components/shared/AccountMenu';
import {observer} from 'mobx-react'
import {useStores} from '@oreact/core/store';
import {Link} from '@oreact/core/router';
import Logo from 'components/shared/Logo';
import {useLoggedIn} from '@oreact/core/auth';

const useStyles = makeStyles(theme => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    },
    item: {
        textDecoration: 'none!important',
    },
    appBarRoot: {
        width: '100%',
        boxShadow: 'none',
        '@media (min-width: 1280px)': {
            maxWidth: '100%',
            margin: '0 auto'
        }
    }
}));

export default observer((props) => {
    const {themeStore, authStore} = useStores();
    const config = themeStore.settings.current.layout.config;
    const themes = themeStore.getMainThemeInfo();
    const toolbarTheme = themes.toolbarTheme;
    const classes = useStyles(props);
    const isLoggedIn = useLoggedIn();

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar className="flex relative z-10" color="default" elevation={1} classes={{
                root: classes.appBarRoot
            }}>
                <Toolbar className="p-0">

                    {config.navbar.display && config.navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
                            <div className={classes.separator}/>
                        </Hidden>
                    )}

                    <span className={'mx-16'}>
                        <Logo/>
                    </span>

                    <div className="flex flex-1">
                        <Link to={'/home'} className={classes.item}>
                            <Tooltip title={'Home'} placement={"bottom"}>
                                <Button className={'mx-8 normal-case'}>
                                    Home
                                </Button>
                            </Tooltip>
                        </Link>
                    </div>

                    {isLoggedIn &&
                    <div className="flex items-center">
                        <Link to={'/dashboard'} role={'button'}>
                            <Button variant="outlined" className={'normal-case mr-8'}>Go to dashboard</Button>
                        </Link>
                        <AccountMenu className={'h-64'}/>
                    </div>
                    }

                    {!isLoggedIn &&
                    <div className={'flex mr-16'}>
                        <Link to={runtimeConfig.ROUTE_LOGIN} role={'button'}>
                            <Button variant="outlined" className={'normal-case mr-8'}>Log in</Button>
                        </Link>
                        <Link to={runtimeConfig.ROUTE_SIGNUP} role={'button'}>
                            <Button variant="outlined" className={'normal-case'}>Sign up</Button>
                        </Link>
                    </div>
                    }

                    {config.navbar.display && config.navbar.position === 'right' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton/>
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
});
