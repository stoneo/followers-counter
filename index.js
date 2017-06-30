import 'babel-polyfill';
import mysql from 'promise-mysql';
import dotenv from 'dotenv';
import counter from './counter';

dotenv.config({ silent: true });

(async () => {
    const connection = await mysql.createConnection(process.env.MYSQL_CONNECTION);

    // Alittlemarket
    const alittleMarketSales = await counter('alittlemarket', process.env.ALITTLEMARKET_USER);
    const lastAlittleMarketSales = await connection.query('SELECT * FROM stats WHERE website = ? ORDER BY date DESC LIMIT 1', ['alittlemarket']);
    if (!lastAlittleMarketSales.length || alittleMarketSales !== lastAlittleMarketSales[0].count) {
        await connection.query('INSERT INTO stats SET ?', { count: alittleMarketSales, website: 'alittlemarket' });
    }

    // Etsy
    const etsySales = await counter('etsy', process.env.ETSY_USER);
    const lastEtsySales = await connection.query('SELECT * FROM stats WHERE website = ? ORDER BY date DESC LIMIT 1', ['etsy']);
    if (!lastEtsySales.length || etsySales !== lastEtsySales[0].count) {
        await connection.query('INSERT INTO stats SET ?', { count: etsySales, website: 'etsy' });
    }

    // Facebook
    const facebookFollowers = await counter('facebook', process.env.FACEBOOK_USER);
    const lastFacebookFollowers = await connection.query('SELECT * FROM stats WHERE website = ? ORDER BY date DESC LIMIT 1', ['facebook']);
    if (!lastFacebookFollowers.length || facebookFollowers !== lastFacebookFollowers[0].count) {
        await connection.query('INSERT INTO stats SET ?', { count: facebookFollowers, website: 'facebook' });
    }

    // Pinterest
    const pinterestFollowers = await counter('pinterest', process.env.PINTEREST_USER);
    const lastPinterestFollowers = await connection.query('SELECT * FROM stats WHERE website = ? ORDER BY date DESC LIMIT 1', ['pinterest']);
    if (!lastPinterestFollowers.length || pinterestFollowers !== lastPinterestFollowers[0].count) {
        await connection.query('INSERT INTO stats SET ?', { count: pinterestFollowers, website: 'pinterest' });
    }

    // Twitter
    const twitterFollowers = await counter('twitter', process.env.TWITTER_USER);
    const lastTwitterFollowers = await connection.query('SELECT * FROM stats WHERE website = ? ORDER BY date DESC LIMIT 1', ['twitter']);
    if (!lastTwitterFollowers.length || twitterFollowers !== lastTwitterFollowers[0].count) {
        await connection.query('INSERT INTO stats SET ?', { count: twitterFollowers, website: 'twitter' });
    }

    // Instagram
    const instagramFollowers = await counter('instagram', process.env.INSTAGRAM_USER);
    const lastInstagramFollowers = await connection.query('SELECT * FROM stats WHERE website = ? ORDER BY date DESC LIMIT 1', ['instagram']);
    if (!lastInstagramFollowers.length || instagramFollowers !== lastInstagramFollowers[0].count) {
        await connection.query('INSERT INTO stats SET ?', { count: instagramFollowers, website: 'instagram' });
    }

    process.exit(0);
})();
