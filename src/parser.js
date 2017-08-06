import Horseman from 'node-horseman';
import fetch from 'node-fetch';

export const pinterest = async (user) => {
    const res = await fetch(`https://api.pinterest.com/v3/pidgets/users/${user}/pins/`);
    const json = await res.json();

    return { followers: Number(json.data.user.follower_count) };
};

export const facebook = async (user, token) => {
    const res = await fetch(`https://graph.facebook.com/${user}?access_token=${token}&fields=likes`);
    const json = await res.json();

    return { likes: Number(json.likes) };
};

export const twitter = async (user) => {
    const followers = await new Horseman().open(`http://twitter.com/${user}`)
        .text('.ProfileNav-item--followers .ProfileNav-value')
    .close();

    return { followers: Number(followers) };
};

export const instagram = async (user) => {
    const followers = await new Horseman().open(`https://www.instagram.com/${user}/`)
        .text('li:nth-child(2) span._bkw5z')
    .close();

    return { followers: Number(followers) };
};

export const etsy = async (user) => {
    const sales = await new Horseman().open(`https://www.etsy.com/fr/shop/${user}`)
        .text('.trust-signal-row span:nth-child(3).mr-xs-2.pr-xs-2.br-xs-1')
    .close();

    return { sales: Number(sales.replace(' Sales', '')) };
};

export const alittlemarket = async (user) => {
    const sales = await new Horseman().open(`https://${user}.alittlemarket.com`)
        .text('aside p.muted:nth-child(4)')
    .close();

    return { sales: Number(sales.replace('Ventes :', '')) };
};


export const githubUser = async (user, token) => {
    const opts = { headers: { Authorization: `token ${token}` } };

    const followers = async () => {
        const res = await fetch(`https://api.github.com/users/${user}`, opts);
        return (await res.json()).followers;
    };

    const stars = async () => {
        const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, opts);
        const json = await res.json();
        return json.reduce((lastStarCount, currentRepository) => (lastStarCount + currentRepository.stargazers_count), 0);
    };

    return { followers: await followers(), stars: await stars() };
};

export const githubRepository = async (user, repository, token) => {
    const opts = { headers: { Authorization: `token ${token}` } };

    const pullRequests = async () => {
        const res = await fetch(`https://api.github.com/repos/${user}/${repository}/pulls?state=all`, opts);
        return (await res.json()).length;
    };

    const openPullRequests = async () => {
        const res = await fetch(`https://api.github.com/repos/${user}/${repository}/pulls?state=open`, opts);
        return (await res.json()).length;
    };

    const closedPullRequests = async () => {
        const res = await fetch(`https://api.github.com/repos/${user}/${repository}/pulls?state=closed`, opts);
        return (await res.json()).length;
    };

    const openIssues = async () => {
        const res = await fetch(`https://api.github.com/repos/${user}/${repository}/issues?state=open`, opts);
        return (await res.json()).length;
    };

    const stars = async () => {
        const res = await fetch(`https://api.github.com/repos/${user}/${repository}`, opts);
        return (await res.json()).stargazers_count;
    };

    return {
        stars: await stars(),
        pullRequests: { all: await pullRequests(), open: await openPullRequests(), closed: await closedPullRequests() },
        issues: { open: await openIssues() },
    };
};
