"use strict";

let _CURRENT_ROLE = "patient";

function init() {    
    /* TODO fetch user id (or give as arg of redirect) => _USER_ID */
    
    addRoles(_USER_ID, _CURRENT_ROLE);
    
    let $profile = document.getElementById("patient-profile");
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $profile.style.visibility = "visible";
    
    profilePage();
}


function profilePage() {
    let $profile = document.getElementById("patient-profile");
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $profile.style.visibility = "visible";
    
    viewPatient(_USER_ID);
}


function appointmentsPage() {
    let $profile = document.getElementById("patient-profile");
    $profile.style.visibility = "hidden";
    
    showAppointments();
    searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
}


function createNewAppointment() {
    addNewAppointment(_USER_ID, _CURRENT_ROLE);
}




document.addEventListener("DOMContentLoaded", init);