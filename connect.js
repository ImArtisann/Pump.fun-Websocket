import { WebSocketClient } from './socket.js';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

function connectWithRetry(client, retries = 0) {
    client.connect();

    client.on('error', (error) => {
        console.error('Connection error:', error);

        if (error.message === 'timeout' && retries < MAX_RETRIES) {
            console.log(`Retrying connection in ${RETRY_DELAY / 1000} seconds... (Attempt ${retries + 1}/${MAX_RETRIES})`);
            setTimeout(() => connectWithRetry(client, retries + 1), RETRY_DELAY);
        } else if (retries >= MAX_RETRIES) {
            console.error('Max retries reached. Connection failed.');
        }
    });
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