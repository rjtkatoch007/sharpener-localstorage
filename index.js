 // Replace this with your unique endpoint from crudcrud.com (expires every 24 hours)
    const API_URL = "https://crudcrud.com/api/da786c8a9ced405988f9e515d1bebd3f/booking"; 
    
    let allBookings = [];

    // Fetch and display data on page load
    window.addEventListener("DOMContentLoaded", fetchBookings);

    async function fetchBookings() {
        try {
            const response = await fetch(API_URL);
            allBookings = await response.json();
            renderBookings(allBookings);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function renderBookings(bookings) {
        const listContainer = document.getElementById("bookingsList");
        listContainer.innerHTML = "";

        if (bookings.length === 0) {
            listContainer.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        bookings.forEach(booking => {
            const item = document.createElement("div");
            item.className = "booking-item";
            item.innerHTML = `
                <div>
                    <strong>${booking.name}</strong> (${booking.busNumber})<br>
                    <small>${booking.email} | ${booking.phone}</small>
                </div>
                <div class="actions">
                    <button class="edit-btn" onclick="editBooking('${booking._id}', '${booking.name}', '${booking.email}', '${booking.phone}', '${booking.busNumber}')">Edit</button>
                    <button class="delete-btn" onclick="deleteBooking('${booking._id}')">Delete</button>
                </div>
            `;
            listContainer.appendChild(item);
        });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const id = document.getElementById("bookingId").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const busNumber = document.getElementById("busNumber").value;

        const bookingData = { name, email, phone, busNumber };

        try {
            if (id) {
                // Update existing record (PUT request)
                // CrudCrud does not accept _id in the body for PUT requests
                await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData)
                });
                document.getElementById("submitBtn").innerText = "Book";
            } else {
                // Create new record (POST request)
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData)
                });
            }
            
            document.getElementById("bookingForm").reset();
            document.getElementById("bookingId").value = "";
            fetchBookings(); // Refresh UI
        } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    async function deleteBooking(id) {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchBookings(); // Refresh UI
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    function editBooking(id, name, email, phone, busNumber) {
        document.getElementById("bookingId").value = id;
        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        document.getElementById("phone").value = phone;
        document.getElementById("busNumber").value = busNumber;
        
        document.getElementById("submitBtn").innerText = "Update Booking";
    }

    function filterBookings() {
        const filterValue = document.getElementById("filterBus").value;
        if (filterValue === "all") {
            renderBookings(allBookings);
        } else {
            const filtered = allBookings.filter(b => b.busNumber === filterValue);
            renderBookings(filtered);
        }
    }