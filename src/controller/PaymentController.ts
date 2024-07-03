import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from "dotenv";

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
// const stripeClient = new stripe(stripeSecretKey);

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10"
})


// function to create payment
export const createPaymentIntent = async (req: Request, res: Response) => {

  const {amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card']
    })

    res.status(200).json({client_secret: paymentIntent.client_secret});

  } catch (error) {
    console.error('Error creating payment intent', error);
    res.status(500).json({error: 'failed to create payment intent'})
  }
} 


