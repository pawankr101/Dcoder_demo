import { UserModel } from '../models/user';

export class UserQuery {
    constructor() {
        this.user = new UserModel();
    }
}