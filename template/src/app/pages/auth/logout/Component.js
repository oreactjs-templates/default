import React, {useEffect} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import {observer} from "mobx-react";
import jwtService from 'app/services/jwtService';
import runtimeConfig from 'runtimeConfig';

export default observer((props) => {
    const {pathname} = useLocation();

    useEffect(() => {
        jwtService.logout();
    }, [pathname]);

    return <Redirect from={pathname} to={runtimeConfig.ROUTE_LOGIN}/>
});
