/* eslint-disable prettier/prettier */

"use client"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';



const Payment = () => {
  
    
    // console.log(process.env.NEXT_PUBLIC_STRIPE)
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE as string);
    // console.log(stripePromise)
  
    return (
        <div className="flex  lg:flex-row  text-white  justify-center items-center p-2">
            
            

            {/* Payment Form */}
            <div className="flex flex-col justify-center items-center w-full  p-4 lg:p-8 animate-fade-in-up font-Peyda">
                <h2 className="text-white font-serif text-center font-semibold mb-4">Payment Process</h2>
                <div className="w-full  bg-white rounded-lg p-6 shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
