"use strict";


function searchDoctors(txt) {
    txt = txt ? txt.toLowerCase() : txt;
    let doctorsPromise = _getDoctors(); 
    return new Promise((resolve, reject) => {
        doctorsPromise.then((doctors) => {
            let matches = doctors.filter(doctor => {
                let name = doctor.name.toLowerCase();
                return name.includes(txt);
            });
            resolve(matches);
        })
    });
}


function filterDoctors() {
    let $doctorsList = document.getElementById("doctors-list");
    let name = document.getElementById("input-doctors-name").value;
    let matchesPromise = searchDoctors(name);
    matchesPromise.then((matches) => { 
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


function searchPatients(txt) {
    txt = txt ? txt.toLowerCase() : txt;
    let patientsPromise = _getPatients(); 
    return new Promise((resolve, reject) => {
        patientsPromise.then((patients) => {
            let matches = patients.filter(patient => {
                let name = patient.name.toLowerCase();
                return name.includes(txt);
            });
            resolve(matches);
        })
    });
}


function filterPatients() {
    let $patientsList = document.getElementById("patients-list");
    let name = document.getElementById("input-patients-name").value;
    let matchesPromise = searchPatients(name);
    matchesPromise.then((matches) => {
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


function showPatients() {
    let $patientsList = document.getElementById("patient-search-list");
    _clearElement($patientsList);
    let name = document.getElementById("search-patient-name").value;
    let matchesPromise = searchPatients(name);
    matchesPromise.then((matches) => {
        matches.forEach((patient) => {
            let onClick = function() {  
                let $search = document.getElementById('patient-search');
                let $details = document.getElementById('patient-search-details');
                $search.style.visibility = 'hidden';
                $details.style.visibility = 'visible';
                let onClickBackButton = function() {
                    $search.style.visibility = 'visible';
                    $details.style.visibility = 'hidden';
                }
                showUserDetails(patient.id, 'patient', $details, onClickBackButton);
             }
            let $li = _makeClickableListGroupItem(patient.name, onClick);
            _appendChildren($patientsList, [$li]);
        })
    })
}


function showUserDetails(id, role, $div, onClick) {
    let userPromise = _getUser(id, role);
    $div.style.visiblity = 'visible';
    
    userPromise.then((user) => {    
        let $p1 = _makeTextElement("p", 'ID : ' + user.id); 
        let $p2 = _makeTextElement("p", 'Name : ' + user.name);
        let $p3 = _makeTextElement("p", 'Sex : ' + user.sex); 
        let $p4 = _makeTextElement("p", 'Date of birth : ' + user.dateOfBirth); 
        let $p5 = _makeTextElement("p", 'Place of birth : ' + user.placeOfBirth);
        let $p6 = _makeTextElement("p", 'Address : ' + user.address);
        let $p7 = _makeTextElement("p", 'Phone : ' + user.phone); 
        let $backButton = _makeClickableButton("Back", onClick);
        let children = [$p1, $p2, $p3, $p4, $p5, $p6, $p7, $backButton];
       _setChildren($div, children);
    });
}
