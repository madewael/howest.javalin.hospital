"use strict";

let _USER_ID = 42;
let _CURRENT_ROLE = "admin";


function init() {    
    /* TODO fetch user id (or give as arg of redirect) => _USER_ID */
    
    addRoles(_USER_ID, _CURRENT_ROLE);
    
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    let $patients = document.getElementById("patients");
    let $doctors = document.getElementById("doctors");
     
    $appointments.style.visibility = "visible";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $patients.style.visibility = "hidden";
    $doctors.style.visibility = "hidden";
    
    showAppointments();
    searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
}


function appointmentsPage() {
    showAppointments();
    searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
}

function createNewAppointment() {
    addNewAppointment(_USER_ID, _CURRENT_ROLE);
}


function patientsPage() {
    let $patients = document.getElementById("patients");
    let $doctors = document.getElementById("doctors");
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $doctors.style.visibility = "hidden";
    $patients.style.visibility = "visible";
}


function doctorsPage() {
    let $patients = document.getElementById("patients");
    let $doctors = document.getElementById("doctors");
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = 'hidden';
    $patients.style.visibility = "hidden";
    $doctors.style.visibility = "visible";
}


document.addEventListener("DOMContentLoaded", init);