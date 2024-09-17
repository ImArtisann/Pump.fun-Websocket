import { WebSocketClient } from './socket.js';

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 seconds
const CONNECTION_TIMEOUT = 40000; // Failing Reconnection In Docker trying a longer wait time

function connectWithRetry(client, retries = 0) {
    console.log(`Attempting to connect to WebSocket server: ${client.url} (Attempt ${retries + 1}/${MAX_RETRIES})`);
    client.connect();

    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            if (!client.socket || !client.socket.connected) {
                console.error(`Connection attempt ${retries + 1} failed or timed out`);
                if (retries < MAX_RETRIES - 1) {
                    console.log(`Scheduling next retry in ${RETRY_DELAY / 1000} seconds...`);
                    setTimeout(() => resolve(connectWithRetry(client, retries + 1)), RETRY_DELAY);
                } else {
                    reject(new Error(`Max retries (${MAX_RETRIES}) reached. Connection failed.`));
                }
            }
        }, CONNECTION_TIMEOUT);

        client.socket.on('connect', () => {
            clearTimeout(timeoutId);
            console.log(`Successfully connected to WebSocket server on attempt ${retries + 1}`);
            resolve(client);
        });

        client.socket.on('connect_error', (error) => {
            clearTimeout(timeoutId);
            console.error(`Connection error on attempt ${retries + 1}:`, error);
            if (retries < MAX_RETRIES - 1) {
                console.log(`Scheduling next retry in ${RETRY_DELAY / 1000} seconds...`);
                setTimeout(() => resolve(connectWithRetry(client, retries + 1)), RETRY_DELAY);
            } else {
                reject(new Error(`Max retries (${MAX_RETRIES}) reached. Connection failed.`));
            }
        });
    });
}


export function subscribeToTradeCreated(callback) {
    const client = new WebSocketClient('tradeCreated', callback);
    return connectWithRetry(client);
}

export function subscribeToNewCoinCreated(callback) {
    const client = new WebSocketClient('newCoinCreated', callback);
    return connectWithRetry(client);
}