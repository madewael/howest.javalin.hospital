"use strict";

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



function filterDoctors() {
    let $doctorsList = document.getElementById("doctors-list");
    
    let name = document.getElementById("input-doctors-name").value;
    let doctorsPromise = Promise.resolve(_DOCTORS); /* TODO rest call to retrieve all doctors */
    doctorsPromise.then((doctors) => {
        let matches = doctors.filter(doctors => doctors.name.includes(name));
 
        matches.forEach((doctor) => {
            let onClick = function() {  
                $('#doctors-modal').modal('hide');
                let $doctorsName = document.getElementById("doctors-name");
                $doctorsName.value = doctor.name;
             }
            
            let $li = _makeClickableListGroupItem(doctor.name, onClick);
            _setChildren($doctorsList, [$li]);
        })
    })
}


function filterPatients() {
    let $patientsList = document.getElementById("patients-list");
    
    let name = document.getElementById("input-patients-name").value;
    let patientsPromise = Promise.resolve(_PATIENTS); /* TODO rest call to retrieve all patients */
    patientsPromise.then((patients) => {
        let matches = patients.filter(patients => patients.name.includes(name));
 
        matches.forEach((patient) => {
            let onClick = function() {  
                $('#patients-modal').modal('hide');
                let $patientsName = document.getElementById("patients-name");
                $patientsName.value = patient.name;
             }
            
            let $li = _makeClickableListGroupItem(patient.name, onClick);
            _setChildren($patientsList, [$li]);
        })
    })
}

