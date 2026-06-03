const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true },
  profile: {
    age: Number,
    height: Number,
    weight: Number,
    goalWeight: Number,
    level: { type: String, enum: ['beginner', 'moderate', 'active', 'athlete'], default: 'moderate' },
    activities: [String],
    sugarLevel: { type: String, enum: ['0-1', '2-3', '4+'], default: '2-3' },
    snackLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    stressLevel: { type: Number, min: 1, max: 10, default: 5 },
    sleepLevel: { type: Number, min: 1, max: 10, default: 5 },
    painZones: [String],
    mainGoal: { type: String, enum: ['weight', 'health', 'perf', 'stress'], default: 'health' },
    daysPerWeek: { type: Number, min: 3, max: 7, default: 4 }
  },
  startDate: { type: Date, default: Date.now },
  totalXP: { type: Number, default: 0 },
  maxStreak: { type: Number, default: 0 },
  morningCnt: { type: Number, default: 0 },
  zeroDays: { type: Number, default: 0 },
  water8: { type: Number, default: 0 },
  breathCnt: { type: Number, default: 0 },
  kgLost: { type: Number, default: 0 },
  earnedBadges: [String],
  acts: { type: Map, of: Number, default: {} },
  days: { type: Map, of: Schema.Types.Mixed, default: {} },
  weeks: { type: Map, of: Schema.Types.Mixed, default: {} },
  measures: [{
    date: { type: Date, default: Date.now },
    w: Number,
    t: Number,
    h: Number,
    a: Number
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
