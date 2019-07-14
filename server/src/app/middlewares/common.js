import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';

export class CommonMiddleware {

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
            // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header, Accept, Authorization");
            // response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, XMODIFY");
            // response.header("Access-Control-Allow-Credentials", true);
            next();
        };
    }

    allCommonMiddlewares() {
        return [
            this.helmetTools(),
            this.jsonParser(),
            this.urlParser(),
            this.setHeaders()
        ];
    }
}