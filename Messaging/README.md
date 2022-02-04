# Node.js code for RabbitMQ tutorials

Here you can find JavaScript (Node) code examples from [RabbitMQ
tutorials](https://www.rabbitmq.com/getstarted.html).

To successfully use the examples you will need a running RabbitMQ server.

## Run rabbitmq on docker

https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html
https://www.rabbitmq.com/getstarted.html
https://www.cloudamqp.com/blog/2018-11-02-rabbitmq-and-microservices.html
https://www.cloudamqp.com/blog/2017-01-09-apachekafka-vs-rabbitmq.html

```
docker run -d --hostname my-rabbit -p5672:5672 --name some-rabbit rabbitmq:3
```

```
sudo docker exec -i -t 665b4a1e17b6 /bin/bash
```

## Requirements

### Node.js

You need [Node.js](https://nodejs.org/en/download/) and [amqp.node](https://github.com/squaremo/amqp.node)
to run these tutorials.


### Client Library

To install `amqp.node` using npm:

    npm install amqplib -g

## Code

[Tutorial one: "Hello World!"](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html):

    node tutorial_RABBITMQ/send.js
    node tutorial_RABBITMQ/receive.js


[Tutorial two: Work Queues](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html):

    node tutorial_RABBITMQ/new_task.js "A very hard task which takes two seconds.."
    node tutorial_RABBITMQ/worker.js


[Tutorial three: Publish/Subscribe](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html)

    node tutorial_RABBITMQ/receive_logs.js
    node tutorial_RABBITMQ/emit_log.js "info: This is the log message"

[Tutorial four: Routing](https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html):

    node tutorial_RABBITMQ/receive_logs_direct.js info
    node tutorial_RABBITMQ/emit_log_direct.js info "The message"


[Tutorial five: Topics](https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html):

    node tutorial_RABBITMQ/receive_logs_topic.js "*.rabbit"
    node tutorial_RABBITMQ/emit_log_topic.js red.rabbit Hello

[Tutorial six: RPC](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html):

    node tutorial_RABBITMQ/rpc_server.js
    node tutorial_RABBITMQ/rpc_client.js 30
