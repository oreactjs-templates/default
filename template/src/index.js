/**
 * For Linux users:
 * To fix issue for server side HMR, Check out this solution: https://github.com/jaredpalmer/razzle/issues/957
 * Try $ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
 */
import http from 'http';
let app = require('./server.js').default;

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
});

let currentApp = app;

if (module.hot) {
    console.log('✅ Server-side HMR Enabled!');
    module.hot.accept('./server.js', () => {
        console.log('🔁 HMR Reloading `./server`...');
        try {

            httpServer.removeListener('request', currentApp);
            let app = require('./server.js').default;

            httpServer.on('request', app);
            currentApp = app;

        } catch (error) {
            console.error(error);
        }
    });
}
