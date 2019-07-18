import { Router } from "express";
import { ThreadController } from './controllers/threadController';

export class ThreadModule {
    constructor() {
        this.threadController = new ThreadController();
        this.moduleRoutes = Router({
            strict: true,
        });
        this.initializeModule();
        return this.moduleRoutes;
    }

    initializeModule() {
        this.useMiddleware();
        this.exposeRoutes();
    }

    useMiddleware() {
        const middleware = [];
        // add module specific middleware here
        // this.moduleRoutes.use(middleware);
    }

    exposeRoutes() {
        this.moduleRoutes.get('/threads', this.threadController.getAllThreads);
        this.moduleRoutes.post('/thread', this.threadController.addNewThread);
    }
}