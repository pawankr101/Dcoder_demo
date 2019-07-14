import express from 'express';
import { EOL } from 'os';
import { Routes } from './routes';
import { server_config } from '../config/config.js';
import { CommonMiddleware } from './middlewares/common';
import { MongoDB } from './database/mongo';

export class App {
	constructor() {
		this.app = express();
		this.initializeApp();
	}

	useMiddleware() {
		const commonMiddleware = new CommonMiddleware();
		this.app.use(commonMiddleware.allCommonMiddlewares());
	}

	registerRoutes() {
		const routes = new Routes();
		const mongo = new MongoDB();
		mongo.getDBConnection().then(res => {
			console.log(res.message);
			this.app.use(routes.router);
		}).catch(err => {
			console.log(err.message);
		});
	}

	initializeApp() {
		this.useMiddleware();
		this.registerRoutes();
	}

	start(process_id) {
		return this.app.listen(server_config.hostingPort, () => {
			let server_msg = `Server is running...${EOL} Port: ${server_config.hostingPort},${EOL}`;
			server_msg += process_id ? ` Process id: ${process_id}${EOL}` : ``;
			console.log(server_msg);
		});
	}
}
