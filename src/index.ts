export interface Message {
    topic: string
}

// TODO: rename Broker to Bus?
// TODO: introduce a more sophisticated Broker with subject matching.

// export type Subscriber = <M extends Message>(message: M) => void
export type Subscriber = (message: any) => void

/** Broker mediates messages between publishers and subscribers. */
export class Broker {
    private subscribersByTopic = new Map<string, Subscriber[]>()

    public subscribe(topic: string, subscriber: Subscriber) {
        const subscribers = this.subscribersByTopic.get(topic) || []
        subscribers.push(subscriber)
        this.subscribersByTopic.set(topic, subscribers)
    }

    public unsubscribe(topic: string, subscriber: Subscriber) {
        const subscribers = this.subscribersByTopic.get(topic) || []
        const filteredSubscribers = subscribers.filter(s => s != subscriber)
        this.subscribersByTopic.set(topic, filteredSubscribers)
    }

    public publish<M extends Message>(message: M) {
        const subscribers = this.subscribersByTopic.get(message.topic)
        if (!subscribers) {
            return
        }
        for (const subscriber of subscribers) {
            subscriber(message)
        }
    }
}
