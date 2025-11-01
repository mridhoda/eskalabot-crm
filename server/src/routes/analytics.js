import express from 'express'
import Message from '../models/Message.js'
import Chat from '../models/Chat.js'
import { authRequired, attachUser } from '../middleware/auth.js'

const router = express.Router()

// /analytics/traffic?groupBy=day|week
router.get('/traffic', authRequired, attachUser, async (req, res) => {
  try {
    const groupBy = (req.query.groupBy || 'day').toLowerCase()

    const base = [
      { $lookup: { from: 'chats', localField: 'chatId', foreignField: '_id', as: 'chat' } },
      { $unwind: '$chat' },
      { $match: { 'chat.userId': req.me._id } },
    ]

    let pipeline
    if (groupBy === 'week') {
      pipeline = base.concat([
        { $group: { _id: { y: { $isoWeekYear: '$createdAt' }, w: { $isoWeek: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { '_id.y': 1, '_id.w': 1 } }
      ])
    } else {
      pipeline = base.concat([
        { $group: { _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' }, d: { $dayOfMonth: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { '_id.y': 1, '_id.m': 1, '_id.d': 1 } }
      ])
    }

    const rows = await Message.aggregate(pipeline)
    res.json(rows)
  } catch (err) {
    console.error('Analytics error:', err)
    res.status(500).json({ error: 'Analytics pipeline failed', detail: err.message })
  }
})

router.get('/platforms', authRequired, attachUser, async (req, res) => {
  try {
    const pipeline = [
      { $lookup: { from: 'chats', localField: 'chatId', foreignField: '_id', as: 'chat' } },
      { $unwind: '$chat' },
      { $match: { 'chat.userId': req.me._id } },
      { $lookup: { from: 'platforms', localField: 'chat.platformId', foreignField: '_id', as: 'platform' } },
      { $unwind: '$platform' },
      { $group: { _id: '$platform.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]

    const rows = await Message.aggregate(pipeline)
    res.json(rows)
  } catch (err) {
    console.error('Analytics error:', err)
    res.status(500).json({ error: 'Analytics pipeline failed', detail: err.message })
  }
})

router.get('/agents', authRequired, attachUser, async (req, res) => {
  try {
    const pipeline = [
      { $lookup: { from: 'chats', localField: 'chatId', foreignField: '_id', as: 'chat' } },
      { $unwind: '$chat' },
      { $match: { 'chat.userId': req.me._id } },
      { $lookup: { from: 'agents', localField: 'chat.agentId', foreignField: '_id', as: 'agent' } },
      { $unwind: '$agent' },
      { $group: { _id: '$agent.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]

    const rows = await Message.aggregate(pipeline)
    res.json(rows)
  } catch (err) {
    console.error('Analytics error:', err)
    res.status(500).json({ error: 'Analytics pipeline failed', detail: err.message })
  }
})

router.get('/chats-by-day', authRequired, attachUser, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const pipeline = [
      {
        $match: {
          userId: req.me._id,
          createdAt: {
            $gte: yesterday,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const rows = await Chat.aggregate(pipeline);
    
    // Ensure both today and yesterday are present in the result
    const result = {
      [today.toISOString().split('T')[0]]: 0,
      [yesterday.toISOString().split('T')[0]]: 0,
    };

    rows.forEach(row => {
      result[row._id] = row.count;
    });

    res.json({
      labels: Object.keys(result),
      data: Object.values(result),
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Analytics pipeline failed', detail: err.message });
  }
});

export default router
