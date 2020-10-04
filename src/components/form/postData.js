import { NAME, SERVER_CONSTANTS } from '../VALUES/strings'; 

const asyncPost = async (url, data={}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects)
}

const postData = async (apiUrl, data) => {
    // console.log(data);
    let [feedback, errorField, error] = [NAME.OK, null, ""];
    let resStatus = 0;
    let url = `https://cors-anywhere.herokuapp.com/${apiUrl}`;

    const serverResponse = asyncPost(url, data);

    await serverResponse.then(response => {
            if (!response.ok) {
                throw response;
            }
            // console.log("Response: ", response);
            resStatus = response.status;
            return response.json();
        })
        .then(resJSON => {
            let status = resJSON.data.status.toLowerCase();
            // console.log("Data Received: ", resJSON);
            // console.log("Feedback: ", status);
            switch (resStatus) {
                case 200:
                    if(status && status === NAME.EXISTS.toLowerCase()) {
                        errorField = NAME.email;
                        feedback = NAME.BAD;
                        error = "Email exists! Please choose a new email address.";
                        // console.log(`${status} === ${NAME.EXISTS.toLowerCase()}`);
                        // console.log("In ServerInner:");
                        // console.log("Feedback: ", feedback, " -- ErrorField: ", errorField, " -- Error: ", error);
                        // console.log("-----");
                        break;
                    } else if(status && status === NAME.OK.toLowerCase()) {
                        feedback = NAME.OK;
                    }
                    break;
                case 400:
                    feedback = NAME.BAD;
                    break;
                case 500:
                    feedback = NAME.BAD;
                    break;
                default:
                    feedback = NAME.BAD;
                    break;
                }
        })
        .catch(error => {
            feedback = NAME.BAD;
        });
    // console.log("At PostData Return:");
    // console.log("Feedback: ", feedback, " -- ErrorField: ", errorField, " -- Error: ", error);
    // console.log("-----");
    return [feedback, errorField, error];
}

const postAllFields = async (formikValues) => {
    const data = {
        campaignUuid: SERVER_CONSTANTS.campaignUuid,
        data: {
            firstName: formikValues[NAME.firstName],
            lastName: formikValues[NAME.lastName],
            email: formikValues[NAME.email],
            password: formikValues[NAME.password],
        }
    }
    return await postData(SERVER_CONSTANTS.signUpUrl, data);
}

const postEmail = async (formikValues) => {
    const data = {
        campaignUuid: SERVER_CONSTANTS.campaignUuid,
        data: {
            email: formikValues[NAME.email],
        }
    }
    return await postData(SERVER_CONSTANTS.checkUserUrl, data);
}


export {
    postEmail,
    postAllFields,
}


