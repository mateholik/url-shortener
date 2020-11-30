const mongoose = require('mongoose')
const shortId = require('shortid')

const urlSchema = new mongoose.Schema({
  full: {
    type: 'string',
    required: true
  },
  short: {
    type: 'string',
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: 'number',
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('url', urlSchema)