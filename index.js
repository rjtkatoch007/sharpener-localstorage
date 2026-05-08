function handleformsubmit(event) {
    // Prevent the default form submission behavior (page refresh)
    event.preventDefault();

    // Retrieve values using event.target.elements
    const username = event.target.elements['username'].value;
    const email = event.target.elements['email'].value;
    const phone = event.target.elements['phone'].value;

    // Store values in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
}

// Export the function
module.exports = handleformsubmit;
