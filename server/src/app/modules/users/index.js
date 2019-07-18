import { Router } from "express";
import { UserController } from './controllers/userController';

export class UserModule {
    constructor() {
        this.userController = new UserController();
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
        this.moduleRoutes.post('/user/login', this.userController.login);
        this.moduleRoutes.post('/user/register', this.userController.register);
        this.moduleRoutes.delete('/user/logout', this.userController.logout);
        this.moduleRoutes.get('/users', (req, res) => { res.send('get all users')});
        this.moduleRoutes.get('/user/:id', (req, res) => { res.send('get any user user detail')});
    }
}