const mongoose = require('mongoose')

const familyMemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  generation: {
    type: Number,
    required: true
  },
  familyTree: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('FamilyMember', familyMemberSchema)
