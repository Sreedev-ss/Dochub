import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv'
import { DoctorApi } from '../services/doctorApi';
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2022-11-15'
});

const YOUR_DOMAIN = `http://localhost:${process.env.CLIENT_PORT}`;
const YOUR_SERVER = `http://localhost:${process.env.PORT}`;

const doctorApi = new DoctorApi()

const payment = async (req: Request, res: Response) => {
   try {
    const {appointmentId , fees } = req.body;
    const customer = await stripe.customers.create({
        metadata: {
            appointmentId:appointmentId
        }})
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "inr",
                    product_data: {
                      name: `Appointment`,
                    },
                    unit_amount: Number(fees) *100 ,
            },

        }

        ],
        customer:customer.id,
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

  
    res.json({ id: session.id,url:session.url });
   } catch (error) {
    console.log(error);
    res.status(402).json({message:error.message})
   }
};

const webhook = async (req: Request, res: Response) => {
    const event = req.body;
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          const paymentIntentId = session.payment_intent;
          const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
          const customer = await stripe.customers.retrieve(session.customer);
          let appointmentID = customer['metadata'].appointmentId
          let payment_intent = paymentIntent.id
          await doctorApi.updatePaymentStatus(payment_intent,appointmentID)
          break;
        default:
          break;
      }
      res.end();
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.sendStatus(500);
    }
  };

export { payment, webhook}