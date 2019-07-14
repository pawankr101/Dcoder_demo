import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken'
export class UserService {
    token = {
        private: null,
        public: null
    };

    constructor() {
        this.getTokens()
    }

    getTokens() {
        this.token.private = readFileSync('src/assets/keys/private.key', 'utf8');
        this.token.public = readFileSync('src/assets/keys/private.key', 'utf8');
    }

    generateToken(credential) {
        return new Promise((resolve, reject) => {
            sign(credential, this.token.private, { algorithm: 'RS256'}, (err, token) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })
        });
    }

}
