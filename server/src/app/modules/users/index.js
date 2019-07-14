import { Router } from "express";

export class UserModule {
    constructor() {
        this.moduleRoutes = Router({
            strict: true,
        });
        this.initializeModule();
    }

    initializeModule() {
        this.moduleRoutes.post('/user/login', (req, res) => { res.send('login')});
        this.moduleRoutes.post('/user/register', (req, res) => { res.send('register')});
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