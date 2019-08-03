import { Broker, Message } from "./index";

const testCommandTopic = "testCommand"

interface TestCommand extends Message {
    value: number
}

const testCommand = (value: number): TestCommand => {
    return { topic: testCommandTopic, value }
}

test("publish should forward messages to subscribers", () => {
    const broker = new Broker()
    const handleTestCommand = ({ value }: TestCommand) => {
        expect(value).toBe(1)
    }
    broker.subscribe(testCommandTopic, handleTestCommand)
    broker.publish(testCommand(1))
})

test("publish should accept messages even when there are no subscribers", () => {
    const broker = new Broker()
    broker.publish(testCommand(1))
})
