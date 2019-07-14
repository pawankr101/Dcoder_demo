import { Schema, model } from 'mongoose';

export class UserModel {
    constructor() {
        this.schema = null;
        this.generateSchema();
        return model('user', this.schema);
        // return new Model();
    }

    generateSchema() {
        this.schema = new Schema({name: String,
            name: String,
            email: String,
            password: String,
            mobile: String
        });
    }
}