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
        this.moduleRoutes.post('/user/login', this.userController.login);
        this.moduleRoutes.post('/user/register', this.userController.register);
        this.useMiddleware();
        this.exposeRoutes();
    }

    useMiddleware() {

    }

    exposeRoutes() {
        this.moduleRoutes.get('/users', (req, res) => { res.send('get all users')});
        this.moduleRoutes.get('/user/:id', (req, res) => { res.send('get any user user detail')});
    }
}