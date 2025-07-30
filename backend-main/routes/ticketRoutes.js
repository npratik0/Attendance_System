// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket);

router.get('/', ticketController.getTickets);

module.exports = router;
