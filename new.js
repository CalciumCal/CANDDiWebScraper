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
    addressRequest(url);
}

//Request information from a webpage using Url
function addressRequest(url) {
    rp(url)
        .then(function (html) {
            var address = getAddress(html);
            return address;
        })
        .then(function (address) {
            console.log(address);
            rp(address)
                .then(function(html){
                    console.log($('div > h4', html)[0].children[0].data);
                })
                .catch(function (err){
                    console.log('Post code does not exist');
                })
        })
        .catch(function (err) {
            console.log('Web page does not exist');
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

function getAddress(html) {
    substr = html.match(reg);
    var postcode = substr.sort((a, b) =>
        substr.filter(v => v === a).length
        - substr.filter(v => v === b).length
    ).pop().replace(/ /g, '');

    return lookUpUrl = "https://checkmypostcode.uk/" + postcode;
}






