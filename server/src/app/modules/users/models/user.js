import { Schema, model } from 'mongoose';

export class UserModel {
    constructor() {
        this.schema = null;
        this.generateSchema();
        try {
            return model('user');
        } catch(err) {
            return model('user', this.schema);
        }
    }

    generateSchema() {
        this.schema = new Schema({
            name: String,
            email: String,
            password: String,
            mobile: String
        });
    }
}