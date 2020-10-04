const passwordStrength = (password) => {
    let error = "";
    // password between 7 to 15 characters which contain only characters,
    // numeric digits, underscore and first character must be a letter
    // let pattern = /^[A-Za-z]\w{7,15}$/;
    // error = "password between 7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter";

    // To check a password between 6 to 15 characters which contain
    //  at least one numeric digit, one uppercase and one lowercase 
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // password between 7 to 15 characters which contain
    // at least one numeric digit and a special character
    // pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    // error = "Password should be between 7 to 15 characters which contain at least one numeric digit and a special character";

    // password between 8 to 15 characters which contain at least one
    // lowercase letter, one uppercase letter, one numeric digit,
    // and one special character
    // pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    // error = "Password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";

    if(!pattern.test(password)) {
        error = "Password should be at least 6 characters which contain at least one numeric digit, one uppercase and one lowercase";
    }
    return error;
}

const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isNameValid = (name) => {
    // Pattern:
    // oyegbite || raisely || remote-ok || ni-hao || Mann
    const re = /^([a-zA-Z]{2,}|[a-zA-Z]{2,}-[a-zA-Z]{2,})$/;
    return re.test(name);
}

const empty = (value) => !value || value === "";

const isString = (value) => typeof(value) === "string";

const isParceable = (value) => value && isString(value);


export {
    empty,
    isParceable,
    isNameValid,
    isEmailValid,
    passwordStrength,
}