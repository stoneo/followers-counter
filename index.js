import 'babel-polyfill';
import mysql from 'mysql';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Horseman from 'node-horseman';

dotenv.config({ silent: true });

(async () => {
    const pinterestFollowers = async (user) => {
        const res = await fetch(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`);
        const json = await res.json();
        return json.data.user.follower_count;
    };

    const facebookFollowers = async (user, token) => {
        const res = await fetch(`https://graph.facebook.com/${user}?access_token=${token}&fields=likes`);
        const json = await res.json();
        return json.likes;
    };

    const twitterFollowers = async (user) => {
        const followers = await new Horseman().open(`http://twitter.com/${user}`)
			.text('.ProfileNav-item--followers .ProfileNav-value')
			.close();

        return followers;
    };

    const connection = mysql.createConnection(process.env.MYSQL_CONNECTION);
    connection.connect();

    connection.query('INSERT INTO followers SET ?', { count: await facebookFollowers(process.env.FACEBOOK_USER, process.env.TOKEN_FACEBOOK), social_network: 'facebook' });
    connection.query('INSERT INTO followers SET ?', { count: await pinterestFollowers(process.env.PINTEREST_USER), social_network: 'pinterest' });
    connection.query('INSERT INTO followers SET ?', { count: await twitterFollowers(process.env.TWITTER_USER), social_network: 'twitter' });

    connection.end();
})();
