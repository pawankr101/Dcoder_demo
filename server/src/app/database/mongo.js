import { connect, connection } from 'mongoose';
import { server_config } from '../../config/config';
import { EOL } from 'os';

export class MongoDB {

    getDBConnection() {
        return new Promise((resolve, reject) => {
            if(!connection._readyState) {
                connect(server_config.localDB, {useNewUrlParser: true}).catch(err => {
                    connection.close().then(res => {
                        reject({message: `Got error while connecting Database.${EOL}Gracefully closed Database connection`});
                    }).catch(err => {
                        reject({message: `Got error while connecting Database.${EOL}Got error while closing Database connection`});
                    });
                });
            } 
            connection.on('error', (err) => {
                reject({message: 'Got DB connection error'});
            });
            connection.once('open', (res) => {
                resolve({message: 'Database connected Successfully'});
            });
        });
    }

}