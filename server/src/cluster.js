import cluster from 'cluster';
import { cpus, EOL } from 'os';
import { App } from './app/app';
import { server_config } from './config/config.js';

export class Clusters {
    constructor() {
        this.process_id = process.pid;
    }

    handleMasterProcess() {
        for (let index = 0, len = cpus().length; index < len; index++) {
            cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died.${EOL} Code: ${code},${EOL} Signal: ${signal}${EOL}`);
            cluster.fork();
        });
    }

    handleWorkerProcess() {
        const app = new App();
        const server = app.start(this.process_id);
        server.on('error', error => {
            let err_msg = (error.code == 'EADDRINUSE')
                ? `Port No.: ${server_config.hostingPort} is already occupied.`
                : error.message;
            err_msg += `${EOL}Server stopped.${EOL}`;
            console.log(err_msg);
            server.close();
            process.kill(this.process_id, 'SIGHUP');
        });
    }

    startClustering () {
        if(cluster.isMaster) {
            this.handleMasterProcess();
        } else if (cluster.isWorker) {
            this.handleWorkerProcess();
        } else {
            console.log('Some different process is running');
        }
    }
}