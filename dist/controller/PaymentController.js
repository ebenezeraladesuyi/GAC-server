"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
// const stripeClient = new stripe(stripeSecretKey);
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10"
});
// function to create payment
const createPaymentIntent = async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ['card']
        });
        res.status(200).json({ client_secret: paymentIntent.client_secret });
    }
    catch (error) {
        console.error('Error creating payment intent', error);
        res.status(500).json({ error: 'failed to create payment intent' });
    }
};
exports.createPaymentIntent = createPaymentIntent;
