import Stripe from "stripe";

// const stripe = Stripe(process.env.STRIP_TEST_KEY);
const stripe = Stripe("sk_test_51KY8nOAwQQR2l8b3XE3yYsfwprKGeITXShJETy5aKNU3DyEvOdmsJmZvPLAmCkJ4ZMEuiW0BylMonje1VsTTc1V400nXLZG892")
export const makePayment = async (req, res) => {
  stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount * 100,
    currency: "aud"
  }, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).json(stripeErr)
    } else {
      res.status(200).json(stripeRes)
    }
  })
};
