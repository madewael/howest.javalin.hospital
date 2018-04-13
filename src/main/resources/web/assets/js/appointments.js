"use strict";

let _APPOINTMENT_ID = 4;

let _APPOINTMENTS = [
    { 
        id: "appointment1",
        patient: "Alice",
        doctor: "Zoro",
        date: "7 May 2018"
    },
    { 
        id: "appointment2",
        patient: "Bob",
        doctor: "Yves",
        date: "19 June 2018"
    },
    { 
        id: "appointment3",
        patient: "Alice",
        doctor: "Zoro",
        date: "16 August 2018"
    }
]

let _APPOINTMENTS_FULL = {
    "appointment1" : {
        id: "appointment1",
        patient: "Alice",
        doctor: "Zoro",
        date: "7 May 2018",
        description: "Back pain: scans"
    },
    "appointment2" : {
        id: "appointment2",
        patient: "Bob",
        doctor: "Yves",
        date: "19 June 2018",
        description: "Cardiac problems"
    },
    "appointment3" : {
        id: "appointment3",
        patient: "Alice",
        doctor: "Zoro",
        date: "16 August 2018",
        description: "Follow up back pain scans"
    }
}


function showNewAppointmentPage() {
    let $appointments = document.getElementById("appointments");
    let $newAppointment = document.getElementById("new-appointment");
    $appointments.style.visibility = "hidden";
    $newAppointment.style.visibility = "visible";
    
    
    $('#datetimepicker12').datetimepicker({
         inline: true,
         sideBySide: true
     });
}

function addNewAppointment() {
    let id = "appointment" + "APPOINTMENT_ID";
}

function editAppointment(id) {
    console.log("EDIT APPOINTMENT"); //TODO
}


function viewAppointment(id, userId, role) {
    let appointmentPromise = Promise.resolve(_APPOINTMENTS_FULL[id]);
    
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    $appointments.style.visibility = "hidden";
    $appointmentDetails.style.visibility = "visible";
    let $appointmentInfo = document.getElementById("appointment-info");
    
    appointmentPromise.then((appointment) => {    
        console.log("APP INFO");
        let $p1 = _makeTextElement("p", 'ID : ' + appointment.id); 
        let $p2 = _makeTextElement("p", 'Date : ' + appointment.date);
        let $p3 = _makeTextElement("p", 'Patient : ' + appointment.patient); 
        let $p4 = _makeTextElement("p", 'Doctor : ' + appointment.doctor); 
        let $p5 = _makeTextElement("p", 'Description : ' + appointment.description);
        let onClick = function() { showAppointments(); searchAppointmentsOfUser(userId, role) };
        let $backButton = _makeClickableButton("Back to appointments", onClick);
        console.log("APP INFO 2");
        _setChildren($appointmentInfo, [$p1, $p2, $p3, $p4, $p5, $backButton]);
        console.log("APP INFO 3");
    });
}


/* userId is null in case of "admin" => show all appointments */
function searchAppointmentsOfUser(userId, role) {
    let appointmentsPromise = Promise.resolve(_APPOINTMENTS);
    
    appointmentsPromise.then((appointments) => {
        let $appointments = document.getElementById("appointment-list");
        _clearElement($appointments);
        
        appointments.forEach((appointment) => {
            let $tr = document.createElement("tr");     
            let $th = document.createElement("th"); 
            
            let glyphClass = (role === "admin") ?  "glyphicon glyphicon-pencil" : "glyphicon glyphicon-eye-open";
            let glyphOnClick = (role === "admin") ? function() { editAppointment(appointment.id) } : function() { viewAppointment(appointment.id, userId, role) };
            let $button = _makeClickableIconButton(glyphClass, glyphOnClick)  
            $th.appendChild($button);
            
            let $td2 = document.createElement("td"); 
            if (role === "doctor") {
                /* doctor can view AND edit appointment */
                let onClickEdit = function() { editAppointment(appointment.id) };
                let $button2 = _makeClickableIconButton("glyphicon glyphicon-pencil", onClickEdit)
                $td2.appendChild($button2);
            }
            
            let $tdDate = _makeDate(appointment.date);
            let $tdPatient = _makeTableCell(appointment.patient);
            let $tdDoctor = _makeTableCell(appointment.doctor);
            _setChildren($tr, [$th, $td2, $tdDate, $tdPatient, $tdDoctor]);
            _appendChildren($appointments, [$tr]);
        })        
    })
}


function showAppointments() {
    let $appointments = document.getElementById("appointments");
    let $appointmentDetails = document.getElementById("appointment-details");
    let $newAppointment = document.getElementById("new-appointment");
    
    $appointmentDetails.style.visibility = "hidden";
    $newAppointment.style.visibility = "hidden";
    $appointments.style.visibility = "visible";
}
