
const mongoose = require('mongoose');

const hospitalDetailSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },
  numberOfDoctors: {
    type: Number,
    default: 0
  },
  numberOfDepartments: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const HospitalDetail = mongoose.model('HospitalDetail', hospitalDetailSchema);

module.exports = HospitalDetail;
