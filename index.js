function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  localStorage.setItem(userDetails.email, JSON.stringify(userDetails));
  displayUserOnScreen(userDetails);
  event.target.reset();
}

function displayUserOnScreen(userDetails) {
  // Select the list INSIDE the function to ensure it's found
  const userList = document.querySelector("ul");
  
  if (!userList) {
    console.error("The <ul> element was not found on the page.");
    return;
  }

  const listItem = document.createElement("li");
  listItem.id = userDetails.email;
  listItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone} `;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  deleteBtn.onclick = () => {
    localStorage.removeItem(userDetails.email);
    userList.removeChild(listItem);
  };

  listItem.appendChild(deleteBtn);
  userList.appendChild(listItem);
}

// Ensure the page is ready before loading saved data
window.addEventListener("DOMContentLoaded", () => {
    Object.keys(localStorage).forEach((key) => {
        try {
            const userDetails = JSON.parse(localStorage.getItem(key));
            // Basic check to ensure we only load valid user objects
            if(userDetails && userDetails.email) {
                displayUserOnScreen(userDetails);
            }
        } catch (e) {
            // Skips items in localStorage that aren't valid JSON
        }
    });
});
 //module.exports = handleFormSubmit;