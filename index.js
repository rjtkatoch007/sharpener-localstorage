document.addEventListener("DOMContentLoaded", initialize);
// Don't remove anything just complete the functions
// When the page get load display all users
function initialize() {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    for (let i = 0; i < usersList.length; i++) {
        display(usersList[i]);
    }
}

// add new users in usersList array
function handleFormSubmit(event) {  
    event.preventDefault();

    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    }
    const usersList = JSON.parse(localStorage.getItem("userList")) || [];
    userDetails.id = Date.now();
    usersList.push(userDetails);
    display(userDetails);

    localStorage.setItem("usersList", JSON.stringify(usersList));   
    event.target.reset();

}
 // use this function to display user on screen
 function display(data) {
     const ul = document.querySelector("ul");    
     const li = document.createElement("li");     
     li.textContent = data.username + " " + data.email + " " + data.phone;

     ul.appendChild(li);

     const deleteBtn = document.createElement("button");
     deleteBtn.textContent = "Delete";
     deleteBtn.className = "delete-btn";

     deleteBtn.addEventListener('click', () => deleteData(data.id, li));     
     
     li.appendChild(deleteBtn);
 }

 // use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const updateUsersList = [];
    for (let i = 0; i < usersList.length; i++){
        if (id!=usersList[i].id) {
            updateUsersList.push(usersList[i]);
        }        
    }    
     localStorage.setItem("usersList", JSON.stringify(updateUsersList));
     li.remove();
 }
 //module.exports = handleFormSubmit
