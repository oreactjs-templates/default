import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {useStores} from '@oreact/core/store';
import {observer} from 'mobx-react';

export default observer((props) => {
    const {themeStore} = useStores();
    const themes = themeStore.getMainThemeInfo();
    return (
        <ThemeProvider theme={themes.footerTheme}>
            <AppBar className="relative z-10" color="default">
                <Toolbar className="px-16 py-0 flex items-center">
                    <Typography>
                        Footer
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
})
