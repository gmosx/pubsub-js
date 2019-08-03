# PubSub

Publish-Subscribe messaging for Web applications.

## Description

`Pubsub` implements a 'uni-directional` message broker, in the spirit of the [Flux Application Architecture](https://facebook.github.io/flux/). Unlike `Flux`, `pubsub` solves only one problem, messaging, while leaving state management to the user. Moreover, `pubsub` supports fine-grained subscription of listeners to specific topics.

While `pubsub` is agnostic to the nature and payload of the messages that flow through the broker, the user is encouraged to differentiate between two different kinds of messages:

* Command - the message will trigger a state mutation
* Event - the message acknowledges a state transition

## Example

```ts
const removeCommentCommandTopic = "deleteComment"

interface RemoveCommentCommand extends Message {
    commentID: number
}

const removeCommentCommand = (commentID: number): RemoveCommentCommand => {
    return { topic: removeCommentCommandTopic, commentID }
}

const broker = new Broker()

broker.subscribe(removeCommentCommandTopic, handleRemoveCommentCommand)
broker.publish(removeCommentCommand(1))

const handleRemoveCommentCommand = (command: RemoveCommentCommand) => {
    commentStore.remove(command.commentID)
}
```

## FAQ

## Why doesn't `pubsub` use Observables, Subjects, Subscriptions, etc (e.g. RxJS)

We prefer to keep `pubsub` simple and lean, while avoiding npm dependency hell.

## Why use `pubsub` over `Redux`

Similar to `Flux`, `Redux` intertwines messaging and state management. Moreover, in the author's opinion, it's significantly more complicated and promotes the usage of functional programming patterns that are not fit (or required) in typical JavaScript front-end development. Finally, `Redux` doesn't play well with TypeScript typings.

Instead, `pubsub` offers a simple solution to a specific problem.
