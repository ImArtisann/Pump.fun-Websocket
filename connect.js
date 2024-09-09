import { WebSocketClient } from './socket.js';

export function subscribeToTradeCreated(callback) {
    const client = new WebSocketClient( 'tradeCreated', callback);
    client.connect();
    return client;
}

export function subscribeToNewCoinCreated(callback) {
    const client = new WebSocketClient( 'newCoinCreated', callback);
    client.connect();
    return client;
}