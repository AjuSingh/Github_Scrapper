const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const process = require('process');
const {getTopicProjects} = require('./getTopicProjects');


function getTopics(url){
    request(url,cb);
}

function cb(err, res,body) {
    if(err){
        console.log("error is",err);
        return;
    }else{
    handleHtml(body);
}
}

function handleHtml(html){
    let selectTool = cheerio.load(html);
    let allTopics = selectTool('a[class="no-underline flex-1 d-flex flex-column"]');
    let topicsInfo,topicLink,topicParagraph,topicName,fullLink;
    for(let i = 0; i < 5; i++){
         topicsInfo = selectTool(allTopics[i]);
         topicLink = topicsInfo.attr('href');
         topicParagraph = topicsInfo.find('p')[0];
         topicName = selectTool(topicParagraph).text()
         fullLink  = "https://github.com" + topicLink;
         let folderName = path.join(__dirname,topicName);
         if(!fs.existsSync(folderName)){
            fs.mkdirSync(folderName);
         }
        getTopicProjects(fullLink);
    }
}



module.exports = {getTopics};