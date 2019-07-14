import cp from 'child_process';

export class ChildProcessService {

    constructor() {
        cp.fork();
    }
}