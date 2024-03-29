const keys = require('./../config/keys');

const router = require('express').Router();
const stripe = require('stripe')(keys.stripeSecretKey);

const { authenticate }  = require('./../middlewares/authenticate');

router.post('/api/stripe', authenticate, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    req.user.credits += 5;

    const user = await req.user.save();

    res.send(user);
});

module.exports = router;