"use strict";

let _USER_ID = 42;
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
    $patients.style.visibility = "hidden";
    
    showAppointments();
    searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
}


function createNewAppointment() {
    addNewAppointment(_USER_ID, _CURRENT_ROLE);
}


function patientsPage() {
    let $patients = document.getElementById("patients");
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $patients.style.visibility = "visible";
}


document.addEventListener("DOMContentLoaded", init);