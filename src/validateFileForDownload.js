const validateFileForDownload = (fileName) => {
    return !
        (
            fileName.toLowerCase().includes('visually') &&
            (
                fileName.toLowerCase().includes('ipad') ||
                fileName.toLowerCase().includes('iphone') ||
                fileName.toLowerCase().includes('mac')
            )
        );
};

module.exports = validateFileForDownload;
