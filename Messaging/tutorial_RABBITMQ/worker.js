#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error, connection) {
    connection.createChannel(function(error, channel) {
        var queue = 'task_queue';

        // 'durable: true' rende la coda immune da improvvisi crash o restart di RabbitMQ
        channel.assertQueue(queue, {
            durable: true
        });
        // .prefetch(1) assegna ad ogni consumer/worker max 1 messaggio alla volta, cosi da non sovraccaricarlo
        // fin quando il consumer/worker non l'avra processato ed avra inviato l'ACK al broker
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                // Invia ACK a al broker RabbitMQ cosi da liberare lo spazio occupato dal messaggio sulla coda
                channel.ack(msg);
            }, secs * 1000);
        }, {
            // noAck:false mantiene in coda il messaggio fin quando il consumer avra inviato l'ACK, cosi
            // da garantire l'arrivo e il consumo del messaggio.
            // Ovviamente noAck:true sara l'esatto opposto
            noAck: false
        });
    });
});
