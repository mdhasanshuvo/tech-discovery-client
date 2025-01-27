import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('');
const Payment = () => {
    return (
        <div>
            <h2 className="text-2xl text-center">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>

                </Elements>
            </div>
        </div>
    );
};
export default Payment;