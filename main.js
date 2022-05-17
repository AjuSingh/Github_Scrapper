const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const {getTopics} = require('./getTopics');


let url = "https://github.com/explore";
request(url,cb);
function cb(err, res,body) {
    if(err){
        console.log("Error",err);
        return;
    }else{
    handleHtml(body);
    }
}


function handleHtml(html){
    let selectTool = cheerio.load(html);
   //get the link of the topics   
    let relativeLink = selectTool('a[data-selected-links="topics_path /topics/ /topics"]').attr('href');
    let fullLink =  "https://github.com" + relativeLink;
    console.log(fullLink);
    getTopics(fullLink);
   //
}
