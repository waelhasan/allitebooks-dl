const { downloadFilesFromPage } = require('./src');

const downloadRange = async () => {
    for (let pageNum = 89; pageNum <= 100; pageNum++)
        await downloadFilesFromPage(pageNum);
};

downloadRange();
