import { UserQuery } from '../queries/userQuery';
import { UserService } from '../services/user';

export class UserController {
    constructor() {
        this.userQuery = new UserQuery();
        this.userService = new UserService();
        this.login = this.login.bind(this);
    }

    login(request, response) {
        this.userService.generateToken(request.body).then(token => {
            
        }).catch(err => {
            response.json(err);
        });
    }

    logout(request, response) {

    }

    register(request, response) {
        
    }
}