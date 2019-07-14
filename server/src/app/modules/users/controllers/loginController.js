import { UserQuery } from '../queries/userQuery';

export class LoginController {
    constructor() {
        this.userQuery = new UserQuery();
    }
}