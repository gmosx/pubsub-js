export interface Message {
    type: string
}

// TODO: type -> topic? topic outside of message?
// TODO: introduce a more sophisticated Broker with subject matching.

export type Subscriber = (message: Message) => void

/** Broker mediates messages between publishers and subscribers. */
export class Broker {
    private subscribersByMessageType = new Map<string, Subscriber[]>()

    public subscribe(messageType: string, subscriber: Subscriber) {
        const subscribers = this.subscribersByMessageType.get(messageType) || []
        subscribers.push(subscriber)
        this.subscribersByMessageType.set(messageType, subscribers)
    }

    public unsubscribe(messageType: string, subscriber: Subscriber) {
        const subscribers = this.subscribersByMessageType.get(messageType) || []
        const index = subscribers.indexOf(subscriber)
        if (index > 0) subscribers.splice(index, 1)
        this.subscribersByMessageType.set(messageType, subscribers)
    }

    public publish(message: Message) {
        const subscribers = this.subscribersByMessageType.get(message.type)
        if (!subscribers) {
            return
        }
        for (const subscriber of subscribers) {
            subscriber(message)
        }
    }
}
