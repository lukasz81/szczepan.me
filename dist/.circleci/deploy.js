"use strict";

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    user: process.env.FTPUSERNAME,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 22,
    localRoot: __dirname + "/../dist/",
    remoteRoot: "/extras/ci-test",
    include: ['*'],
    deleteRemote: true
};

ftpDeploy.deploy(config, function (err) {
    if (err) console.log(err);else console.log('finished');
});
//# sourceMappingURL=deploy.js.map