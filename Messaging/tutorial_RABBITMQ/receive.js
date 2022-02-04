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

        var queue = 'hello';

        // Provo a creare la coda che si pone tra Sender e Receiver, tale operazione e' idempotente, se la coda non esiste vado a creala
        // altrimenti, se gia esiste, non faccio nulla.
        // Tale operazione va a rimarcare l'approccio asincrono, non aspetto che il sender crei la coda e la riempa di messaggi da processare,
        // se il receiver e' avviato prima del sender, il receiver crea la coda. Quando il sender sara' avviato effettuera' la stessa procedura
        // cioe, invoca channel.assertQueue per creare la coda, essendo quest'ultima gia stata creata dal receiver, non fa nulla e passa avanti. (Idempotenza di channel.assertQueue)
        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
