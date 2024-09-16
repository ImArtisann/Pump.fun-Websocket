import { WebSocketClient } from './socket.js';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

function connectWithRetry(client, retries = 0) {
    client.connect();

    setTimeout(() => {
        if (!client.socket || !client.socket.connected) {
            console.error('Connection failed or timed out');

            if (retries < MAX_RETRIES) {
                console.log(`Retrying connection in ${RETRY_DELAY / 1000} seconds... (Attempt ${retries + 1}/${MAX_RETRIES})`);
                setTimeout(() => connectWithRetry(client, retries + 1), RETRY_DELAY);
            } else {
                console.error('Max retries reached. Connection failed.');
            }
        }
    }, client.options.timeout || 20000);
}

export function subscribeToTradeCreated(callback) {
    const client = new WebSocketClient( 'tradeCreated', callback);
    connectWithRetry(client);
    return client;
}

export function subscribeToNewCoinCreated(callback) {
    const client = new WebSocketClient( 'newCoinCreated', callback);
    connectWithRetry(client);
    return client;
}