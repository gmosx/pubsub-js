import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";

import { Broker } from "./index.js";

class TestCommand {
    static topic = "TestCommand";
    topic = TestCommand.topic;

    /**
     * @type {number}
     */
    value;

    /**
     * @param {number} value
     */
    constructor(value) {
        this.value = value;
    }
}

Deno.test("publish should forward messages to subscribers", () => {
    const broker = new Broker()
    const handleTestCommand = ({ value }) => {
        assertEquals(value, 1);
    }
    broker.subscribe(TestCommand.topic, handleTestCommand)
    broker.publish(new TestCommand(1))
    broker.unsubscribe(TestCommand.topic, handleTestCommand)
})

Deno.test("publish should accept messages even when there are no subscribers", () => {
    const broker = new Broker()
    broker.publish(new TestCommand(1))
})
