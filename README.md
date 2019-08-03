# PubSub

Publish-Subscribe messaging for Web applications.

## FAQ

## Why doesn't `pubsub` use Observables, Subjects, Subscriptions, etc (e.g. RxJS)

We prefer to keep `pubsub` simple and lean, while avoiding npm dependency hell.

## Why use `pubsub` over `Redux`

Similar to `Flux`, `Redux` intertwines messaging and state management. Moreover, in the author's opinion, it's significantly more complicated and promotes the usage of functional programming patterns that are not fit (or required) in typical JavaScript front-end development.

Instead, `pubsub` offers a simple solution to a specific problem.
