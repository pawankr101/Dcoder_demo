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

	getDbConnection(callback) {
		const mongo = new MongoDB();
		mongo.getDBConnection().then(res => {
			console.log(res.message);
			if(callback) { callback(); }
		}).catch(err => {
			console.log(err.message);
		});
	}

	registerRoutes() {
		const routes = new Routes();
		this.getDbConnection(() => {
			this.app.use(routes.router);
		});
	}

	initializeApp() {
		this.useMiddleware();
		this.registerRoutes();
		this.getDbConnection();
	}

	start(process_id) {
		return this.app.listen(server_config.hostingPort, () => {
			let server_msg = `Server is running...${EOL} Port: ${server_config.hostingPort},${EOL}`;
			server_msg += process_id ? ` Process id: ${process_id}${EOL}` : ``;
			console.log(server_msg);
		});
	}
}
