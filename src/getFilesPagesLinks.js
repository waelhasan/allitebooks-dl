const request = require('request');
const cheerio = require('cheerio');

const getFilesPagesLinks = (pageNum) => {
    const pageLink = `http://www.allitebooks.com/page/${pageNum}/`;

    return new Promise((resolve, reject) => {
        request({ method: 'GET', uri: pageLink }, function (error, response, body) {
            const $ = cheerio.load(response.body);
            const filesPagesLinks = Object.values($('.entry-title a'))
                .filter(val => val.type == 'tag')
                .map(obj => obj.attribs.href);
            console.log('[!] INFO filesPagesLinks:', filesPagesLinks);
            // filesPagesLinks = filesPagesLinks.filter(link => link != undefined);
            console.log('[!] INFO filesPagesLinks:', filesPagesLinks);
            resolve(filesPagesLinks);
        });
    });
};

module.exports = getFilesPagesLinks;
