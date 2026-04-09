const mongoose = require('mongoose');

const adminScheduleSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Admin user is required'],
      unique: true 
    },
    schedule: {

      monday: {
        isWorking: { type: Boolean, default: true },
        startTime: { type: String, default: '09:00' }, // HH:MM format
        endTime: { type: String, default: '17:00' }
      },
      tuesday: {
        isWorking: { type: Boolean, default: true },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '17:00' }
      },
      wednesday: {
        isWorking: { type: Boolean, default: true },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '17:00' }
      },
      thursday: {
        isWorking: { type: Boolean, default: true },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '17:00' }
      },
      friday: {
        isWorking: { type: Boolean, default: true },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '17:00' }
      },
      saturday: {
        isWorking: { type: Boolean, default: true },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '17:00' }
      },
      sunday: {
        isWorking: { type: Boolean, default: false },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '17:00' }
      }
    },
    slotDuration: {
      type: Number,
      default: 30
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('AdminSchedule', adminScheduleSchema);
