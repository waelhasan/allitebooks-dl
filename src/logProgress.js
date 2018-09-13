const logProgress = (state) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    process.stdout.write((state.percent * 100).toFixed(2) + '%, of ' + (state.size.total / 1024 / 1024).toFixed(2) + 'MB');
};

module.exports = logProgress;
