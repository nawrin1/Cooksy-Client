/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */

// "use client"
// import { createPayment } from "@/src/services/AuthService";
// import { Button } from "@nextui-org/button";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";




// interface ErrorMessage {
//   path: string;
//   message: string;
// }

// interface FetchBaseQueryError {
//   data?: {
//     errorMessages: ErrorMessage[];
//   };
// }


// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState("");
// //   const [createPayment] = useCreatePaymentMutation(undefined);
//   const [transactionId, setTransactionId] = useState("");
//   const [clientSecret, setClientSecret] = useState("");


//   const price = { price: 19 };



 
//   useEffect(() => {
//     const fetchPayment = async () => {
//       try {
//         const res = await createPayment(price);

//         console.log("Payment response:", res);
//         setClientSecret(res.data.clientSecret);
//       } catch (error) {
//         console.error("Error creating payment:", error);
//         // Handle the error here
//       }
//     };

//     fetchPayment();
//   }, []);
//   console.log(clientSecret);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const toastId = toast.loading("Payment creating..");

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     if (card === null) {
//       return;
//     }
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("payment error", error);
//       setError(error.message as string);
//     } else {
//       console.log("payment method", paymentMethod);
//       setError("");
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//         //   billing_details: {
//         //     name: user?.user_email || "anonymous",
//         //   },
//         },
//       });

//     if (confirmError) {
//       console.log("confirm error");
//     } else {
//       console.log("payment intent", paymentIntent);
//       if (paymentIntent.status === "succeeded") {
//         console.log("transaction id", paymentIntent.id);
//         setTransactionId(paymentIntent.id);
       

//         }
      
//           toast.success("You have been upgraded to premium", { id: toastId, duration: 2000 });
         
        
//       }
//     }
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               fontFamily:"Peyda",
//               color: "black",
//               "::placeholder": {
//                 color: "black",
//               },
//             },
//             invalid: {
//               color: "#9e2146",
//             },
//           },
//         }}
//       />
//       <Button
//         className="btn btn-outline  mt-10 w-full text-xl font-Peyda"
//         disabled={!stripe || !clientSecret}
//         type="submit"
//       >
//         Confirm Payment
//       </Button>
//       <p className="text-red-600 font-Peyda">{error}</p>
//       {transactionId && (
//         <p className="text-green-600 font-Peyda"> Your transaction id: {transactionId}</p>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;


"use client"
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { createPayment, getUser, getUserFromDB } from "@/src/services/AuthService";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
 



  useEffect(() => {
    const fetchPayment = async () => {
    const user=await getUser()
   
    console.log(user,"user")
    const price = { price: 19,user:user?._id };

      try {
        const res = await createPayment(price);
        console.log(res.data)

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment:", error);
      }
    };

    fetchPayment();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Processing payment...");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message || "Payment error occurred.");
      setLoading(false);
      toast.error("Payment failed.", { id: toastId });
    } else {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      if (confirmError) {
        setError(confirmError.message || "Error confirming payment.");
        setLoading(false);
        toast.error("Payment confirmation failed.", { id: toastId });
      } else if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        toast.success("Payment successful!", { id: toastId });
      }

      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-gray-red shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-2 font-Peyda">Premium Membership</h2>
      <p className="text-gray-500 mb-4 text-sm">Upgrade to premium for only $19.</p>
      
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="bg-white p-3 rounded-md shadow-sm mb-3">
          <CardElement
            className="p-2 border rounded-md"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontFamily: "Peyda",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e3342f",
                },
              },
            }}
          />
        </div>
        <Button
          className="w-full text-lg font-Peyda bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition-all"
          disabled={!stripe || !clientSecret || loading}
          type="submit"
        >
          {loading ? <Spinner /> : "Confirm Payment"}
        </Button>
      </form>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      {transactionId && (
        <p className="text-green-600 mt-2 text-sm">
          Success! Transaction ID: <span className="font-mono">{transactionId}</span>
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
