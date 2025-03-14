const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/donate", async (req, res) => {
    const { amount, userId, remarks } = req.body;
    if (!amount || !userId) {
        return res.status(400).json({ error: "Missing donation amount or userId" });
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            metadata: { userId, remarks: remarks || "" },
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Error creating PaymentIntent:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
