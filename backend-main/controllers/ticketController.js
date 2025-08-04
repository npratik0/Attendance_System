const { Ticket } = require('../models'); // ✅ Make sure this is here

exports.createTicket = async (req, res) => {
  try {
    const { studentId, fullName, subject, reason, date, description } = req.body;

    console.log('Received:', { studentId, fullName, subject, reason, date, description });

    if (!studentId || !fullName || !reason || !date || !description) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newTicket = await Ticket.create({
      studentId,
      fullName,
      subject,
      reason,
      date,
      description,
      status: 'Pending'
    });

    return res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
  } catch (error) {
    console.error('Ticket Creation Error:', error);
    return res.status(500).json({ message: 'Failed to create ticket', error: error.message });
  }
};



// GET /api/tickets?studentId=STU123
exports.getTickets = async (req, res) => {
  try {
    const { studentId } = req.query;

    let tickets;
    if (studentId) {
      tickets = await Ticket.findAll({ where: { studentId } });
    } else {
      tickets = await Ticket.findAll(); // Admin can fetch all
    }

    res.status(200).json({ tickets });
  } catch (error) {
    console.error('Fetch Tickets Error:', error);
    res.status(500).json({ message: 'Failed to fetch tickets', error: error.message });
  }
};


