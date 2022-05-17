const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const process = require('process');
const getIssues = require("./getIssues");


function getTopicProjects(url) {
    request(url, cb);
}

function cb(err, res, body) {
  if (err) {
    console.log("Error", err);
    return;
  } else {
    handleHtml(body);
  }
}
// https://github.com
// https://github.com/mrdoob/three.js/issues
function handleHtml(html) {
  let selectTool = cheerio.load(html);
  //.text-bold.wb-break-word to get the topic name we have a class of a
  let topicName = selectTool('.h1').text().trim();
  let projects = selectTool('a[class="text-bold wb-break-word"]');
//   console.log("Projects of " + topicName  + " are->");
  for(let i=0;i<8;i++){
      let projectName = selectTool(projects[i]).text().trim();
    //   console.log(projectName);
    //   console.log("Directory before change" + process.cwd());
    //   process.chdir(path.join(__dirname,topicName));
       let projectPath = path.join(__dirname,topicName);
    //   console.log("Directory after change" + process.cwd());
      let issueLinkArr = selectTool('a[data-ga-click="Explore, go to repository issues, location:explore feed"]');
      let issueLink ="https://github.com" +  selectTool(issueLinkArr[i]).attr('href');
      getIssues(issueLink,projectPath);
  }
//   console.log('\n');
//   console.log(topicName);
}

module.exports = { getTopicProjects };
