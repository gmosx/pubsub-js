/**
 * @typedef {import("./types.d.ts").Message} Message
 * @typedef {import("./types.d.ts").Subscriber} Subscriber
 * @typedef {import("./types.d.ts").UnsubscribeFunction} UnsubscribeFunction
 */

// #TODO consider message buffering.
// #TODO consider generator* method: const topic = broker.subscribe("example-topic");

/**
 * Broker mediates messages between publishers and subscribers.
 */
export class Broker {
    /**
     * @type {Map<string, Array<Subscriber>>}
     */
    #subscribersByTopic;

    constructor() {
        this.#subscribersByTopic = new Map();
    }

    /**
     * @param {string} topic
     * @param {Subscriber} subscriber
     * @returns {UnsubscribeFunction}
     */
    subscribe(topic, subscriber) {
        const subscribers = this.#subscribersByTopic.get(topic) || [];
        subscribers.push(subscriber);
        this.#subscribersByTopic.set(topic, subscribers);

        return () => {
            this.unsubscribe(topic, subscriber);
        };
    }

    /**
     * @param {string} topic
     * @param {Subscriber} subscriber
     */
    unsubscribe(topic, subscriber) {
        const subscribers = this.#subscribersByTopic.get(topic) || [];
        const filteredSubscribers = subscribers.filter((s) => s != subscriber);
        this.#subscribersByTopic.set(topic, filteredSubscribers);
    }

    /**
     * @template {Message} M
     * @param {M} message
     */
    publish(message) {
        const subscribers = this.#subscribersByTopic.get(message.topic);

        if (!subscribers) {
            return;
        }

        for (const subscriber of subscribers) {
            subscriber(message);
        }
    }
}
