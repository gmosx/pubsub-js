export interface Message {
  topic: string;
}

export type Subscriber = (message: any) => void;

export type UnsubscribeFunction = () => void;

export declare class Broker {
  private subscribersByTopic;
  subscribe(topic: string, subscriber: Subscriber): UnsubscribeFunction;
  unsubscribe(topic: string, subscriber: Subscriber): void;
  publish<M extends Message>(message: M): void;
}
