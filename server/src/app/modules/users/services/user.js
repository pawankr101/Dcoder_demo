import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken'
import { UtilityService } from '../../../services/utility';
export class UserService {
    token = {
        private: null,
        public: null
    };

    constructor() {
        this.utility = new UtilityService();
        this.getKeys()
    }

    getKeys() {
        this.token.private = readFileSync('src/assets/keys/private.key', 'utf8');
        this.token.public = readFileSync('src/assets/keys/public.key', 'utf8');
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

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            verify(token, this.token.public, { algorithm: 'RS256'}, (err, authData) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(authData);
                }
            })
        });
    }

}
