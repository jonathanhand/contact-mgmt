var userEmail = 'Default List';
var contact;
var target = document.getElementById('table1');
var counter = 0;

const indexForm = document.getElementById('indexArea');
const createForm = document.getElementById('createForm');
const deatailsForm = document.getElementById('detailsForm');

function googleLogin() {

    googleBtn.classList.remove('buttonDeactive');
    googleBtn.classList.add('buttonActive');
    setInterval(function(){
        googleBtn.classList.add('buttonDeactive');
        googleBtn.classList.remove('buttonActive');
    }, 100);

const provider = new firebase.auth.GoogleAuthProvider()



firebase
  .auth()
  .signInWithPopup(provider)
  .then(result => {
    user = result.user;
    showUser(user);
    loadContacts();
  })
}

function showUser(user) {
userEmail = user.displayName;
// location.reload();
document.getElementById("userID").innerHTML = "Contact list for: " + userEmail;

}

function addUser() {
  console.log('writing to ' + userEmail);
  writeUserData(userEmail);
  showIndex();
}

function writeUserData(login) {
var writeRef = firebase.database().ref(login+'/');
nameN = document.getElementById("newName").value,
emailN = document.getElementById("newEmail").value,
phoneN = document.getElementById("newPhone").value

var val;
val = validateInfo(nameN, emailN, phoneN);

if (val === null) {
writeRef.push({
    name: nameN,
    email: emailN,
    phone: phoneN
});
// location.reload();
}
}

// function getUsers() {
//     getUserData(userEmail);
// }

//gets data for index
function loadContacts() {
var loginRef = firebase.database().ref().child('/' + userEmail + '/');
loginRef.on('value', function(snapshot) {
    contact = snapshot.val();
  printList(contact);
  console.log(snapshot.val().key);
});
}

function printList(contact) {
// for (var id in contact) {
  target.innerHTML = "";
    for (each in contact) {
    console.log(each); 
    makeTable(contact, each, target);
    }
  
}

function makeTable(contact, i, target) {
counter += 1;
var trNode = document.createElement("tr");
var tdNum = document.createTextNode(counter);
var tdName = document.createTextNode(contact[i]["name"]);
var tdEmail = document.createTextNode(contact[i]["email"]);
var tdPhone = document.createTextNode(contact[i]["phone"]);
var tdNodeNum = document.createElement("td");;
var tdNodeName = document.createElement("td");
var tdNodeEmail = document.createElement("td");
var tdNodePhone = document.createElement("td");

tdNodeNum.appendChild(tdNum);
tdNodeName.appendChild(tdName);
tdNodeEmail.appendChild(tdEmail);
tdNodePhone.appendChild(tdPhone);
trNode.appendChild(tdNodeNum);
trNode.appendChild(tdNodeName);
trNode.appendChild(tdNodeEmail);
trNode.appendChild(tdNodePhone);
trNode.appendChild(addDetailsBtn(i, target));
trNode.appendChild(addEditBtn(i, target));
trNode.appendChild(addDeleteBtn(i, target));


target.appendChild(trNode);
// addDeleteBtn(dbData, target);

}

function addEditBtn(dataID) {
const editBtn = document.createElement("input");
editBtn.type = "button";
editBtn.className = "editBtn";
editBtn.value = "Edit";
editBtn.setAttribute("edit-id", dataID);
// target.appendChild(editBtn);

editBtn.addEventListener("click", function(e) {
  var selectedID = editBtn.getAttribute("edit-id");
  showEdit(selectedID);
});
return editBtn;
}

function addDeleteBtn(dataID) {
const deleteBtn = document.createElement("input");
deleteBtn.type = "button";
deleteBtn.className = "deleteBtn";
deleteBtn.value = "Delete";
deleteBtn.setAttribute("delete-id", dataID);
// target.appendChild(deleteBtn);

deleteBtn.addEventListener("click", function(e) {
  var returnedVal = getConfirmation();
  if (returnedVal == true) {
    var selectedID = deleteBtn.getAttribute("delete-id");
    deleteRecord(selectedID);
  }
});
return deleteBtn;
}

function addDetailsBtn(dataID) {
const detailsBtn = document.createElement("input");
detailsBtn.type = "button";
detailsBtn.className = "ipDetailsBtn";
detailsBtn.value = "Details";
detailsBtn.setAttribute("details-id", dataID);


detailsBtn.addEventListener("click", function(e) {
  var selectedID = detailsBtn.getAttribute("details-id");
  showDetails(selectedID);
});
return detailsBtn;

}

// function showCreate() {
    
//     indexForm.style.display= "none";
//     createForm.style.display= "block";
//     detailsForm.style.display= "none";
//     editForm.style.display = "none";
//     createBtn.classList.add('buttonActive');
//     createBtn.classList.remove('buttonDeactive');
//     indexBtn.classList.remove('buttonActive');
//     indexBtn.classList.add('buttonDeactive');
// }

// function showIndex() {
//     indexForm.style.display= "block";
//     createForm.style.display= "none";
//     detailsForm.style.display= "none";
//     editForm.style.display = "none";
//     indexBtn.classList.add('buttonActive');
//     indexBtn.classList.remove('buttonDeactive');
//     createBtn.classList.remove('buttonActive');
//     createBtn.classList.add('buttonDeactive');


// }

// function showDetails(selectedID) {
//     indexForm.style.display= "none";
//     createForm.style.display= "none";
//     detailsForm.style.display= "block";
//     editForm.style.display = "none";
//     createBtn.classList.remove('buttonActive');
//     createBtn.classList.add('buttonDeactive');
//     indexBtn.classList.remove('buttonActive');
//     indexBtn.classList.add('buttonDeactive');

//     const nameP = document.getElementById("nameP");
//     const emailP = document.getElementById("emailP");
//     const phoneP = document.getElementById("phoneP");
    

//     nameP.innerHTML = contact[selectedID]["name"];
//     emailP.innerHTML = contact[selectedID]["email"];
//     phoneP.innerHTML = contact[selectedID]["phone"];
    
//     editDetailBtn = document.getElementById('editDetailBtn');
//     editDetailBtn.addEventListener("click", function(e) {
//         showEdit(selectedID);
//         });

//     deleteDetailBtn = document.getElementById('deleteDetailBtn');
//     deleteDetailBtn.addEventListener("click", function(e) {
//         var returnedVal = getConfirmation();
//         if (returnedVal == true) {
//         deleteRecord(selectedID);
//         showIndex();
//         return
//   }
//     });
//       }

// function showEdit (selectedID) {
//     indexForm.style.display= "none";
//     createForm.style.display= "none";
//     detailsForm.style.display= "none";
//     editForm.style.display = "block";
//     createBtn.classList.remove('buttonActive');
//     createBtn.classList.add('buttonDeactive');
//     indexBtn.classList.remove('buttonActive');
//     indexBtn.classList.add('buttonDeactive');
    
//     const nameF = document.getElementById("editNameField");
//     const emailF = document.getElementById("editEmailField");
//     const phoneF = document.getElementById("editPhoneField");

//     nameF.value = contact[selectedID]["name"];
//     emailF.value = contact[selectedID]["email"];
//     phoneF.value = contact[selectedID]["phone"];

//     subEditBtn.addEventListener("click", function(e) {
//         var val;
//         val = validateInfo(nameF.value, emailF.value, phoneF.value);

//         if (val === null) {
//         var editRef = firebase.database().ref(userEmail+'/');
//         editRef.update({
//             [selectedID]: {
//             name: nameF.value,
//             email: emailF.value,
//             phone: phoneF.value
//             }
//         });
//         showIndex();
//       }

//       });
// }

function deleteRecord (selectedID) {
firebase
.database()
.ref(userEmail + '/' + selectedID)
.remove();
alert("deleted");
// location.reload();
}
function getConfirmation() {
    var retVal = confirm("Are you sure?");
    if (retVal == true) {
      return true;
    } else {
      return false;
    }
  }

  function validateInfo (nameVal, emailVal, phoneVal) {
        console.log(nameVal, emailVal, phoneVal);
        //name pattern check
        const nameRegEx = /^./
        const nameTest = nameRegEx.test(nameVal)
        var nameError = '';

        //email pattern check
        const emailRegEx = /.+@.+\..+/
        const emailTest = emailRegEx.test(emailVal)
        var emailError = '';

        //phone pattern check
        const phoneRegEx = /^[2-9][0-9]{9}$/
        const phoneTest = phoneRegEx.test(phoneVal)
        var phoneError = '';

        if (nameTest === false){
            var nameError = 'Error: Must enter name. ';
        }
        if (emailTest === false){
            var emailError = 'Error: Invalid email address. ';
        }
        if (phoneTest === false){
            var phoneError = 'Error: Invalid phone number. ';
        }
        var errorMsg = nameError + emailError + phoneError;

        if (errorMsg === '') {
            console.log('no errors!')
            return null
            
        }
        else {
            alert(errorMsg);
        }
    }
loadContacts();