var firebaseConfig = {
    apiKey: "AIzaSyCI-zBSlR5AiCbF2-uzAMmkP0vIavKPrDk",
    authDomain: "letschat-7755e.firebaseapp.com",
    databaseURL: "https://letschat-7755e-default-rtdb.firebaseio.com",
    projectId: "letschat-7755e",
    storageBucket: "letschat-7755e.appspot.com",
    messagingSenderId: "1045935255168",
    appId: "1:1045935255168:web:b17d9a1fb9f6dbf7678065"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function Send() {

    message = document.getElementById("msg").value;
  
    firebase.database().ref(room_name).push({
  
      username : user_name , 
      message : message , 
      likes : 0
  
    });
  
    document.getElementById("msg").value = "";
  
  }
  
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
           firebase_message_id = childKey;
           message_data = childData;
           
           console.log(firebase_message_id);
           console.log(message_data);
           name_of_sender = message_data['name'];
           message = message_data['message'];
           likes = message_data['likes'];
           name_with_tag = "<h4>" + name_of_sender + "<img src='tick.png' class='user_tick' draggable=false></h4>";
           message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
           like_button = "<button class='btn btn-warning' id="+ firebase_message_id +" value="+ likes +" onclick='updateLikes(this.id)'>"
           span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> like : </span></button><hr>";
           row = name_with_tag + message_with_tag + like_button + span_with_tag;
           document.getElementById("output").innerHTML += row;

        } });  }); }
  
  getData();

  function updateLikes(message_id) {
 
    console.log("like button is clicked " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
  
      like : updated_likes 
  
    });
  
  }

  function logOut() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("letsChat.html");

  }
  