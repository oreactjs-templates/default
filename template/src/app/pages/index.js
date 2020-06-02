import AuthConfigs from './auth/configs'
import homeConfig from './home/config';
import dashboardConfig from './dashboard/config';
import error404Config from './404/config';

export default [
    ...AuthConfigs,
    homeConfig,
    dashboardConfig,
    error404Config
];
