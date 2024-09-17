To Install npm install npm install @imartisann/pumpwebsockets@latest

To subscribe to trades created
```javascript
import {subscribeToTradeCreated} from "@imartisann/pumpwebsockets"

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
```
![tradeCreated](https://imgur.com/Xjl3Tbf.png)

To subscribe to new coins created
```javascript
import {subscribeToNewCoinCreated} from "@imartisann/pumpwebsockets"

async function subscribeToNewCoinSubscription() {
    try {
        const client = await subscribeToNewCoinCreated(data => {
            console.log(data);
        });
        console.log('Successfully subscribed to trade events');
    } catch (error) {
        console.error('Failed to subscribe to trade events:', error);
    }
}

subscribeToNewCoinSubscription();
```
![coinCreated](https://imgur.com/HaGM1es.png)
