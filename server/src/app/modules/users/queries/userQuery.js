import { UserModel } from '../models/user';

export class UserQuery {
    constructor() {
        this.user = new UserModel();
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            if(!email) { reject({ message: 'email is mandatory' }) }
            this.user.find({email: email},{_v:0}).exec((err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res[0]);
                }
            });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.user.find({}, {password: 0, _v: 0}).exec((err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            });
        });
    }

    addUser(user) {
        return new Promise((resolve, reject) => {
            let newUser = new this.user(user);
            newUser.save((err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            });
        });
    }
}