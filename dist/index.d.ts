export interface Message {
    topic: string;
}
export declare type Subscriber = (message: any) => void;
/** Broker mediates messages between publishers and subscribers. */
export declare class Broker {
    private subscribersByTopic;
    subscribe(topic: string, subscriber: Subscriber): void;
    unsubscribe(topic: string, subscriber: Subscriber): void;
    publish<M extends Message>(message: M): void;
}
