const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    pageTitle: { type: String, default: 'Contact Us – Let’s Connect!' },
    contactEmail: { type: String, default: 'info@jhapalisamajusa.org' },
    phone: { type: String, default: '+1 (123) 456-7890' },
    address: { type: String, default: '123 Charity Avenue, New York, NY 10001, USA' },
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
