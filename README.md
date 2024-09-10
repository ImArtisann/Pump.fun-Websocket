To Install npm install npm install @imartisann/pumpwebsockets@1.0.3

To subscribe to trades created
```javascript
import {subscribeToTradeCreated} from "@imartisann/pumpwebsockets"

subscribeToTradeCreated(data =>{
    console.log(data)
})
```
![tradeCreated](https://imgur.com/Xjl3Tbf.png)

To subscribe to new coins created
```javascript
import {subscribeToNewCoinCreated} from "@imartisann/pumpwebsockets"

subscribeToNewCoinCreated(data =>{
    console.log(data)
})
```
![coinCreated](https://imgur.com/HaGM1es.png)