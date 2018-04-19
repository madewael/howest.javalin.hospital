"use strict";


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
    let date = $('#datetimepicker').data("DateTimePicker").viewDate();
    let patientPromise;
    if (role === "patient") {
        patientPromise = _getName(userId, role);
    } else {
        patientPromise = Promise.resolve(document.getElementById("patients-name").value);
    }
    let doctorPromise;
    if (role === "doctor") {
        doctorPromise = _getName(userId, role);
    } else {
        doctorPromise = Promise.resolve(document.getElementById("doctors-name").value);
    }
    Promise.all([patientPromise, doctorPromise]).then((values) => {
        let description = "description"; //TODO
        let log = "log"; //TODO        
        let appointmentPromise = _createAppointment(values[0], values[1], date, description, log);
        appointmentPromise.then((id) => {
            showAppointments(); 
            searchAppointmentsOfUser(userId, role);
        });  // TODO show popup when appointment cannot be created
    })
}


function saveChangesToAppointment(id) {
    let $log = document.getElementById("appointmentdetails-log");
    let appointmentPromise = _getAppointment(id);
    appointmentPromise.then((appointment) => {
        appointment["log"] = $log.value;
        _updateAppointment(id, appointment);
    })
}


function editAppointment(id, userId, role) {
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
        let $p6 = _makeTextarea('appointmentdetails-log', 'Log', appointment.log);
        let onClick = function() { saveChangesToAppointment(id); showAppointments(); searchAppointmentsOfUser(userId, role) }; //TODO
        let $backButton = _makeClickableButton("Save", onClick);
        let children = [$p1, $p2, $p3, $p4, $p5];
        if (role === "patient") {
            children = children.concat([$backButton]);
        } else if (role === "doctor") {
            children = children.concat([$p6, $backButton]);
        } else {
            children = children.concat([$backButton]);
        }
        _setChildren($appointmentInfo, children);
    });
}


function viewAppointment(id, userId, role) {
    let appointmentPromise = _getAppointment(id);
    
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
        let $p6 = _makeTextElement("p", 'Log : ' + appointment.log);
        let onClick = function() { showAppointments(); searchAppointmentsOfUser(userId, role) };
        let $backButton = _makeClickableButton("Back to appointments", onClick);
        let children = [$p1, $p2, $p3, $p4, $p5];
        if (role === "patient") {
            children = children.concat([$backButton]);
        } else if (role === "doctor") {
            children = children.concat([$p6, $backButton]);
        } else {
            children = children.concat([$backButton]);
        }
        _setChildren($appointmentInfo, children);
    });
}


function removeAppointment(id, userId, role) {
    let promise = _deleteAppointment(id);
    promise.then((res) => {
        showAppointments();
        searchAppointmentsOfUser(_USER_ID, _CURRENT_ROLE);
    })
}


/* userId is null in case of "admin" => show all appointments */
function searchAppointmentsOfUser(userId, role) {
    let appointmentsPromise = _filterAppointments(userId, role);
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
            let $editButton = _makeClickableIconButton("glyphicon glyphicon-pencil", function() { editAppointment(appointment.id, userId, role) });
            let $edit = _makeTableCell($editButton);
            let $removeButton = _makeClickableIconButton("glyphicon glyphicon-remove", function() { removeAppointment(appointment.id, userId, role) });
            let $rmv = _makeTableCell($removeButton);
  
            let children = [$date];
            if (role === "patient") {
                children = children.concat([$doctor, $view]);
            } else if (role === "doctor") {
                children = children.concat([$patient, $view, $edit]);
            } else {
                children = children.concat([$patient, $doctor, $view, $rmv]);
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
