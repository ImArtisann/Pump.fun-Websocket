import {subscribeToTradeCreated} from "./connect.js";


async function setupTradeSubscription() {
    try {
        const client = await subscribeToTradeCreated(data => {
            console.log(data);
        });
        console.log('Successfully subscribed to trade events');
    } catch (error) {
        console.error('Failed to subscribe to trade events:', error);
    }
}

setupTradeSubscription();