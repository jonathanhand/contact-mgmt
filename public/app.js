    var userEmail;

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
  //unique code>name, email, phone