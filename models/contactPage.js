const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    pageTitle: { type: String, default: 'Contact Us – Let’s Connect!' },
    contactEmail: { type: String, default: 'info@jhapalisamajusa.org' },
    phone: { type: String, default: '' },
    address: { type: String, default: '900 Ballou St Herndon VA 20170, Virginia, USA' },
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
