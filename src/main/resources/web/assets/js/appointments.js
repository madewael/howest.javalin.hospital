"use strict";

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


function addNewAppointment() {
    console.log("add new appointment"); //TODO
}

function editAppointment() {
    console.log("EDIT APPOINTMENT"); //TODO
}


function viewAppointment() {
    console.log("VIEW APPOINTMENT");  //TODO
}


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
            let glyphOnClick = (role === "admin") ? editAppointment : viewAppointment;
            $span.setAttribute("class", glyphClass);
            $span.setAttribute("aria-hidden", "true");
            $button.addEventListener("click", glyphOnClick);
            $button.appendChild($span);

            $th.appendChild($button);
            let $td_date = document.createElement("date");
            $td_date.appendChild(document.createTextNode(appointment.date));
            let $td_patient = document.createElement("td");
            $td_patient.appendChild(document.createTextNode(appointment.patient));
            let $td_doctor = document.createElement("td");
            $td_doctor.appendChild(document.createTextNode(appointment.doctor));
            $tr.appendChild($th);
            $tr.appendChild($td_date);
            $tr.appendChild($td_patient);
            $tr.appendChild($td_doctor);
            
            $appointments.appendChild($tr);
        })        
    })
}

