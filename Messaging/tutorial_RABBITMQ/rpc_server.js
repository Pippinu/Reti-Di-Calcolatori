#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'rpc_queue';

        channel.assertQueue(queue, {
            durable: false
        });
        // .prefetch(1) assegna ad ogni consumer/worker max 1 messaggio alla volta, cosi da non sovraccaricarlo
        // fin quando il consumer/worker non l'avra processato ed avra inviato l'ACK al broker
        channel.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        channel.consume(queue, function reply(msg) {
            var n = parseInt(msg.content.toString());

            console.log(" [.] fib(%d)", n);

            var r = fibonacci(n);

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(r.toString()), {
                    correlationId: msg.properties.correlationId
                });

            channel.ack(msg);
        });
    });
});

function fibonacci(n) {
    if (n === 0 || n === 1)
        return n;
    else
        return fibonacci(n - 1) + fibonacci(n - 2);
}
