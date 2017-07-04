import 'babel-polyfill';
import dotenv from 'dotenv';
import mysql from 'promise-mysql';
import { githubUser } from './parser';
import { insertNewStat } from './crud';

dotenv.config({ silent: true });

(async () => {
    const connection = await mysql.createConnection(process.env.MYSQL_CONNECTION);

    const user = await githubUser(process.env.GITHUB_USER, process.env.GITHUB_TOKEN);
    await insertNewStat(connection, 'github', `${process.env.GITHUB_USER}_stars`, user.stars);
    await insertNewStat(connection, 'github', `${process.env.GITHUB_USER}_followers`, user.followers);

    await connection.end();
})();
