"use strict";

let _PATIENT_NAME = "Carol";
let _DOCTOR_NAME = "Zorro";
let _APPOINTMENT_ID = 7;

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
    },
    { 
        id: "appointment4",
        patient: "Carol",
        doctor: "Zoro",
        date: "16 June 2018"
    },
    { 
        id: "appointment5",
        patient: "Dave",
        doctor: "Zoro",
        date: "1 August 2018"
    },
    { 
        id: "appointment6",
        patient: "Carol",
        doctor: "Yves",
        date: "9 August 2018"
    }
]

let _APPOINTMENTS_FULL = {
    "appointment1" : {
        id: "appointment1",
        patient: "Alice",
        doctor: "Zoro",
        date: "7 May 2018",
        description: "Back pain: scans",
        issues: ["back"],
        log: ""
    },
    "appointment2" : {
        id: "appointment2",
        patient: "Bob",
        doctor: "Yves",
        date: "19 June 2018",
        description: "Cardiac problems",
        issues: ["heart"],
        log: ""
    },
    "appointment3" : {
        id: "appointment3",
        patient: "Alice",
        doctor: "Zoro",
        date: "16 August 2018",
        description: "Follow up back pain scans",
        issues: ["back"],
        log: ""
    },
     "appointment4" : { 
        id: "appointment4",
        patient: "Carol",
        doctor: "Zoro",
        date: "16 June 2018",
        description: "intake",
        issues: ["back"],
        log: ""
    },
     "appointment5" : { 
        id: "appointment5",
        patient: "Dave",
        doctor: "Zoro",
        date: "1 August 2018",
        description: "",
        issues: ["neuro"],
        log: ""
    },
     "appointment6" : { 
        id: "appointment6",
        patient: "Carol",
        doctor: "Yves",
        date: "9 August 2018",
        description: "follow-up consult",
        issues: ["hernia"],
        log: ""
    }
}


function showNewAppointmentPage() {
    let $appointments = document.getElementById("appointments");
    let $newAppointment = document.getElementById("new-appointment");
    $appointments.style.visibility = "hidden";
    $newAppointment.style.visibility = "visible";
    
    $('#datetimepicker').datetimepicker({
         inline: true,
         sideBySide: true
     });
}

function addNewAppointment(userId, role) {
    let id = "appointment" + _APPOINTMENT_ID;
    _APPOINTMENT_ID++;
    let date = $('#datetimepicker').data("DateTimePicker").viewDate();
    let patientPromise;
    if (role === "patient") {
        patientPromise = Promise.resolve(_PATIENT_NAME);  //TODO fetch
    } else {
        patientPromise = Promise.resolve(document.getElementById("patients-name").value);
    }
    let doctorPromise;
    if (role === "doctor") {
        doctorPromise = Promise.resolve(_DOCTOR_NAME); //TODO fetch
    } else {
        doctorPromise = Promise.resolve(document.getElementById("doctors-name").value);
    }
    Promise.all([patientPromise, doctorPromise]).then((values) => {
        let shortAppointment = { 
            id: id,
            patient: values[0],
            doctor: values[1],
            date: date
        };
        let fullAppointment = JSON.parse(JSON.stringify(shortAppointment));
        fullAppointment["description"] = "description"; //TODO
        fullAppointment["issues"] = ["issues"]; //TODO
        ullAppointment["log"] = "log"; //TODO
    
        _APPOINTMENTS.push(shortAppointment);
        _APPOINTMENTS_FULL[id] = fullAppointment;
    })
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
        let $p1 = _makeTextElement("p", 'ID : ' + appointment.id); 
        let $p2 = _makeTextElement("p", 'Date : ' + appointment.date);
        let $p3 = _makeTextElement("p", 'Patient : ' + appointment.patient); 
        let $p4 = _makeTextElement("p", 'Doctor : ' + appointment.doctor); 
        let $p5 = _makeTextElement("p", 'Description : ' + appointment.description);
        let onClick = function() { showAppointments(); searchAppointmentsOfUser(userId, role) };
        let $backButton = _makeClickableButton("Back to appointments", onClick);
        _setChildren($appointmentInfo, [$p1, $p2, $p3, $p4, $p5, $backButton]);
        //TODO show issues
    });
}


/* userId is null in case of "admin" => show all appointments */
function searchAppointmentsOfUser(userId, role) {
    let filtered = [];
    if (role === "patient") { 
        filtered = _APPOINTMENTS.filter(a => a.patient === _PATIENT_NAME); 
    } else {
        filtered = _APPOINTMENTS;
    } //TODO fetch correct appointments
    let appointmentsPromise = Promise.resolve(filtered);
    
    appointmentsPromise.then((appointments) => {
        let $appointments = document.getElementById("appointment-list");
        _clearElement($appointments);
        
        appointments.forEach((appointment) => {
            let $row = document.createElement("tr");                 
            let $date = _makeTableCell(_makeDate(appointment.date));
            let $patient = _makeTextTableCell(appointment.patient);
            let $doctor = _makeTextTableCell(appointment.doctor);
            let $viewButton = _makeClickableIconButton("glyphicon glyphicon-eye-open", function() { viewAppointment(appointment.id, userId, role) });
            let $view = _makeTableCell($viewButton);
            let $editButton = _makeClickableIconButton("glyphicon glyphicon-pencil", function() { editAppointment(appointment.id) });
            let $edit = _makeTableCell($editButton);
  
            let children = [$date];
            if (role === "patient") {
                children = children.concat([$doctor, $view]);
            } else if (role === "doctor") {
                children = children.concat([$patient, $view, $edit]);
            } else {
                children = children.concat([$patient, $doctor, $view, $edit]);
            }
            _setChildren($row, children);
            _appendChildren($appointments, [$row]);
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
