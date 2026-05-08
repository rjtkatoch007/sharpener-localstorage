document.addEventListener("DOMContentLoaded", initialize);

// Don't remove anything just complete the functions

// When the page get load display all users
 function initialize(){
     Object.keys(localStorage).forEach((key) => {
         const userDetails = JSON.parse(localStorage.getItem(key));
         if (userDetails && userDetails.email) {
             display(userDetails);
         }
    })
 }

// add new users in usersList array
function handleFormSubmit(event) {  
    event.preventDefault();

    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    }

    localStorage.setItem(userDetails.email, JSON.stringify(userDetails));
    display(userDetails);
    event.target.reset();
}


 // use this function to display user on screen
 function display(userDetails) {
     const userList = document.querySelector("ul");
     const listItem = document.createElement("li");
     listItem.id = userDetails.email;
     listItem.textContent = `${userDetails.username}-${userDetails.email}-${userDetails.phone}`;

     const deleteBtn = document.createElement("button");
     deleteBtn.textContent = "Delete";
     deleteBtn.className = "delete-btn";

     deleteBtn.addEventListener('click', deleteData);

     listItem.appendChild(deleteBtn);
     userList.appendChild(listItem);
 }


 // use this function to delete the user details from local store and DOM (screen)
 function deleteData(userDetails) {
    const userList = document.querySelector("ul");
    const listItem = document.querySelector("li");
     localStorage.removeItem(userDetails.email);
     userList.removeChild(listItem);
 }
 //module.exports = handleFormSubmit
