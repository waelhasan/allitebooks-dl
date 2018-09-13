const fs = require('fs');

class NoProgressHandler {
    constructor(resolveFun, rejectFun, filePath) {
        this.resolveFun = resolveFun;
        this.rejectFun = rejectFun;
        this.filePath = filePath;

        this.createTimer();
    }

    setTotalSize(totalSize) {
        this.totalSize = totalSize;
    }

    createTimer() {
        this.timer = setInterval(() => {
            if (fs.existsSync(this.filePath)) {
                fs.statSync(this.filePath).size >= this.totalSize ?
                    this.resolveFun() :
                    this.rejectFun('Error due to download halt. retry')
            }
        }, 1000 * 60 * 1);
    }

    handleNewProgress() {
        clearInterval(this.timer);
        this.createTimer();
    }

    cancelTimer() {
        clearInterval(this.timer);
    }
}

module.exports = NoProgressHandler;
