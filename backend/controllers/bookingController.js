const Booking = require('../models/booking');

// Create a new booking (Insert User API)
exports.createBooking = async (req, res) => {
    try {
        const { name, email, phone, busNumber } = req.body;
        const newBooking = await Booking.create({ name, email, phone, busNumber });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

// Get all bookings (Get User API)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// Update an existing booking (Edit User API)
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, busNumber } = req.body;
        
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        await booking.update({ name, email, phone, busNumber });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
};

// Delete a booking (Delete API)
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        await booking.destroy();
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete booking' });
    }
};
