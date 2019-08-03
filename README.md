# PubSub

Publish-Subscribe messaging for Web applications.

## Description

`Pubsub` implements a 'uni-directional' message broker, in the spirit of the [Flux Application Architecture](https://facebook.github.io/flux/). Unlike `Flux`, `pubsub` solves only one problem, messaging, while leaving state management to the user. Moreover, `pubsub` supports fine-grained subscription of listeners to specific topics.

While `pubsub` is agnostic to the nature and payload of the messages that flow through the broker, the user is encouraged to differentiate between two different kinds of messages:

* Command - the message will trigger a state mutation
* Event - the message acknowledges a state transition

By convention, Command message names are imperative, e.g. `DeleteCommentCommand`, `SignInCommand`, etc. Event message names, on the other hand, are in the past tense, e.g. `CommentDeletedEvent`, `SignedInEvent`, etc.

## Example

```ts
class RemoveCommentCommand implements Message {
    static topic = "RemoveCommentCommand"
    public topic = RemoveCommentCommand.topic
    constructor(public commentID: number) {
    }
}

class CommentStoreChangedEvent implements Message {
    static topic = "CommentStoreChangedEvent"
    public topic = CommentStoreChangedEvent.topic
    constructor(public commentStore: CommentStore) {
    }
}

const broker = new Broker()

broker.subscribe(RemoveCommentCommand.topic, handleRemoveCommentCommand)
broker.publish(new RemoveCommentCommand(1))

const handleRemoveCommentCommand = (command: RemoveCommentCommand) => {
    commentStore.remove(command.commentID)
    broker.publish(new CommentStoreChangedEvent(commentStore)) 
}

broker.unsubscribe(RemoveCommentCommand.topic, handleRemoveCommentCommand)
```

## FAQ

## Why doesn't `pubsub` use Observables, Subjects, Subscriptions, etc (e.g. RxJS)

We prefer to keep `pubsub` simple and lean, while avoiding npm dependency hell.

## Why use `pubsub` over `Redux`

Similar to `Flux`, `Redux` intertwines messaging and state management. Moreover, in the author's opinion, it's significantly more complicated and promotes the usage of functional programming patterns that are not fit (or required) in typical JavaScript front-end development. Finally, `Redux` doesn't play well with TypeScript typings.

Instead, `pubsub` offers a simple solution to a specific problem.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## Contact

[@gmosx](https://twitter.com/gmosx) on Twitter.

## License

MIT, see [LICENSE](./LICENSE) file for details.

Copyright © 2019 George Moschovitis.
