let FtpDeploy = require('ftp-deploy');
let ftpDeploy = new FtpDeploy();
let transferedData = {
    'totalFiles': {},
    'transferedFiles': {},
    'name': {}
};

let config = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname + "/../",
    remoteRoot: "/extras/ci-test",
    include: ['*'],
    exclude: [".*","node_modules/**/*"],
    deleteRemote: false
};

ftpDeploy.deploy(config)
    .then(res => console.log('finished: ' + res))
    .catch(err => console.log(err));

ftpDeploy.on('uploading', data => {
    transferedData.totalFiles = data.totalFilesCount;       // total file count being transferred
    transferedData.transferedFiles = data.transferredFileCount; // number of files transferred
    transferedData.name = data.filename;             // partial path with filename being uploaded
    console.log(transferedData);
});

ftpDeploy.on('uploaded', function(data) {
    console.log('transferedData :', transferedData);         // same data as uploading event
    console.log('data :', data);
});