import 'babel-polyfill';
import mysql from 'mysql';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

(async () => {
    const pinterestFollowers = async (username) => {
        const res = await fetch(`https://api.pinterest.com/v3/pidgets/users/${username}/pins/`);
        const json = await res.json();
        return json.data.user.follower_count;
    };

    const facebookFollowers = async (username, token) => {
        const res = await fetch(`https://graph.facebook.com/${username}?access_token=${token}&fields=likes`);
        const json = await res.json();
        return json.likes;
    };

    const connection = mysql.createConnection(process.env.MYSQL_CONNECTION);
    connection.connect();

    connection.query('INSERT INTO followers SET ?', { count: await facebookFollowers(process.env.FACEBOOK_USER, process.env.TOKEN_FACEBOOK), social_network: 'facebook' });
    connection.query('INSERT INTO followers SET ?', { count: await pinterestFollowers(process.env.PINTEREST_USER), social_network: 'pinterest' });

    connection.end();
})();
