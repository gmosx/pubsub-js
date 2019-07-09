/** Broker mediates messages between publishers and subscribers. */
class Broker {
    constructor() {
        this.subscribersByMessageType = new Map();
    }
    subscribe(messageType, subscriber) {
        const subscribers = this.subscribersByMessageType.get(messageType) || [];
        subscribers.push(subscriber);
        this.subscribersByMessageType.set(messageType, subscribers);
    }
    unsubscribe(messageType, subscriber) {
        const subscribers = this.subscribersByMessageType.get(messageType) || [];
        const index = subscribers.indexOf(subscriber);
        if (index > 0)
            subscribers.splice(index, 1);
        this.subscribersByMessageType.set(messageType, subscribers);
    }
    publish(message) {
        const subscribers = this.subscribersByMessageType.get(message.type);
        if (!subscribers) {
            return;
        }
        for (const subscriber of subscribers) {
            subscriber(message);
        }
    }
}

export { Broker };
