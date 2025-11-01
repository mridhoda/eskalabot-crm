import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export async function attachUser(req, res, next) {
  if (!req.user?.id) return res.status(401).json({ error: 'Unauthorized' });
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ error: 'User not found' });
  req.me = user;
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.me) return res.status(401).json({ error: 'Unauthorized' });
    if (!roles.includes(req.me.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  }
}