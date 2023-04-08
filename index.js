/**
 * @typedef {import("./index.js").Subscriber} Subscriber
 * @typedef {import("./index.js").UnsubscribeFunction} UnsubscribeFunction
 */

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
     * @template {M extends Message}
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
