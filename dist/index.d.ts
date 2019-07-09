export interface Message {
    type: string;
}
export declare type Subscriber = (message: Message) => void;
/** Broker mediates messages between publishers and subscribers. */
export declare class Broker {
    private subscribersByMessageType;
    subscribe(messageType: string, subscriber: Subscriber): void;
    unsubscribe(messageType: string, subscriber: Subscriber): void;
    publish(message: Message): void;
}
