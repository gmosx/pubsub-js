import { Broker, Message } from "./index";

class TestCommand implements Message {
    static topic = "TestCommand"
    public topic = TestCommand.topic
    constructor(public value: number) {
    }
}

test("publish should forward messages to subscribers", () => {
    const broker = new Broker()
    const handleTestCommand = ({ value }: TestCommand) => {
        expect(value).toBe(1)
    }
    broker.subscribe(TestCommand.topic, handleTestCommand)
    broker.publish(new TestCommand(1))
    broker.unsubscribe(TestCommand.topic, handleTestCommand)
})

test("publish should accept messages even when there are no subscribers", () => {
    const broker = new Broker()
    broker.publish(new TestCommand(1))
})
