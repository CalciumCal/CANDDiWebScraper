const rp = require('request-promise');
const $ = require('cheerio');
const readline = require('readline');
const phoneLib = require('libphonenumber-js')
var Scraper = require("email-crawler");

var i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var reg = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/g;
main();

// Main function
async function main() {
    const url = await inputAndFormatEmail();
    emailRequest(url);
    phoneRequest(url);
    addressRequest(url);
}

function emailRequest(url) {
    rp(url)
        .then(async function (html) {
            if (html.includes('cdn-cgi\/l\/email-protection#')) {
                return cfEmailParse(html);
            }
            return await scraper(url);
        })
        .then(function(emails){
            console.log(emails);
        })
        .catch(function (err) {
            console.log('Web page does not exist');
        })
}

function phoneRequest(url){
    rp(url)
        .then(function(html){
            return findPhoneNo(html);
        })
        .then(function(phoneNo){
            console.log(phoneNo);
        })
        .catch(function (err) {
            console.log('Web page does not exist');
        })
}

function addressRequest(url) {
    rp(url)
        .then(function (html) {
            return address = getAddress(html);
        })
        .then(function (address) {
            rp(address)
                .then(function(html){
                    console.log("Address: " + $('div > h4', html)[0].children[0].data);
                })
                .catch(function (err){
                    console.log('Post code does not exist');
                })
        })
        .catch(function (err) {
            console.log('Web page does not exist');
        })
}

//Crawls the domain for email addresses
async function scraper(url) {
    var emailscraper = new Scraper(url);
    return new Promise(resolve => emailscraper.getLevels(2).then((emails) => {
        if(emails < 1) {
            return console.log("No emails found");
        }
        return resolve(emails.map(function (elem) {
            return { "Email": elem };
        }));
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
    return emails.map(function (elem) {
        return { "Email": elem };
    });
}

function findPhoneNo(str) {
    var numbers = phoneLib.findNumbers(str);
    if (numbers < 1) {
        return console.log("No valid phone numbers found");
    }

    var results = [];
    for (var i = 0; i < numbers.length; i++) {
        var parse = phoneLib.parsePhoneNumberFromString(numbers[i].phone, numbers[i].country);
        results.push(parse.number);
    }

    //Makes array elements unique
    results = Array.from(new Set(results));

    return results.map(function (elem) {
        return { "Phone": elem };
    });
}

function getAddress(html) {
    substr = html.match(reg);
    if(substr == null){
        return console.log("No postcodes found")
    }
    
    var postcode = substr.sort((a, b) =>
        substr.filter(v => v === a).length
        - substr.filter(v => v === b).length
    ).pop().replace(/ /g, '');

    return lookUpUrl = "https://checkmypostcode.uk/" + postcode;
}






