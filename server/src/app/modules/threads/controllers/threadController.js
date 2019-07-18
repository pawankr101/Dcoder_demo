import { ThreadQuery } from '../queries/threadQuery';
import { UserQuery } from '../../users/queries/userQuery';
import { UtilityService } from '../../../services/utility'

export class ThreadController {
    constructor() {
        this.utility = new UtilityService();
        this.threadQuery = new ThreadQuery();
        this.userQuery = new UserQuery();
        this.getAllThreads = this.getAllThreads.bind(this);
        this.addNewThread = this.addNewThread.bind(this);
    }

    getAllThreads(request, response) {
        Promise.all([
            this.threadQuery.getThreads(),
            this.userQuery.getUsers()
        ]).then(res => {
            const threads = [];
            this.utility.forLoop(res[0], (value, index) => {
                let foundUsr = res[1].find(usr => usr._id == value.creator);
                value.creator_details = foundUsr;
                threads.push(value)
            });
            response.status(200).json(threads);
        }).catch(err => {
            response.status(422).json(err);
        });
    }

    addNewThread(request, response) {
        this.threadQuery.addThread(request.body).then(res => {
            response.status(200).json(res);
        }).catch(err => {
            response.status(422).json(err);
        });
    }
}