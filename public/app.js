    var userEmail = 'Jonathan Hand';
    var contact;

    function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user
        showUser(user);
      })
  }
  
  function showUser(user) {
    userEmail = user.displayName;
  }

  function addUser() {
      alert('writing to ' + userEmail);
      writeUserData(userEmail, 'test');
  }
  
  function writeUserData(login, name) {
    var writeRef = firebase.database().ref(login+'/');
    writeRef.push({
      username: name,
    });
  }

  function getUsers() {
      getUserData(userEmail);
  }

    // var userId = firebase.database().ref('/' + login + '/')
    // .on('value', function(snapshot)) {
    //   printList(snapshot.val())
    // });

    var starCountRef = firebase.database().ref('/' + userEmail + '/');
    starCountRef.on('value', function(snapshot) {
      printList(snapshot.val());
    });
    
  function printList(contact) {
    // for (var id in contact) {
        for (each in contact) {
        console.log(contact[each].username);
        }
    //   makeTable(snapshotDB[id], target);
      // addDetailsBtn(id, target);
      // addEditBtn(id, target);
      // addDeleteBtn(id, target);
    // }
  }
