"use strict";

let _CURRENT_ROLE = "doctor";


function init() {    
    /* TODO fetch user id (or give as arg of redirect) => _USER_ID */
    
    addRoles(_USER_ID, _CURRENT_ROLE);
    
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
     
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
}


function appointmentsPage() {
    let $patients = document.getElementById("patients");
    let $pSearch = document.getElementById("patient-search");
    let $pDetails = document.getElementById("patient-search-details");
    $patients.style.visibility = "hidden";
    $pSearch.style.visibility = "hidden";
    $pDetails.style.visibility = "hidden";
    
    showAppointments();
    searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
}


function createNewAppointment() {
    addNewAppointment(_USER_ID, _CURRENT_ROLE);
}


function patientsPage() {
    let $patients = document.getElementById("patients");
    let $pSearch = document.getElementById("patient-search");
    let $pDetails = document.getElementById("patient-search-details");
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $patients.style.visibility = "visible";
    $pSearch.style.visibility = "visible";
    $pDetails.style.visibility = "hidden";
}


document.addEventListener("DOMContentLoaded", init);