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

validate(inputtxt);
