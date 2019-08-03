import { Broker, Message } from "./index";

interface TestCommand extends Message {
    value: number
}

const makeTestCommand = (value: number): TestCommand => {
    return { topic: "test", value }
}

test("publish should forward messages to subscribers", () => {
    const broker = new Broker()
    const subscriber = (message: TestCommand) => {
        expect(message.value).toBe(1)
    }
    broker.subscribe("test", subscriber)
    broker.publish(makeTestCommand(1))
})

test("publish should accept messages even when there are no subscribers", () => {
    const broker = new Broker()
    broker.publish({ topic: "test", value: 1 })
})
