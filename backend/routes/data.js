const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/sync', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    return res.json({ user });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur de synchronisation.' });
  }
});

router.put('/day', auth, async (req, res) => {
  try {
    const { date, dayData } = req.body;
    if (!date || !dayData) {
      return res.status(400).json({ error: 'Date et données du jour requises.' });
    }

    const user = await User.findById(req.userId);
    user.days.set(date, dayData);
    user.updatedAt = new Date();
    await user.save();

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la sauvegarde du jour.' });
  }
});

router.put('/week', auth, async (req, res) => {
  try {
    const { weekNum, weekData } = req.body;
    if (!weekNum || !weekData) {
      return res.status(400).json({ error: 'Semaine et données requises.' });
    }

    const user = await User.findById(req.userId);
    user.weeks.set(String(weekNum), weekData);
    user.updatedAt = new Date();
    await user.save();

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la sauvegarde de la semaine.' });
  }
});

router.post('/measure', auth, async (req, res) => {
  try {
    const { w, t, h, a } = req.body;
    const user = await User.findById(req.userId);
    user.measures.push({ w, t, h, a, date: new Date() });
    user.updatedAt = new Date();
    await user.save();
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de l\'ajout de la mesure.' });
  }
});

router.put('/stats', auth, async (req, res) => {
  try {
    const fields = ['totalXP', 'maxStreak', 'morningCnt', 'zeroDays', 'water8', 'breathCnt', 'kgLost', 'earnedBadges', 'acts'];
    const user = await User.findById(req.userId);

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    user.updatedAt = new Date();
    await user.save();
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur lors de la mise à jour des statistiques.' });
  }
});

module.exports = router;
