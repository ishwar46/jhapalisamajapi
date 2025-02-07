const mongoose = require('mongoose');

const testimonialItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, default: '' },
    image: { type: String, default: '' },
    rating: { type: Number, default: 5 },
    quote: { type: String, default: '' },
});

const testimonialsPageSchema = new mongoose.Schema({
    pageTitle: { type: String, default: 'Testimonials – Voices of Impact' },
    pageSubtitle: { type: String, default: 'What People Say About Us' },
    pageDescription: { type: String, default: 'At Jhapali Samaj USA, our work would not be possible without the generosity and commitment of donors, volunteers, and partner organizations. Their unwavering support has helped us provide education, healthcare, and disaster relief to thousands in Nepal.' },
    testimonials: [testimonialItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('TestimonialsPage', testimonialsPageSchema);
