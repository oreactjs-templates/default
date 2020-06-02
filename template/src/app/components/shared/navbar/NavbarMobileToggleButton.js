import React from 'react';
import {Icon, IconButton} from '@material-ui/core';
import {observer} from 'mobx-react'
import {useStores} from '@oreact/core/store';

const NavbarMobileToggleButton = (props) => {
    const {themeStore} = useStores();
    return (
        <IconButton className={props.className}
                    onClick={ev => themeStore.setNavbarState({mobileOpen: !themeStore.navbar.mobileOpen})}
                    color="inherit" disableRipple>
            {props.children}
        </IconButton>
    );
};

NavbarMobileToggleButton.defaultProps = {
    children: <Icon>menu</Icon>
};

export default observer(NavbarMobileToggleButton);
