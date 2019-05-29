var userEmail = 'Default List';
var userID = 'Default List';
var contact;
var target = document.getElementById('table1');
var counter = 0;

const indexForm = document.getElementById('indexArea');
const createForm = document.getElementById('createForm');
const deatailsForm = document.getElementById('detailsForm');

//creates popup for google Login
//calls showUser and loadContacts
function googleLogin() {
    googleBtn.classList.remove('buttonDeactive');
    googleBtn.classList.add('buttonActive');
    
    setInterval(function(){ //makes button change to active then deactive
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
      counter=0;
    })
}

//gets the user name and changes the innerhtml to their contact list 
function showUser(user) {
userEmail = user.displayName;
userID = firebase.auth().currentUser.uid;

// location.reload();
document.getElementById("userID").innerHTML = "Contact list for: " + userEmail;

}

//calls writeUserData to create new record and showIndex
function addUser() {

  console.log('writing to ' + userID);
  writeUserData(userID);
  showIndex();
}

//connects to db, writes to the db
//calls validateInfo to check everything is valid before writing
function writeUserData(login) {
  var writeRef = firebase.database().ref(login+'/');
  nameN = document.getElementById("newName").value,
  emailN = document.getElementById("newEmail").value,
  phoneN = document.getElementById("newPhone").value

  var val;
  val = validateInfo(nameN, emailN, phoneN);

  //push creates unique ID for each record
  if (val === null) {
    writeRef.push({
        name: nameN,
        email: emailN,
        phone: phoneN
    });
  }
}

//connects to firebase db and takes snapshot
//calls printList
function loadContacts() {
  var loginRef = firebase.database().ref().child('/' + userID + '/');
  loginRef.on('value', function(snapshot) {
      contact = snapshot.val();
    printList(contact);
    console.log(contact);
  });
}

// loops through contact object and creates table for each record
//calls makeTable
function printList(contact) {
  target.innerHTML = "";
    for (each in contact) {
    console.log(each); 
    makeTable(contact, each, target);
    }
  
}

//accepts record, index, and the DOM target
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

//creates and returns edit button for record
function addEditBtn(dataID) {
  const editBtn = document.createElement("input");
  editBtn.type = "button";
  editBtn.className = "editBtn";
  editBtn.value = "Edit";
  editBtn.setAttribute("edit-id", dataID);

  //adds event listener for the created button
  editBtn.addEventListener("click", function(e) {
    var selectedID = editBtn.getAttribute("edit-id");
    showEdit(selectedID);
  });
  return editBtn;
}

//creates and returns delete button for record
function addDeleteBtn(dataID) {
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.className = "deleteBtn";
  deleteBtn.value = "Delete";
  deleteBtn.setAttribute("delete-id", dataID);

  //creates event listener for deleteBtn
  //calls getConfirmation and deleteRecord
  deleteBtn.addEventListener("click", function(e) {
    var returnedVal = getConfirmation();
    if (returnedVal == true) {
      var selectedID = deleteBtn.getAttribute("delete-id");
      deleteRecord(selectedID);
    }
  });
  return deleteBtn;
}

//creates and returns details button for record
function addDetailsBtn(dataID) {
  const detailsBtn = document.createElement("input");
  detailsBtn.type = "button";
  detailsBtn.className = "ipDetailsBtn";
  detailsBtn.value = "Details";
  detailsBtn.setAttribute("details-id", dataID);

  //event listener for detailsBtn
  //calls showDetails and passes current ID
  detailsBtn.addEventListener("click", function(e) {
    var selectedID = detailsBtn.getAttribute("details-id");
    showDetails(selectedID);
  });
  return detailsBtn;

}

//deletes record when delete button is clicked
//calls getConfirmation
function deleteRecord (selectedID) {
firebase
.database()
.ref(userID + '/' + selectedID)
.remove();
alert("deleted");
// location.reload();
}

//creates confirmation dialog and returns boolean
function getConfirmation() {
    var retVal = confirm("Are you sure?");
    if (retVal == true) {
      return true;
    } else {
      return false;
    }
}

//regular expression to validate name, email, and phone fields
//returns null or errorMsg
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
      const phoneRegEx = /^\d{3}-\d{3}-\d{4}$/
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

//loads the db records
loadContacts();