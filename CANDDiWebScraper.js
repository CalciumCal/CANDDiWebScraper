const rp = require('request-promise');
const $ = require('cheerio');
const knwl = require('knwl.js');
var knwlInstance = new Knwl('english');

const readline = require('readline');
var i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
main();

// Main function
function main() {
    webpageRequest();
}

//Take user input, check valid email, format email into Url
function inputAndFormatEmail() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise(resolve => rl.question('Enter Email ', result =>{
        rl.close();
        if(i.test(String(result).toLowerCase()) !== true){
            console.log('Invalid Email');
            return null; 
        } else {
            result = 'https://www.' + result.split('@')[1]
            resolve(result);
        }
    }))
}

//Request webpage from Url
async function webpageRequest() {
    //let url = await inputAndFormatEmail();

    url = 'https://www.canddi.com/';

    rp(url)
        .then(function(html){
            console.log(html);
        })

        .catch(function(err){
            console.log('Web page does not exist');
        })

    //console.log(email);
}






