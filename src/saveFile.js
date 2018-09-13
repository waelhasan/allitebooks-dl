const path = require("path");
const fs = require('fs');
const progress = require('request-progress');
const request = require('request');
const shell = require('shelljs');

const NoProgressHandler = require('./NoProgressHandler');
const logProgress = require('./logProgress');

const saveFile = (filePath, fileLink) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir))
        shell.mkdir('-p', dir);

    const file = fs.createWriteStream(filePath);

    return new Promise((resolve, reject) => {
        const noProgressHandler = new NoProgressHandler(resolve, reject, filePath);
        let totalSize = 1000;

        progress(request(fileLink, {}))
            .on('progress', function (state) {
                // The state is an object that looks like this:
                // {
                //     percent: 0.5,               // Overall percent (between 0 to 1)
                //     speed: 554732,              // The download speed in bytes/sec
                //     size: {
                //         total: 90044871,        // The total payload size in bytes
                //         transferred: 27610959   // The transferred payload size in bytes
                //     },
                //     time: {
                //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals)
                //         remaining: 81.403       // The remaining seconds to finish (3 decimals)
                //     }
                // }
                noProgressHandler.handleNewProgress();
                logProgress(state);
                totalSize = state.size.total;
                noProgressHandler.setTotalSize(totalSize);
            })
            .on('error', (error) => {
                noProgressHandler.cancelTimer();
                reject(error);
            })
            .on('end', () => {
                noProgressHandler.cancelTimer();
                if (fs.existsSync(filePath)) {
                    fs.statSync(filePath).size >= totalSize ? resolve() : reject('not the same size.')
                }
                else {
                    reject();
                }
            })
            .pipe(file);
    });
};

module.exports = saveFile;
