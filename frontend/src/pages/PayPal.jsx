import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from "../context/Context";
import { loadScript } from "@paypal/paypal-js";

export default function PayPal() {
    const paypal = useRef();
    const { getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    useEffect(()=> {
        loadScript({ clientId: "AYPVVS3Wu8Ipzf0fZEmYfXBAqb4I1QxVKWck_QfFWC1LE-JgjTGZ9k33kLkGAat6hADuH644sVvDJE4D", currency: "USD", components: ["buttons", "marks", "messages"] })
        .then((paypalSdk) => {
            paypalSdk
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "Cool looking product",
                                    amount: {
                                        currency_code: "USD",
                                        value: totalAmount
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log(order);
                    },
                    onError: (err) => {
                        console.log(err);
                    }
                })
                .render(paypal.current)
                .catch((error) => {
                    console.error("failed to render the PayPal Buttons", error);
                });
            })
            .catch((error) => {
            console.error("failed to load the PayPal JS SDK script", error);
        });
    })
    return (
        <div ref={paypal}></div>
        );
    }