import { dirname } from 'path';
import { fileURLToPath } from 'url';
import FtpDeploy from 'ftp-deploy';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ftpDeploy = new FtpDeploy();
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
    localRoot: __dirname + "/",
    remoteRoot: "/customers/3/a/f/szczepan.me/httpd.www",
    include: ["*.html", "dist/*"],
    exclude: ["*.**/*","node_modules/**/.*","node_modules","node_modules/**","**/node_modules/**",".git/**/*","*.md","*.json","coverage/**/*",".circleci/**/*","deploy.js","js/*",".babelrc",".gitignore",".circleci","*.yml"],
    deleteRemote: false
};

console.log("Deploying from local root:", __dirname + "/");
console.log("Deploying to remote root:", config.remoteRoot);

ftpDeploy.deploy(config)
    .then(res => console.log('finished: ' + res))
    .catch(err => {
        console.log(err);
        throw err;
    });

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