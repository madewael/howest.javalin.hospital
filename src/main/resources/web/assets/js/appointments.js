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
    
/*<form class="form-inline">
  <label class="mr-sm-2" for="inlineFormCustomSelect">Preference</label>
  <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select> */
    
    
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
    $appointmentInfo.innerHTML = '';
    
    appointmentPromise.then((appointment) => {    
        let $p1 = document.createElement("p");
        $p1.appendChild(document.createTextNode('ID : ' + appointment.id)); 
        let $p2 = document.createElement("p");
        $p2.appendChild(document.createTextNode('Date : ' + appointment.date));
        let $p3 = document.createElement("p");
        $p3.appendChild(document.createTextNode('Patient : ' + appointment.patient)); 
        let $p4 = document.createElement("p");
        $p4.appendChild(document.createTextNode('Doctor : ' + appointment.doctor)); 
        let $p5 = document.createElement("p");
        $p5.appendChild(document.createTextNode('Description : ' + appointment.description));
        $appointmentInfo.appendChild($p1);
        $appointmentInfo.appendChild($p2);
        $appointmentInfo.appendChild($p3);
        $appointmentInfo.appendChild($p4);
        $appointmentInfo.appendChild($p5);
        
        let $backButton = document.createElement("button");
        $backButton.setAttribute("type", "button");
        $backButton.setAttribute("class", "btn btn-default");
        $backButton.appendChild(document.createTextNode("Back to appointments"));
        let onClick = function() { showAppointments(); searchAppointmentsOfUser(userId, role) };
        $backButton.addEventListener("click", onClick);
        $appointmentInfo.appendChild($backButton);
    });
}


/* userId is null in case of "admin" => show all appointments */
function searchAppointmentsOfUser(userId, role) {
    let appointmentsPromise = Promise.resolve(_APPOINTMENTS);
    
    appointmentsPromise.then((appointments) => {
        let $appointments = document.getElementById("appointment-list");
        $appointments.innerHTML = '';
        
        appointments.forEach((appointment) => {
            let $tr = document.createElement("tr");     
            let $th = document.createElement("th"); 
            
            let $button = document.createElement("button");  
            $button.setAttribute("class", "btn btn-default btn-sm");
            let $span = document.createElement("span"); 
            let glyphClass = (role === "admin") ?  "glyphicon glyphicon-pencil" : "glyphicon glyphicon-eye-open";
            let glyphOnClick = (role === "admin") ? function() { editAppointment(appointment.id) } : function() { viewAppointment(appointment.id, userId, role) };
            $span.setAttribute("class", glyphClass);
            $span.setAttribute("aria-hidden", "true");
            $button.addEventListener("click", glyphOnClick);
            $button.appendChild($span);
            $th.appendChild($button);
            
            let $td2 = document.createElement("td"); 
            if (role === "doctor") {
                /* doctor can view AND edit appointment */
                let $button2 = document.createElement("button");  
                $button2.setAttribute("class", "btn btn-default btn-sm");
                let $span2 = document.createElement("span"); 
                $span2.setAttribute("class", "glyphicon glyphicon-pencil");
                $span2.setAttribute("aria-hidden", "true");
                let onClick = function() { editAppointment(appointment.id) };
                $button2.addEventListener("click", onClick);
                $button2.appendChild($span2);
                $td2.appendChild($button2);
            }
            
            let $tdDate = document.createElement("date");
            $tdDate.appendChild(document.createTextNode(appointment.date));
            let $tdPatient = document.createElement("td");
            $tdPatient.appendChild(document.createTextNode(appointment.patient));
            let $tdDoctor = document.createElement("td");
            $tdDoctor.appendChild(document.createTextNode(appointment.doctor));
            $tr.appendChild($th);
            $tr.appendChild($td2);
            $tr.appendChild($tdDate);
            $tr.appendChild($tdPatient);
            $tr.appendChild($tdDoctor);
            
            $appointments.appendChild($tr);
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
