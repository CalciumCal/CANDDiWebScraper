const rp = require('request-promise');
const prompt = require('prompt'); 

//JSON object to configure data (email in this case)
var response = [ 
{
    name: 'email',
    validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    warning: 'Email is not valid'
}]

//Start the user input
prompt.start();

//Display prompt and display what user inputs into console after pressing Enter
prompt.get(response, function (err, result){
    if(err){
        console.log(err);
        return 1;
    } else {

        var email = result.email;
        var input = email;
        
        console.log('Response: ' + input);
    }
});

// module.exports = EmailInput;