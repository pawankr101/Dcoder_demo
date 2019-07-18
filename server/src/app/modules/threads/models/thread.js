import { Schema, model } from 'mongoose';

export class ThreadModel {
    constructor() {
        this.schema = null;
        this.generateSchema();
        try {
            return mod = model('thread');
        } catch(err) {
            return model('thread', this.schema);
        }
    }

    generateSchema() {
        this.schema = new Schema({
            title: String,
            description: String,
            tags: [String],
            creator: String,
            created_at: Date
        });
    }
}