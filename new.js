var inputtxt = "+65 9822 6679";
// var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

function validate(phone) {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    console.log(regex);

    if (regex.test(phone)) {
        console.log("true");
    } else {
        console.log("false");
    }
}

var knwl = require("knwl.js");
	
var knwlInstance = new knwl('english');

knwlInstance.register('dates', require('./knwl.js/default_plugins/dates.js'));

knwlInstance.init("This is a string. This was written on the 2nd of June, of 2015. Hi@hi.com");

//var dates = knwlInstance.get('dates');

console.log(knwlInstance.get('emails'));