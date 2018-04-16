"use strict";

let _PATIENT_NAME = "Carol";
let _DOCTOR_NAME = "Zorro";
let _APPOINTMENT_ID = 7;
let _USER_ID = 43;

let _PATIENT = {
    id: 'patient3',
    name: 'Carol',
    sex: 'female',
    dateOfBirth: '19 april 1976',
    placeOfBirth: 'Brugge',
    address: 'address',
    phone: '797284'
}

let _DOCTOR = {
    id: 'doctor1',
    name: 'Zorro',
    sex: 'male',
    dateOfBirth: '30 august 1968',
    placeOfBirth: 'Antwerpen',
    address: 'address',
    phone: '123456'
}

let _APPOINTMENTS = [
    { 
        id: "appointment1",
        patient: "Alice",
        doctor: "Zorro",
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
        doctor: "Zorro",
        date: "16 June 2018"
    },
    { 
        id: "appointment5",
        patient: "Dave",
        doctor: "Zorro",
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
        doctor: "Zorro",
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
        doctor: "Zorro",
        date: "16 August 2018",
        description: "Follow up back pain scans",
        issues: ["back"],
        log: ""
    },
     "appointment4" : { 
        id: "appointment4",
        patient: "Carol",
        doctor: "Zorro",
        date: "16 June 2018",
        description: "intake",
        issues: ["back"],
        log: ""
    },
     "appointment5" : { 
        id: "appointment5",
        patient: "Dave",
        doctor: "Zorro",
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

let _DOCTORS = [
    {
        id: 'doctor1',
        name: 'zorro',
        specialty: 'heart'
    },
    {
        id: 'doctor2',
        name: 'yves',
        specialty: 'neuro'
    }
]

let _PATIENTS = [
    {
        id: 'patient1',
        name: 'Alice'
    },
    {
        id: 'patient2',
        name: 'Bob'
    },
    {
        id: 'patient3',
        name: 'Carol'
    },
    {
        id: 'patient4',
        name: 'Dave'
    }
]


/* ========================================================================================== */

function _getUser(id, role) {
    let user = role ? ((role === "patient") ? _PATIENT : _DOCTOR) : _PATIENT;
    return Promise.resolve(user); 
}


function _getName(id, role) {
    let name = (role === "patient") ? _PATIENT_NAME : _DOCTOR_NAME;
    return Promise.resolve(name); 
}


function _createPatient(name, sec, dob, pob, address, phone) {
    let id = "user" + _USER_ID;  //TODO 
    _USER_ID++;
    return Promise.resolve(id);
    // TODO when user cannot be created
}


function _getAppointment(id) {
    return Promise.resolve(_APPOINTMENTS_FULL[id]); 
}

function _createAppointment(patient, doctor, date, description, issues, log) {
    let id = "appointment" + _APPOINTMENT_ID;  //TODO 
    _APPOINTMENT_ID++;
    let shortAppointment = { 
        id: id,
        patient: patient,
        doctor: doctor,
        date: date
    };
    let fullAppointment = JSON.parse(JSON.stringify(shortAppointment));
    fullAppointment["description"] = description;
    fullAppointment["issues"] = issues;
    fullAppointment["log"] = log;

    _APPOINTMENTS.push(shortAppointment);
    _APPOINTMENTS_FULL[id] = fullAppointment;
    
    return Promise.resolve('ok'); //TODO error when appointment cannot be created
}


function _deleteAppointment(id) {
    delete _APPOINTMENTS_FULL[id];
    let idx = _APPOINTMENTS.findIndex((app) => app.id === id);
    if (idx !== -1) { 
        _APPOINTMENTS.splice(idx,1);
    }  
    return Promise.resolve('ok');
}


function _filterAppointments(userId, role) {
    let filtered = [];
    if (role === "patient") { 
        filtered = _APPOINTMENTS.filter(a => a.patient === _PATIENT_NAME); 
    } else if (role === "doctor") {
        filtered = _APPOINTMENTS.filter(a => a.doctor === _DOCTOR_NAME); 
    } else {
        filtered = _APPOINTMENTS;
    }
    return Promise.resolve(filtered);
}


function _getDoctors() {
    return Promise.resolve(_DOCTORS); 
}


function _getPatients() {
    return Promise.resolve(_PATIENTS);
}


function _updateAppointment(id, appointment) {
    // ...
}
