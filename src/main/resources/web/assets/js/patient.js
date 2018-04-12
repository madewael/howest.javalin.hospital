"use strict";

let _USER_ID = 42;  
let _CURRENT_ROLE = "patient";

function init() {    
    /* TODO fetch user id (or give as arg of redirect) => _USER_ID */
    
    addRoles(_USER_ID, _CURRENT_ROLE);
    showProfile();
}

function showProfile() {
    let $profile = document.getElementById("profile");
    let $appointments = document.getElementById("appointments");
    
    $appointments.style.visibility = "hidden";
    $profile.style.visibility = "visible";
}


function showAppointments() {
    searchAppointmentsOfUser(_USER_ID);
    let $profile = document.getElementById("profile");
    let $appointments = document.getElementById("appointments");
    
    $profile.style.visibility = "hidden";
    $appointments.style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", init);