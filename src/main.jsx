import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom/client';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import App from './App.jsx';
// import axios from 'axios';
// import { API_URL } from './config.js';

// const AppWithStripe = () => {
//     const [stripePromise, setStripePromise] = useState(null);

//     useEffect(() => {
//         // Fetch the publishable key from the server
//         const fetchStripeApiKey = async () => {
//             try {
//                 const response = await axios.get(` ${API_URL}/stripeapi`); // Adjust the URL as needed                
//                 // Initialize Stripe with the publishable key
//                 const stripe = await loadStripe(response.data.stripeApiKey);
//                 setStripePromise(stripe);
//             } catch (error) {
//                 console.error('Error fetching Stripe API key:', error);
//             }
//         };

//         fetchStripeApiKey();
//     }, []);

//     // Only render the App component wrapped with Elements if stripePromise is ready
//     if (!stripePromise) {
//         return <div>Loading...</div>; // You can customize this loading state
//     }

//     return (
//         <Elements stripe={stripePromise}>
//             <App />
//         </Elements>
//     );
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <AppWithStripe />
//     </React.StrictMode>,
// );
