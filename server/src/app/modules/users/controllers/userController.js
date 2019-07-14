import { UserQuery } from '../queries/userQuery';
import { UserService } from '../services/user';
import { UtilityService } from '../../../services/utility'

export class UserController {
    constructor() {
        this.utility = new UtilityService();
        this.userQuery = new UserQuery();
        this.userService = new UserService();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
    }

    login(request, response) {
        this.userQuery.getUserByEmail(this.utility.getValue(request, 'body.email'))
        .then(res => {
            if(!res) {
                response.status(401).json({message: 'Email is not registered'});
            } else if(this.utility.getValue(request, 'body.password') !== this.utility.getValue(res, 'password')) {
                response.status(401).json({message: 'wrong password'});
            } else {
                let authData = {
                    _id: `${this.utility.getValue(res, '_id')}`,
                    name: this.utility.getValue(res, 'name'),
                    email: this.utility.getValue(res, 'email'),
                    mobile: this.utility.getValue(res, 'mobile')
                }
                this.userService.generateToken(authData).then(token => {
                    authData.token = token;
                    response.status(200).json(authData);
                }).catch(err => {
                    response.status(401).json(err);
                });
            }
        }).catch(err => {
            response.status(422).json(err);
        });
    }

    logout(request, response) {
        response.json('logout');
    }

    register(request, response) {
        this.userQuery.getUserByEmail(this.utility.getValue(request, 'body.email'))
        .then(res => {
            if(res) {
                response.status(422).json({message: 'Email is all ready registered'});
            } else {
                this.userQuery.addUser(request.body).then(res => {
                    response.status(200).json(res);
                }).catch(err => {
                    response.status(422).json(err);
                });
            }
        }).catch(err => {
            response.status(422).json(err);
        });
    }
}