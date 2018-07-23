let FtpDeploy = require('ftp-deploy');
let ftpDeploy = new FtpDeploy();
let transferedData = {
    'totalFiles': {},
    'transferedFiles': {},
    'name': {}
};

let config = {
    user: process.env.FTPUSERNAME,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 22,
    localRoot: __dirname + "/../dist/",
    remoteRoot: "/extras/ci-test",
    include: ['*'],
    deleteRemote: true
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
    console.log('transferedData :',transferedData);         // same data as uploading event
    console.log('data :',data);
});