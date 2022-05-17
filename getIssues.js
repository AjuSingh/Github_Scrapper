const fs = require("fs");
const path = require("path");
const process = require("process");
const request = require("request");
const cheerio = require("cheerio");
const { jsPDF } = require("jspdf");

function getIssues(url,folderPath) {
  request(url, function (err, res, body) {
    if (err) {
      console.log("Error", err);
      return;
    } else {
        handleHtml(body,folderPath);
    }
  });
}

function handleHtml(html,folderPath) {
  let selectTool = cheerio.load(html);
  let pdfName = selectTool('strong[itemprop="name"]').text().trim();
  let folderName = path.basename(folderPath);
//   console.log(folderPath);
    // console.log("before" + process.cwd());
    process.chdir(folderPath);
// console.log("after" + process.cwd());
//   console.log(folderName);
//   console.log(pdfName);
  //to get the details of issue
  // a[class="Link--primary v-align-middle no-underline h4 js-navigation-open markdown-title"]
  let allIssues = "\n";
  let IssuesList = selectTool('a[class="Link--primary v-align-middle no-underline h4 js-navigation-open markdown-title"]');
  for(let i=1;i<=IssuesList.length; i++){
      allIssues+= i + ". " + selectTool(IssuesList[i-1]).text().toString() + "\n";
  }
  if(pdfName.includes(".")){
      pdfName = pdfName.split(".")[0];
      pdfName+=".pdf";
  }else{
    pdfName+=".pdf";
  }
  createPdf(pdfName,allIssues);
}

function createPdf(pdfname,text){
const doc = new jsPDF();
doc.text(text, 1, 1);
doc.save(pdfname);
}

module.exports = getIssues;
