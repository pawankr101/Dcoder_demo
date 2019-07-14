import { Schema, model } from 'mongoose';

export class UserModel {
    constructor() {
        this.schema = null;
        this.generateSchema();
        return model('user', this.schema);
    }

    generateSchema() {
        this.schema = new Schema({name: String,
            name: String,
            email: String,
            password: String,
            mobile: String,
            tokens: [{
                c_token: String,
                exp_date: Number
            }]
        });
    }
}