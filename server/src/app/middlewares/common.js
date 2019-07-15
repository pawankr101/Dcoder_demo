import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import { public_apis } from '../../config/config'
import { UserService } from '../modules/users/services/user';
import { UtilityService } from '../services/utility';

export class CommonMiddleware {
    constructor() {
        this.userService = new UserService();
        this.utility = new UtilityService();
    }

    helmetTools() {
        return helmet();
    }

    jsonParser() {
        return json();
    }

    urlParser() {
        return urlencoded({ extended: true });
    }

    setHeaders() {
        return (request, response, next) => {
            response.header("Access-Control-Allow-Origin", "*");
            // response.header("Access-Control-Allow-Origin", `${config.clientHostName}:${config.clientHostingPort}`); //client address
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header, Accept, Authorization");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, XMODIFY");
            response.header("Access-Control-Allow-Credentials", true);
            next();
        };
    }

    verifyJwtToken() {
        return (request, response, next) => {
            if(public_apis.includes(request.path)) {
                next();
            } else {
                const auth = this.utility.getValue(request, 'headers.authorization', ''),
                    token = auth.split(' ')[1];
                if(token) {
                    this.userService.verifyToken(token).then(authData => {
                        request.authData = authData;
                        next();
                    }).catch(err => {
                        response.status(401).json(err);
                    });
                } else {
                    response.status(401).json({message: 'Unauthorized Access'});
                }
            }
        };
    }

    allCommonMiddlewares() {
        return [
            this.helmetTools(),
            this.jsonParser(),
            this.urlParser(),
            this.setHeaders(),
            this.verifyJwtToken()
        ];
    }
}