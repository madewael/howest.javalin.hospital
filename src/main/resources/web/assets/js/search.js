"use strict";

let _USER_ID = 42;  

function addRoles(currentRole) {
    /* TODO fetch user id (or give as arg of redirect) => _USER_ID */
    
    let rolesPromise = Promise.resolve(["doctor", "patient"]); /* TODO: REST call to retrieve the roles for the given userId */
    rolesPromise.then((roles) => {
        let $user_roles = document.getElementById('user_roles');
        roles.forEach((role) => {
            if (role !== currentRole) {
                let $li = document.createElement("li");                 
                let $a = document.createElement("a");
                let $txt = document.createTextNode(role); 
                $a.appendChild($txt);
                $a.setAttribute("href", "#");
                $li.appendChild($a);
                $user_roles.appendChild($li);
            }
        })
    })
}

