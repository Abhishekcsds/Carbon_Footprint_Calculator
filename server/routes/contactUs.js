import express from "express";
import { query } from '../config/db.js';

const router = express.Router();

// Route: /api/contact/send - Saves a message from the contact form
router.post('/send', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        await query(
            'INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)',
            [name, email, message]
        );
        
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error in contact form:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

export default router;