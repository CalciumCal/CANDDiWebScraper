var i = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const readline = require('readline');

function validateAndFormatEmail() {
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

async function webpageRequest() {
    let email = await validateAndFormatEmail();

    console.log(email);
}

webpageRequest();