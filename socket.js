import { io } from "socket.io-client";

export class WebSocketClient {
    constructor(eventType, callback, options = {}) {
        console.log(`Initializing WebSocketClient Event Type: ${eventType}`);
        this.url = 'https://frontend-api.pump.fun';
        this.eventType = eventType;
        this.callback = callback;
        this.options = {
            path: '/socket.io',
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 30000,
            ...options
        };
        this.socket = null;
    }

    connect() {
        console.log(`Attempting to connect to ${this.url}`);
        this.socket = io(this.url, this.options);

        this.socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        this.socket.on('connect', () => {
            console.log('Connected successfully');
            this.subscribeToEvent();
        });

        this.socket.on('disconnect', (reason) => {
            console.log(`Disconnected: ${reason}`);
        });

        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    }

    async subscribeToEvent() {
        console.log(`Subscribing to event: ${this.eventType}`);
        if (this.socket && this.socket.connected) {
            this.socket.on(this.eventType, (rawData) => {
                if (this.eventType === 'newCoinCreated') {
                    const parsedData = this.parseNewCoinCreatedData(rawData);
                    this.callback(parsedData);
                } else {
                    this.callback(rawData);
                }
            });
            this.socket.emit('subscribe', this.eventType);
            console.log(`Subscribed to ${this.eventType}`);
        } else {
            console.log('Socket not connected, unable to subscribe');
        }
    }

    parseNewCoinCreatedData(rawData) {
        try {
            const jsonData = JSON.parse(rawData.data.subscribe.data);
            return {
                mint: jsonData.payload.mint,
                name: jsonData.payload.name,
                symbol: jsonData.payload.symbol,
                description: jsonData.payload.description,
                image_uri: jsonData.payload.image_uri,
                metadata_uri: jsonData.payload.metadata_uri,
                twitter: jsonData.payload.twitter,
                telegram: jsonData.payload.telegram,
                bonding_curve: jsonData.payload.bonding_curve,
                associated_bonding_curve: jsonData.payload.associated_bonding_curve,
                creator: jsonData.payload.creator,
                raydium_pool: jsonData.payload.raydium_pool,
                virtual_sol_reserves: jsonData.payload.virtual_sol_reserves,
                virtual_token_reserves: jsonData.payload.virtual_token_reserves,
                hidden: jsonData.payload.hidden,
                total_supply: jsonData.payload.total_supply,
                website: jsonData.payload.website,
                show_name: jsonData.payload.show_name,
                last_trade_timestamp: jsonData.payload.last_trade_timestamp,
                king_of_the_hill_timestamp: jsonData.payload.king_of_the_hill_timestamp,
                market_cap: jsonData.payload.market_cap,
                nsfw: jsonData.payload.nsfw,
                market_id: jsonData.payload.market_id,
                inverted: jsonData.payload.inverted,
                real_sol_reserves: jsonData.payload.real_sol_reserves,
                livestream_ban_expiry: jsonData.payload.livestream_ban_expiry,
                last_reply: jsonData.payload.last_reply,
                reply_count: jsonData.payload.reply_count,
                is_banned: jsonData.payload.is_banned,
                is_currently_live: jsonData.payload.is_currently_live,
                initialized: jsonData.payload.initialized,
                usd_market_cap: jsonData.payload.usd_market_cap,
                created_timestamp: jsonData.payload.created_timestamp,
            };
        } catch (error) {
            console.error('Error parsing newCoinCreated data:', error);
            return rawData;
        }
    }

    disconnect() {
        console.log('Disconnecting socket');
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
