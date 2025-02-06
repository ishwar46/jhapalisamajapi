const mongoose = require('mongoose')

const heroSlideSchema = new mongoose.Schema(
    {
        title: {
            type: String, required: true
        },
        subtitle: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('HeroSlide', heroSlideSchema);