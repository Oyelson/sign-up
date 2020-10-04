import { NAME } from '../VALUES/strings';

import { 
    empty,
    isParceable,
    isNameValid,
    isEmailValid,
    passwordStrength,
} from "./utils";

import { postEmail } from './postData';


const validateFirstName = (firstName, errors) => {
    firstName = isParceable(firstName) ? firstName.trim() : "";
    if(empty(firstName)){
        errors[NAME.firstName] = "First name is required!";  
    } else if(!isNameValid(firstName)) {
        errors[NAME.firstName] = "First name is invalid!";  
    }
}

const validateLastName = (lastName, errors) => {
    lastName = isParceable(lastName)? lastName.trim() : "";
    if(empty(lastName)){
        errors[NAME.lastName] = "Last name is required!";
    } else if(!isNameValid(lastName)) {
        errors[NAME.lastName] = "Last name is invalid!";
    }
}

const validatePassword = (password, errors) => {
    password = isParceable(password)? password.trim() : "";
    if(empty(password)){
        errors[NAME.password] = "Password is required!";
    } else {
        errors[NAME.password] = passwordStrength(password);
    }
}

const validateConfirmPassword = (password, confirmPassword, errors) => {
    password = isParceable(password)? password.trim() : "";
    confirmPassword = isParceable(confirmPassword)? confirmPassword.trim() : "";
    if(!empty(password)) {  // When password is not empty
        if(empty(confirmPassword)){
            errors[NAME.confirmPassword] = "Please type your password again";  
        } else if (password !== confirmPassword) {
            errors[NAME.confirmPassword] = "Password does not match!";  
        }
    } else {  // When password is empty
        // Take care of password output error first
        if(!errors[NAME.password]){
            errors[NAME.password] = "Password is required!";
        }
        // then take care of what error to display in the confirm password
        if(empty(confirmPassword)) {
            errors[NAME.confirmPassword] = "Please enter your password above!";
        } else if(!empty(confirmPassword) && password !== confirmPassword){
            errors[NAME.confirmPassword] = "Password does not match!";  
        }
    }
}

const validateEmail = async (formikValues, errors) => {
    let email = formikValues[NAME.email];
    email = isParceable(email)? email.trim() : "";
    if(empty(email)){
        errors[NAME.email] = "Email is required!";  
    } else if (!isEmailValid(email)){
        errors[NAME.email] = "Invalid email address!";  
    } else {
        const validateEmailAsync = async () => {
            // Asynchronously validate the email address from the server.
            await postEmail(formikValues).then((serverResponse) => {
                const [feedback, errorField, error] = serverResponse;
                console.log("-------");
                console.log("In ValidateEmail:");
                console.log("Feedback: ", feedback, " -- ErrorField: ", errorField, " -- Error: ", error);
                console.log("-------");
                if(feedback === NAME.BAD && errorField === NAME.email) {
                    errors[NAME.email] = error;
                    console.log("Errors: ", errors);
                } else if (feedback === NAME.BAD && !errorField) {
                    // Add an info value in formiks. Can't check email existence. Please check your internet connection
                    formikValues.serverFeedback = feedback;
                }
            });

        }
        if(email && email.length > 0 ) { // 2nd condition is not needed though
            await validateEmailAsync();
        }
    }
}


const validate  = async (formikValues) => {
    const errors = {};

    await validateEmail(formikValues, errors);

    validateFirstName(formikValues[NAME.firstName], errors);

    validateLastName(formikValues[NAME.lastName], errors);

    validatePassword(formikValues[NAME.password], errors);

    validateConfirmPassword(formikValues[NAME.password], 
        formikValues[NAME.confirmPassword], errors);

    return errors;
}


export {
    validate,
}