import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders (with filters)
router.get('/', async (req, res) => {
    try {
        const { status, agentId } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (agentId) filter.agentId = agentId;

        const orders = await Order.find(filter)
            .populate('contactId', 'name phone email')
            .populate('agentId', 'name')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update order status
router.put('/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const update = {};
        if (status) update.status = status;
        if (notes !== undefined) update.notes = notes;

        const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
