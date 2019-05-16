    function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user
        writeUserData(showUser(user), 'jon');
      })
  }
  
  function showUser(user) {
    return user.displayName
  }
  
  function writeUserData(login, name) {
    firebase.database().ref(login).set({
      username: name,
    });
  }
  