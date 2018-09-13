const request = require('request');
const cheerio = require('cheerio');

const validateFileLink = require('./validateFileLink');

const getFileLink = (filePageLink) => {
    return new Promise((resolve, reject) => {
        request({ method: 'GET', uri: filePageLink }, function (error, response, body) {
            if (error) return reject(error);

            try {
                const $ = cheerio.load(response.body);
                const fileLink = $('.download-links a').attr('href');
                if (!fileLink) return reject('no file link at all. noretry');
                validateFileLink(fileLink) ? resolve(fileLink) : reject('not valid link.');
            }
            catch (err) {
                reject(err);
            }
        });
    });
};

module.exports = getFileLink;
