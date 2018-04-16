"use strict";


function addRoles(userId, currentRole) {        
    let rolesPromise = _getRoles(userId);
    rolesPromise.then((roles) => {
        let $user_roles = document.getElementById('user_roles');
        roles.forEach((role) => {
            if (role !== currentRole) {
                let $li = document.createElement("li");                 
                let $a = document.createElement("a");
                let $txt = document.createTextNode(role); 
                $a.appendChild($txt);
                let nextHtml = role + ".html";
                $a.setAttribute("href", nextHtml);
                $li.appendChild($a);
                $user_roles.appendChild($li);
            }
        })
    })
}

