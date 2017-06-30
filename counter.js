import Horseman from 'node-horseman';
import fetch from 'node-fetch';

const pinterestFollowers = async (user) => {
    const res = await fetch(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`);
    const json = await res.json();
    return Number(json.data.user.follower_count);
};

const facebookFollowers = async (user, token) => {
    const res = await fetch(`https://graph.facebook.com/${user}?access_token=${token}&fields=likes`);
    const json = await res.json();
    return Number(json.likes);
};

const twitterFollowers = async (user) => {
    const followers = await new Horseman().open(`http://twitter.com/${user}`)
        .text('.ProfileNav-item--followers .ProfileNav-value')
    .close();

    return Number(followers);
};

const instagramFollowers = async (user) => {
    const followers = await new Horseman().open(`https://www.instagram.com/${user}/`)
        .text('li:nth-child(2) span._bkw5z')
    .close();

    return Number(followers);
};

const etsySales = async (user) => {
    const sales = await new Horseman().open(`https://www.etsy.com/fr/shop/${user}`)
        .text('.trust-signal-row span:nth-child(3).mr-xs-2.pr-xs-2.br-xs-1')
    .close();

    return Number(sales.replace(' Sales', ''));
};

const alittleMarketSales = async (user) => {
    const sales = await new Horseman().open(`https://${user}.alittlemarket.com`)
        .text('aside p.muted:nth-child(4)')
    .close();

    return Number(sales.replace('Ventes :', ''));
};

export default (website, user) => {
    switch (website) {
        case 'facebook': {
            return facebookFollowers(user, process.env.TOKEN_FACEBOOK);
        }

        case 'twitter': {
            return twitterFollowers(user);
        }

        case 'pinterest': {
            return pinterestFollowers(user);
        }

        case 'instagram': {
            return instagramFollowers(user);
        }

        case 'etsy': {
            return etsySales(user);
        }

        case 'alittlemarket': {
            return alittleMarketSales(user);
        }

        default: {
            return null;
        }
    }
};
