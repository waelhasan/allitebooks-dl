const path = require("path");
const url = require("url");

const getFilePath = (pageNum, fileLink) => {
    const parsedFileLink = url.parse(fileLink);
    const fileName = path.basename(parsedFileLink.pathname);
    return `./files/${pageNum}/${fileName.replace(/%20/g, ' ')}`;
};

module.exports = getFilePath;
