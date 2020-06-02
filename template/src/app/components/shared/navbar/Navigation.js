import React from 'react';
import {ONavigation} from '@oreact/ui';
import clsx from 'clsx';
import {observer} from "mobx-react";
import {useStores} from '@oreact/core/store';

const Navigation = (props) => {
    const {themeStore} = useStores();
    const navigation = themeStore.navigation;

    return (
        <ONavigation className={clsx("navigation", props.className)} navigation={navigation} layout={props.layout} dense={props.dense}/>
    );
}

Navigation.defaultProps = {
    layout: "vertical"
};

export default observer(Navigation);
