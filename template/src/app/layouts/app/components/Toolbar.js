import React from 'react';
import {AppBar, Hidden, Toolbar} from '@material-ui/core';
import {makeStyles, ThemeProvider} from '@material-ui/styles';
import NavbarMobileToggleButton from 'components/shared/navbar/NavbarMobileToggleButton';
import AccountMenu from 'components/shared/AccountMenu';
import {observer} from 'mobx-react'
import {useStores} from '@oreact/core/store';

const useStyles = makeStyles(theme => ({
    separator: {
        width          : 1,
        height         : 64,
        backgroundColor: theme.palette.divider
    }
}));

export default observer((props) =>
{
    const {themeStore} = useStores();
    const {navbar} = props.config;
    const themes = themeStore.getMainThemeInfo();
    const toolbarTheme = themes.toolbarTheme;

    const classes = useStyles(props);

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar className="flex relative z-10" color="default">
                <Toolbar className="p-0">

                    {navbar.display && navbar.position === 'left' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton className="w-64 h-64 p-0"/>
                            <div className={classes.separator}/>
                        </Hidden>
                    )}
                    <div className="flex flex-1">
                        <Hidden mdDown>
                            <div></div>
                        </Hidden>
                    </div>

                    <div className="flex">
                        <AccountMenu className={'h-64'}/>
                    </div>

                    {navbar.display && navbar.position === 'right' && (
                        <Hidden lgUp>
                            <NavbarMobileToggleButton/>
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
});
