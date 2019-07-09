/** Broker mediates messages between publishers and subscribers. */
class Broker {
    constructor() {
        this.subscribersByTopic = new Map();
    }
    subscribe(topic, subscriber) {
        const subscribers = this.subscribersByTopic.get(topic) || [];
        subscribers.push(subscriber);
        this.subscribersByTopic.set(topic, subscribers);
    }
    unsubscribe(topic, subscriber) {
        const subscribers = this.subscribersByTopic.get(topic) || [];
        const index = subscribers.indexOf(subscriber);
        if (index > 0)
            subscribers.splice(index, 1);
        this.subscribersByTopic.set(topic, subscribers);
    }
    publish(message) {
        const subscribers = this.subscribersByTopic.get(message.topic);
        if (!subscribers) {
            return;
        }
        for (const subscriber of subscribers) {
            subscriber(message);
        }
    }
}

export { Broker };
