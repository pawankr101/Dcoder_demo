import { Router, response } from "express";
import { UserModule } from './modules/users/index'

export class Routes {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerAllModuleRoutes(routes) {
        routes.push(new UserModule());
        // add other other module routes here as well as user module.
    }

    registerRoutes() {
        const routes = [];
        routes.push(this.baseRoute());
        this.registerAllModuleRoutes(routes);
        this.router.use(routes);
    }

    baseRoute() {
        const router = Router({
            strict: true
        });
        router.all('/', (request, response) => {
            const res = 'Welcome to the Portal';
            response.status(200).send(res);
        });
        return router;
    }
}
