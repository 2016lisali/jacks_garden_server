import Stripe from "stripe";

// const stripe = Stripe(process.env.STRIP_TEST_KEY);
const stripe = Stripe(process.env.STRIPE_TEST_KEY);
export const makePayment = async (req, res) => {
    if (req.body.amount <= 2000) {
        stripe.charges.create(
            {
                source: req.body.tokenId,
                amount: Math.round(req.body.amount * 100),
                currency: "aud",
            },
            (stripeErr, stripeRes) => {
                if (stripeErr) {
                    res.status(500).json(stripeErr);
                } else {
                    res.status(200).json(stripeRes);
                }
            }
        );
    } else {
        res.status(400).json("The order amount cannot be over 2000.");
    }
};
