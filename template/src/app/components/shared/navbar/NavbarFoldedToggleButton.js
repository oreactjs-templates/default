import React from 'react';
import {Icon, IconButton} from '@material-ui/core';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';

const NavbarFoldedToggleButton = (props) => {
    const {themeStore} = useStores();
    const currentSettings = themeStore.settings.current;

    return (
        <IconButton
            className={props.className}
            onClick={() => {
                currentSettings.layout.config.navbar = {...currentSettings.layout.config.navbar, folded: !currentSettings.layout.config.navbar.folded};
                themeStore.setThemeSettings(currentSettings);
            }}
            color="inherit"
        >
            {props.children}
        </IconButton>
    );
};

NavbarFoldedToggleButton.defaultProps = {
    children: <Icon>menu</Icon>
};

export default observer(NavbarFoldedToggleButton);
