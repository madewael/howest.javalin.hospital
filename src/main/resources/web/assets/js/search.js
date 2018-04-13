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



function filterDoctors() {
    let $doctorsList = document.getElementById("doctors-list");
    
    let name = document.getElementById("inputDoctorsName").value;
    let doctorsPromise = Promise.resolve(_DOCTORS); /* TODO rest call to retrieve all doctors */
    doctorsPromise.then((doctors) => {
        let matches = doctors.filter(doctors => doctors.name.includes(name));
 
        matches.forEach((doctor) => {
            let onClick = function() {  
                $('#doctorsModal').modal('hide');
                let $doctorsName = document.getElementById("doctors-name");
                $doctorsName.value = doctor.name;
             }
            
            let $li = _makeClickableListGroupItem(doctor.name, onClick);
            _setChildren($doctorsList, [$li]);
        })
    })
}



