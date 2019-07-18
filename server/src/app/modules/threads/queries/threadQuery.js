import { ThreadModel } from '../models/thread';
import { UtilityService } from '../../../services/utility';

export class ThreadQuery {
    constructor() {
        this.thread = new ThreadModel();
        this.utility = new UtilityService();
    }

    getThreads() {
        return new Promise((resolve, reject) => {
            this.thread.find({}, {_v: 0}).exec((err, res) => {
                if(err) {
                    reject(err)
                } else {
                    const data = [];
                    this.utility.forLoop(res, (val, key) => {
                        data.push(this.utility.getValue(val, '_doc'));
                    })
                    resolve(data);
                }
            });
        });
    }

    addThread(thread) {
        return new Promise((resolve, reject) => {
            thread.created_at = new Date();
            let newThread = new this.thread(thread);
            newThread.save((err, res) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            });
        });
    }
}