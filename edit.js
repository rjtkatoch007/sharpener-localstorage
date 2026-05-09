    document.addEventListener("DOMContentLoaded", initialize);

    // Don't remove anything just complete the functions

    // When the page get load display all users
    function initialize(){
        const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
        for (let i = 0; i < usersList.length; i++){
            display(usersList[i]);
            
        }

        sessionStorage.removeItem("editId");
    }

    // add new users in usersList array
function handleFormSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const userDetails = { username, email, phone };

    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

    const editId = sessionStorage.getItem("editId");

    if (editId) {
        update(usersList, editId, userDetails)
    } else {
        addData(usersList, userDetails);
    }

    event.target.reset();

    localStorage.setItem("userList", JSON.stringify(usersList));
}
    // use this function to display user on screen
    function display(data) {
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        li.textContent = data.username + " " + data.email + " " + data.phone;

        li.id = data.id;

        ul.appendChild(li);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteData(data.id, li));
        li.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editData(data));

        li.appendChild(editButton);
    }

    // use this function to add user details into local storage
function addData(usersList, userDetails) {
    userDetails.id = Date.now();
    usersList.push(userDetails);
    display(userDetails);
    
    }


    // use this function to delete the user details from local store and DOM (screen)
    function deleteData(id, li) {
        const usersList = JSON.parse(localStorage.getItem("usersList"));
        const updateUsersList = [];

        for (const user of usersList){
            if (user.id != id) {
                updateUsersList.push(user);
            }
        }
        localStorage.setItem("usersList", JSON.stringify(updateUsersList));
        li.remove();
    }

    // use this function to update user details from local storage
function editData(data) {
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");

    usernameInput.value = data.username;
    emailInput.value = data.email;
    phoneInput.value = data.phone;

    sessionStorage.setItem("editId", data.id);

    const submitBtn = document.querySelector("button[type=submit]");
    submitBtn.textContent = "Update";

    }

    function update(usersList, editId, userDetails){
        for (let i = 0; i < usersList.length; i++){
            if (usersList[i].id==editId) {
                usersList[i].username = userDetails.username
                usersList[i].email=userDetails.email
                usersList[i].phone=userDetails.phone
            }
        }
        const li = document.getElementById(editId);
        li.firstChild.textContent = userDetails.username + " " + userDetails.email + " " + userDetails.phone;

        sessionStorage.removeItem("editId");
        const submitBtn = document.querySelector("button[type=submit]");
        submitBtn.textContent = "Submit"; 

    }

    //module.exports = handleFormSubmit