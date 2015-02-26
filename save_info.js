
//requirements
var fs = require("fs-extra");
var credentials = require('./credentialsH');
var CrowdProcess = require('CrowdProcess')(credentials);
///////////////////////////////////////////////////////////////////////

var Client = require('crp-job-client');
var filename = "./jobs.info";
var file1 = fs.createWriteStream(filename, {flags: 'w', encoding: null, mode: 0666});
var jobs = Client(credentials);

jobs.list(function (err, jobList) {
    if (err)
        return console.log('Something went terribly wrong');

    //console.log(jobList);
    file1.write(JSON.stringify(jobList,null,' '));
});