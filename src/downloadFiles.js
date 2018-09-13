const path = require("path");
const fs = require('fs');

const getFileLink = require('./getFileLink');
const getFilePath = require('./getFilePath');
const saveFile = require('./saveFile');
const validateFileForDownload = require('./validateFileForDownload');

const downloadFiles = async (pageNum, filesPagesLinks) => {
    const maxTryCount = 3;
    let tryCount = 0;

    for (let i = 0; i < filesPagesLinks.length; i++) {
        let filePath = '';
        try {
            const fileLink = await getFileLink(filesPagesLinks[i]);
            filePath = getFilePath(pageNum, fileLink);

            if (!validateFileForDownload(path.basename(filePath))) {
                console.log('[!X] INFO Passing:', fileLink);
                continue;
            }

            console.log('[!] INFO Downloading:', fileLink);

            if (!fs.existsSync(filePath))
                await saveFile(filePath, fileLink);
            else
                console.log('[!!] INFO Already downloaded:', filePath);

            console.log('[!] INFO Finished:', fileLink);
            tryCount = 0;
        }
        catch (error) {
            console.log('[X] error in downloadFiles for file: ' + filePath + ', error:' + error);
            // Remove the corrupted version of the file if exists
            if (fs.existsSync(filePath))
                fs.unlinkSync(filePath);
            // retry downloading that file if it can be retried
            if (!(error || '').includes('noretry') && tryCount < maxTryCount) {
                i -= 1;
                tryCount++;
            }
        }
    }
};

module.exports = downloadFiles;
