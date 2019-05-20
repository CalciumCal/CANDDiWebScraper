const phoneLib = require('libphonenumber-js')
const rp = require('request-promise');
const $ = require('cheerio');
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
        .then(function (html) {
            
        })

        .then(function (html) {
            console.log(html);
        })

    // .catch(function (err) {
    //     console.log('Web page does not exist');
    // })
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

function findPhoneNo(str) {
    var numbers = phoneLib.findNumbers(str)
    if(numbers < 1){
        return console.log("No valid phone numbers found");
    }

    var results = [];
    for (var i = 0; i < numbers.length; i++) {
        var parse = phoneLib.parsePhoneNumberFromString(numbers[i].phone, numbers[i].country);
        results.push(parse.number);
    }

    //Makes array elements unique
    results = Array.from(new Set(results));

    return results.map(function(elem){
        return {"Phone Number":elem}; 
    });
}