"use strict";

function addNewPatient(userId, role) {
    let name = document.getElementById("new-patient-name").value;
    let sex = document.getElementById('new-patient-sex-female').checked
        ? document.getElementById('new-patient-sex-female').value
        : document.getElementById("new-patient-sex-male").value;
    let dob = document.getElementById("new-patient-dob").value;
    let pob = document.getElementById("new-patient-pob").value;
    let address = document.getElementById("new-patient-address").value;
    let phone = document.getElementById("new-patient-phone").value;
    let promise = _createPatient(name, sex, dob, pob, address, phone);
    promise.then((id) => {
        let $patients = document.getElementById("appointments");
        let $pSearch = document.getElementById("patient-search");
        let $pDetails = document.getElementById("patient-search-details");
        let $newPatient = document.getElementById('new-patient');
        $patients.style.visibility = "visible";
        $pSearch.style.visibility = "visible";
        $pDetails.style.visibility = "hidden";
        $newPatient.style.visibility = "hidden";
    });  // TODO show popup when patient cannot be created
}


function viewPatient(id) {
    let userPromise = _getUser(id);
    let $profile = document.getElementById("patient-profile");
    $profile.style.visibility = 'visible';
    
    userPromise.then((user) => {    
        let $p1 = _makeTextElement("p", 'ID : ' + user.id); 
        let $p2 = _makeTextElement("p", 'Name : ' + user.name);
        let $p3 = _makeTextElement("p", 'Sex : ' + user.sex); 
        let $p4 = _makeTextElement("p", 'Date of birth : ' + user.dateOfBirth); 
        let $p5 = _makeTextElement("p", 'Place of birth : ' + user.placeOfBirth);
        let $p6 = _makeTextElement("p", 'Address : ' + user.address);
        let $p7 = _makeTextElement("p", 'Phone : ' + user.phone); 
        let children = [$p1, $p2, $p3, $p4, $p5, $p6, $p7];
       _setChildren($profile, children);
    });
}


