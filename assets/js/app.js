var firebaseConfig = {
  apiKey: "AIzaSyA1mO_sc6f7076yDUPSoU8-V_w0zVnpLlg",
  authDomain: "contact-form-portfolio-cd614.firebaseapp.com",
  databaseURL: "https://contact-form-portfolio-cd614.firebaseio.com",
  projectId: "contact-form-portfolio-cd614",
  storageBucket: "contact-form-portfolio-cd614.appspot.com",
  messagingSenderId: "156302673786",
  appId: "1:156302673786:web:4b04f09ca308b40cb938c3"
};

firebase.initializeApp(firebaseConfig);
var firestore =  firebase.firestore();

const submitBtn = document.querySelector('#submit');

let userName = document.querySelector('#userFullName');
let userEmail = document.querySelector('#userEmail');
let userMessage = document.querySelector('#userMessage');

const db = firestore.collection("contactData");

submitBtn.addEventListener('click', function() {
  let userNameInput = userName.value;
  let userEmailInput = userEmail.value;
  let userMessageInput = userMessage.value;

  db.doc().set( {
    name: userNameInput,
    email: userEmailInput,
    message: userMessageInput
  }).then(function(){
    //console.log("Data Saved");
    window.alert("Message Sent");
    window.close();
    window.location.href = "index.html";
  })
  .catch(function(error) {
    //console.log(error);
    window.alert("Could not send message");
    window.close();
  });
})