"use strict";

let _USER_ID = 42;
let _CURRENT_ROLE = "doctor";


function init() {    
    /* TODO fetch user id (or give as arg of redirect) => _USER_ID */
    
    addRoles(_USER_ID, _CURRENT_ROLE);
    
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
}


function appointmentsPage() {
    showAppointments();
    searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
}


document.addEventListener("DOMContentLoaded", init);