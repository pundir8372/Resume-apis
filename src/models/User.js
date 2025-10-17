const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    location: String,
    summary: String
  },
  achievements: [{
    type: { type: String, enum: ['internship', 'course', 'hackathon', 'project'] },
    title: String,
    organization: String,
    description: String,
    skills: [String],
    startDate: Date,
    endDate: Date,
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  resume: {
    template: { type: String, default: 'modern' },
    sections: {
      showEducation: { type: Boolean, default: true },
      showExperience: { type: Boolean, default: true },
      showProjects: { type: Boolean, default: true },
      showSkills: { type: Boolean, default: true }
    },
    lastGenerated: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
