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

    document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

    function addRoom() {

      room_name = document.getElementById("room_name").value;

      localStorage.setItem("room_name" , room_name);
  
      firebase.database().ref("/").child(room_name).update({
  
        purpose:"Adding Roomname"
  
      }); 
  
    }

    function getData() {

      firebase.database().ref("/").on('value', function(snapshot) {
         document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
    
        room_names = childKey;
        console.log("room-name : " + room_names);
        row = "<br><br><div class='room_name' id="+ room_names +" onclick='redirecttoroomName(this.id)'>#" + room_names + "</div><hr><br><br>";
        document.getElementById("output").innerHTML += row;
    
         });
    
        });
    
    }

    getData();

    function redirecttoroomName(name) {

      console.log(name);
      localStorage.setItem("room_name" , name);
      window.location = "letsChat_page.html";

    }

    function logOut() {

      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");

    }


