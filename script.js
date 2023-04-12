// Please paste your own configuration from Firebase
// Firebase configuration
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};
const app = initializeApp(firebaseConfig);

// Firebase additional configuration
import {getDatabase, ref, get, child, set, update, remove} 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js"; // version MUST match line 3
const db= getDatabase();

/*
For demo purpose, we will be performing CRUD on Books

- CREATE book
- READ/ view book
- UPDATE book
- DELETE book
*/

// Selector
function $$(a){return document.querySelector(a);}

// Result area
var result = $$("pre");

// CREATE new book
function Create(){
    set(ref(db,"Books/"+ "B01"),{
        Id: "B01",
        Title: "Introduction to marketing",
        Price: 15,
        Author: "Thomas L"
    })
    .then(()=>{
        alert("Book added !");
    })
    .catch((error)=>{
        alert(error);
    })   
}
// Create();
  
// READ book, pass in book id
function Read(id){
    const dbref = ref(db);
    get(child(dbref, 'Books/'+ id))
    .then((snapshot)=> { 
        // If book is found
        if (snapshot.exists()){
            result.innerHTML =
            `
            Id: ${snapshot.val().Id}
            Title: ${snapshot.val().Title}
            Author: ${snapshot.val().Author}
            Price: $${snapshot.val().Price}
            `; 
        }
        // If book is NOT found
        if (!snapshot.exists()){
            alert("Book not found !");
        }
    })
    .catch((error)=>{
        alert(error);
    }) 
}
// Read("B01");

// UPDATE book, pass in book id
function Update(id){
    update(ref(db, "Books/" + id), {
      Price: 20
    })
    .then(() => {
        alert("Book updated !");
    })
    .catch((error)=>{
        alert(error);
    }) 
}
// Update("B01");

// DELETE book, pass in book id
function Delete(id){
  remove(ref(db,"Books/"+ id),{
  })
  .then(()=>{
    alert("Book deleted !");
  })
  .catch((error)=>{
    alert(error);
  }) 
}
// Delete("B01");