const getFilesPagesLinks = require('./getFilesPagesLinks');
const downloadFiles = require('./downloadFiles');

const downloadFilesFromPage = async (pageNum) => {
    const filesPagesLinks = await getFilesPagesLinks(pageNum);
    await downloadFiles(pageNum, filesPagesLinks);
};

module.exports = downloadFilesFromPage;
