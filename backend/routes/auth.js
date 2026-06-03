const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

function signToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '90d' });
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    profile: user.profile,
    startDate: user.startDate,
    totalXP: user.totalXP,
    maxStreak: user.maxStreak,
    morningCnt: user.morningCnt,
    zeroDays: user.zeroDays,
    water8: user.water8,
    breathCnt: user.breathCnt,
    kgLost: user.kgLost,
    earnedBadges: user.earnedBadges,
    acts: user.acts,
    days: user.days,
    weeks: user.weeks,
    measures: user.measures
  };
}

router.post('/register', async (req, res) => {
  try {
    const { name, code, profile } = req.body;

    if (!name || !code || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: 'Le prénom et un code personnel à 6 chiffres sont requis.' });
    }

    const existing = await User.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ error: 'Un profil existe déjà avec ce prénom.' });
    }

    const hashed = await bcrypt.hash(code, 10);
    const user = await User.create({
      name: name.trim(),
      code: hashed,
      profile: profile || {}
    });

    const token = signToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la création du compte.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: 'Prénom et code personnel requis.' });
    }

    const user = await User.findOne({ name: name.trim() });
    if (!user) {
      return res.status(404).json({ error: 'Aucun profil trouvé avec ce prénom.' });
    }

    const ok = await bcrypt.compare(code, user.code);
    if (!ok) {
      return res.status(401).json({ error: 'Code personnel incorrect.' });
    }

    const token = signToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    return res.json({ user: sanitizeUser(user) });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la récupération du profil.' });
  }
});

module.exports = router;
