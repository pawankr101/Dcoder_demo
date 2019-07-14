import { Router } from "express";

export class Routes {
    constructor() {
        this.router = Router();
        this.registerRoutes();
    }

    registerRoutes() {
        const routes = [];
        routes.push(this.baseRoute());
        this.router.use(routes);
    }

    baseRoute() {
        const router = Router({
            strict: true,
        });
        router.all('/', (request, response) => {
            const res = 'Welcome to the Portal';
            response.status(200).send(res);
        });
        return router;
    }
}
