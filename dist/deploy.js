'use strict';

var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
var transferedData = {
    'totalFiles': {},
    'transferedFiles': {},
    'name': {}
};

var config = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname + "./",
    remoteRoot: "/extras/ci-test",
    exclude: [".*", "node_modules/**/*", ".git/**/*"],
    include: ['*'],
    deleteRemote: false
};

ftpDeploy.deploy(config).then(function (res) {
    return console.log('finished: ' + res);
}).catch(function (err) {
    return console.log(err);
});

ftpDeploy.on('uploading', function (data) {
    transferedData.totalFiles = data.totalFilesCount; // total file count being transferred
    transferedData.transferedFiles = data.transferredFileCount; // number of files transferred
    transferedData.name = data.filename; // partial path with filename being uploaded
    console.log(transferedData);
});

ftpDeploy.on('uploaded', function (data) {
    console.log('transferedData :', transferedData); // same data as uploading event
    console.log('data :', data);
});
//# sourceMappingURL=deploy.js.map