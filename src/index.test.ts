import { Broker, Message } from "./index";

interface TestMessage extends Message {
    value: number
}

test("publish should forwanrd messages to subscribers", () => {
    const broker = new Broker()
    const subscriber = (message: TestMessage) => {
        expect(message.value).toBe(1)
    }
    broker.subscribe("test", subscriber)
    broker.publish({ topic: "test", value: 1 })
})

test("publish should accept messages even when there are no subscribers", () => {
    const broker = new Broker()
    broker.publish({ topic: "test", value: 1 })
})
