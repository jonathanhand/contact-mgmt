function showCreate() {
    
    indexForm.style.display= "none";
    createForm.style.display= "block";
    detailsForm.style.display= "none";
    editForm.style.display = "none";
    createBtn.classList.add('buttonActive');
    createBtn.classList.remove('buttonDeactive');
    indexBtn.classList.remove('buttonActive');
    indexBtn.classList.add('buttonDeactive');
}

function showIndex() {
    indexForm.style.display= "block";
    createForm.style.display= "none";
    detailsForm.style.display= "none";
    editForm.style.display = "none";
    indexBtn.classList.add('buttonActive');
    indexBtn.classList.remove('buttonDeactive');
    createBtn.classList.remove('buttonActive');
    createBtn.classList.add('buttonDeactive');


}

function showDetails(selectedID) {
    indexForm.style.display= "none";
    createForm.style.display= "none";
    detailsForm.style.display= "block";
    editForm.style.display = "none";
    createBtn.classList.remove('buttonActive');
    createBtn.classList.add('buttonDeactive');
    indexBtn.classList.remove('buttonActive');
    indexBtn.classList.add('buttonDeactive');

    const nameP = document.getElementById("nameP");
    const emailP = document.getElementById("emailP");
    const phoneP = document.getElementById("phoneP");
    

    nameP.innerHTML = contact[selectedID]["name"];
    emailP.innerHTML = contact[selectedID]["email"];
    phoneP.innerHTML = contact[selectedID]["phone"];
    
    editDetailBtn = document.getElementById('editDetailBtn');
    editDetailBtn.addEventListener("click", function(e) {
        showEdit(selectedID);
        });

    deleteDetailBtn = document.getElementById('deleteDetailBtn');
    deleteDetailBtn.addEventListener("click", function(e) {
        var returnedVal = getConfirmation();
        if (returnedVal == true) {
        deleteRecord(selectedID);
        showIndex();
        return
  }
    });
      }

function showEdit (selectedID) {
    indexForm.style.display= "none";
    createForm.style.display= "none";
    detailsForm.style.display= "none";
    editForm.style.display = "block";
    createBtn.classList.remove('buttonActive');
    createBtn.classList.add('buttonDeactive');
    indexBtn.classList.remove('buttonActive');
    indexBtn.classList.add('buttonDeactive');
    
    const nameF = document.getElementById("editNameField");
    const emailF = document.getElementById("editEmailField");
    const phoneF = document.getElementById("editPhoneField");

    nameF.value = contact[selectedID]["name"];
    emailF.value = contact[selectedID]["email"];
    phoneF.value = contact[selectedID]["phone"];

    subEditBtn.addEventListener("click", function(e) {
        var val;
        val = validateInfo(nameF.value, emailF.value, phoneF.value);

        if (val === null) {
        var editRef = firebase.database().ref(userID+'/');
        editRef.update({
            [selectedID]: {
            name: nameF.value,
            email: emailF.value,
            phone: phoneF.value
            }
        });
        showIndex();
      }

      });
}