let FtpDeploy = require('ftp-deploy');
let ftpDeploy = new FtpDeploy();

let config = {
    // username: process.env.FTPUSERNAME,
    // password: process.env.FTPPASS,
    // host: process.env.FTPHOST,
    // port: 21,
    // localRoot: __dirname + "/../dist/",
    // remoteRoot: "/",
    // include: ['*']
};

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});