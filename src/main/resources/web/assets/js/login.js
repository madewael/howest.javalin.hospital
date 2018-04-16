"use strict";


/* This function makes a REST call to check whether the password is correct.
 * Returns the user id in case the password was correct, false otherwise.
 */
function checkPassword() {
    let $username = document.getElementById('username');
    let $password = document.getElementById('password'); 
    let promise = _login($username.value, $password.value);
    promise.then((userId) => {
        // TODO userId must be passed when redirecting html
    })
}


function login() {
    let userIdPromise = checkPassword(username, password);
    
    userIdPromise.then((userId) => {
        if (userId) {
            let rolesPromise = _getRoles(userId);
            rolesPromise.then((roles) => {
                let initialRole = roles[0];
                let nextHtml = initialRole + ".html";
        
                document.location.href = nextHtml;   /* TODO: REST call to switch to next page  -- pass current role and userId */
            })
        }
        else {
            /* TODO show popup for incorrect password */
        }
    })
}