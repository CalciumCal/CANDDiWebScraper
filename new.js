const rp = require('request-promise');
const $ = require('cheerio');
// const knwl = require('knwl.js'); Maybe Remove
// var knwlInstance = new Knwl('english'); Maybe Remove
const readline = require('readline');

var i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
main();

// Main function
function main() {
    webpageRequest();
}

//Request information from a webpage using Url
async function webpageRequest() {
    var url = await inputAndFormatEmail();
    
    rp(url)
        .then(async function (html) {
            if (html.includes('cdn-cgi\/l\/email-protection#')) {
                return cfEmailParse(html);
            }
            return await scraper(url);
        })

        .then(function (emails) {
            console.log("Emails: " + emails);
        })

        .catch(function (err) {
            console.log('Web page does not exist');
        })
}

//Crawls the domain for email addresses
async function scraper(url) {
    var emailscraper = new Scraper(url);
    return new Promise(resolve => emailscraper.getLevels(2).then((emails) =>{
        resolve(emails);
    }))
    
    .catch((e) => {
        console.log("error");
    })
}

//Take user input, check valid email, format email into Url
function inputAndFormatEmail() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question('Enter Email ', result => {
        rl.close();
        if (i.test(String(result).toLowerCase()) !== true) {
            console.log('Invalid Email');
            return null;
        } else {
            result = 'https://www.' + result.split('@')[1]
            resolve(result);
        }
    }))
}

//Extracts the cloudflare encryption number from the html
function cfEmailParse(html) {
    var parsed = [];
    var matched = html.match(/cdn-cgi\/l\/email-protection#([^">]+">)/g);
    for (var i = 0; i < matched.length; i++) {
        parsed.push(matched[i].match(/#(.*?)">/)[1]);
    }
    return cfDecodeEmail(parsed);
}

//Decodes the cloudflare encryption into a normal email
function cfDecodeEmail(encodedString) {
    var emails = [];

    for (var i = 0; i < encodedString.length; i++) {
        var email = '', n, x;
        var r = parseInt(encodedString[i].substr(0, 2), 16);
        for (n = 2; encodedString[i].length - n; n += 2) {
            x = parseInt(encodedString[i].substr(n, 2), 16) ^ r;
            email += String.fromCharCode(x);
        }
        emails.push(email);
    }
    return emails;
}






