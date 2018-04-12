"use strict";


/* This function makes a REST call to check whether the password is correct.
 * Returns the user id in case the password was correct, false otherwise.
 */
function checkPassword() {
    let $username = document.getElementById('username');
    let $password = document.getElementById('password'); 
    return Promise.resolve(42);  /* TODO make REST call and set userId to correct value */
}


function login() {
    let userIdPromise = checkPassword(username, password);
    
    userIdPromise.then((userId) => {
        if (userId) {
            let rolesPromise = Promise.resolve(["patient"]); /* TODO: REST call to retrieve the roles for the given userId */
            rolesPromise.then((roles) => {
                let initialRole = roles[0];
                let nextHtml = initialRole + ".html";
        
                document.location.href = nextHtml;   /* TODO: REST call to switch to next page */
            })
        }
        else {
            /* TODO show popup for incorrect password */
        }
    })
}