import { UserModel } from '../models/user';

export class UserQuery {
    constructor() {
        this.user = new UserModel();
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            if(!email) { reject({ message: 'email is mandatory' }) }
            this.user.find({email: email}).exec((err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res[0]);
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