import {subscribeToNewCoinCreated, subscribeToTradeCreated} from "./connect.js";


subscribeToNewCoinCreated(data => {
    console.log(data)
})