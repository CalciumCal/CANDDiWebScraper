const rp = require('request-promise');
const $ = require('cheerio');
const knwl = require('knwl.js');
var knwlInstance = new knwl('english');

var Scraper = require("email-crawler");
var emailscraper = new Scraper("https://www.intelligent-ds.co.uk/");

// var str = '<li><span class="major">e:</span> <a href="/cdn-cgi/l/email-protection#8ee7e0e8e1cee7e0faebe2e2e7e9ebe0faa3eafda0ede1a0fbe5"><span class="__cf_email__" data-cfemail="5c35323a331c353228393030353b39322871382f723f33722937">[email&#160;protected]</span></a></li>';
// var mySubStr = str.substring(
//     str.indexOf('cdn-cgi/l/email-protection#', 
//     str.indexOf('">'))
// );

// var mySubStr = str.split('cdn-cgi/l/email-protection#').pop().split('">')[0];

// console.log(mySubStr);

//webpageRequest();
//scraper();
tester();

function tester(){
    url = 'https://www.intelligent-ds.co.uk/';

    rp(url)
        .then(function(html){
            if(html.includes('cdn-cgi\/l\/email-protection#')){
                cfEmailParse(html);
            }
        })
}

function webpageRequest() {
    //let url = await inputAndFormatEmail();

    url = 'https://www.intelligent-ds.co.uk/';
    url2 = 'https://www.canddi.com/';
    url3 = 'https://www.elitedynamics.co.uk/';

    rp(url)
        .then(function(html){
            if(html.includes('cdn-cgi\/l\/email-protection#')){
                cfEmailParse(html);
            }
        })

        .catch(function(err){
            console.log('Web page does not exist');
        })

    //console.log(email);
}

function extractEmails (text){
	return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function scraper(){
    emailscraper.getLevels(1).then((emails) => {
        console.log(emails); // Here are the emails crawled from traveling two levels down this domain
      })
      .catch((e) => {
        console.log("error");
      })
}

function cfDecodeEmail(encodedString) {
    var hash = encodedString.split('cdn-cgi/l/email-protection#').pop().split('">')[0];
    var email = "", r = parseInt(hash.substr(0, 2), 16), n, i;
    for (n = 2; hash.length - n; n += 2){
    	i = parseInt(hash.substr(n, 2), 16) ^ r;
		email += String.fromCharCode(i);
    }
    return email;
}

function cfEmailParse(html){
    var parsed = [];
    var matched = html.match(/cdn-cgi\/l\/email-protection#([^">]+">)/g);
    for(var i = 0; i < matched.length; i++){
        parsed.push(matched[i].split('cdn-cgi/l/email-protection#').pop().split('">'));
        console.log(parsed);
    }
    return parsed;
}

// knwlInstance.init('<a href="mailto:info@intelligent-ds.co.uk">info@intelligent-ds.co.uk</a>');

// console.log(knwlInstance.get('emails'));

