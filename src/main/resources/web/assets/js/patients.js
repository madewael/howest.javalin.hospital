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


function editPatient(id) {
    let userPromise = _getUser(id);
    let $profile = document.getElementById("patient-search-details");
    $profile.style.visibility = 'visible';
    
    userPromise.then((user) => {    
        let $p1 = _makeTextElement("p", 'ID : ' + user.id); 
        let $p2 = _makeTextElement("p", 'Name : ' + user.name);
        let $p3 = _makeTextElement("p", 'Sex : ' + user.sex); 
        let $p4 = _makeTextElement("p", 'Date of birth : ' + user.dateOfBirth); 
        let $p5 = _makeTextElement("p", 'Place of birth : ' + user.placeOfBirth);
        let $p6 = _makeTextElement("p", 'Address : ' + user.address);
        let $p7 = _makeTextElement("p", 'Phone : ' + user.phone);
        let uParents = user.parents.map((u) => u.name).join(" & "); 
        let $p8 = _makeTextElement("p", 'Parents : ' + uParents); 
        let onkeyupParents = function(e) {
            let onClickParent = function(pId) {
                let namePromise = _getUser(pId);
                namePromise.then((user) => {
                    user.parents = user.parents.concat([{id: pId, name: user.name}]);
                    _addParent(id, pId);
                    $('#parent-search-modal').modal('hide');
                    editPatient(id);
                })
            };
            showUsers("input-parent-relation", onClickParent, "parents-relation-list");
        };
        let $pSearchInput = _makeSearchInput("Parents ...", "parent-search-input", "#parent-search-modal", "Search patients");
        let $pSearchModal = _makeSearchModal("parent-search-modal", "p-search-modal", "Add parent", onkeyupParents, "input-parent-relation", "parents-relation-list");
        let onkeyupChildren = function(e) {
            console.log("add children");
        };
        let uChildren = user.children.join(" & "); 
        let $p9 = _makeTextElement("p", "Children : " + uChildren);
        let $cSearchInput = _makeSearchInput("Children ...", "children-search-input", "#children-search-modal", "Search patients");
        let $cSearchModal = _makeSearchModal("children-search-modal", "c-search-modal", "Add child", onkeyupChildren, "input-child-relation", "children-relation-list");
        let onClick = function() { saveChangesToPatient(id); /* TODO back to patients page */ };
        let $button = _makeClickableButton("Save", onClick);
        let children = [$p1, $p2, $p3, $p4, $p5, $p6, $p7, $p8, $pSearchInput, $pSearchModal, $p9, $cSearchInput, $cSearchModal, $button];
       _setChildren($profile, children);
    });
}


function showUsers(inputId, onClick, divId) {
   let $patientsList = document.getElementById(divId);
   let name = document.getElementById(inputId).value;
   let matchesPromise = searchPatients(name);
   matchesPromise.then((matches) => {
        matches.forEach((patient) => {
            let $li = _makeClickableListGroupItem(patient.name, function() { onClick(patient.id); } );
            _setChildren($patientsList, [$li]);
        })
    })
}

