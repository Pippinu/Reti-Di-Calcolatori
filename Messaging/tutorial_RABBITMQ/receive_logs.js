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
        var exchange = 'logs';

        // Un Exchange e' un operatore fondamentale che si pone tra Producer, quello che vuole inviare il messaggio, e la o le queue.
        // Utilizza una Routing Key, in pratica il nome della coda, per decidere quale di queste deve ricevere il messaggio.
        // In base alla 'modalita' in cui sta operando, indicata dal secondo argomento di .assertExchange, inviera messaggi alle code
        // con specifica Routing Key direttamente ('direct'), per argomento ('topic'), cioe a code che hanno Routing Key simili, 
        // in base a specifici valori contenuti nell'header del messaggio ('headers') oppure in broadcast ('fanout')

        // Crea un exchange non durable in modalita fanout, cioe inviera indistintamente i messaggi che gli arrivano a
        // tutte le code
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        // Viene creata una temporary queue, notare che il nome della coda e' una stringa vuota, questo porta il sistema
        // a creare una coda non durable con un nome generato dal sistema
        // Facciamo cio perche in questo caso, essendo l'exchange in modalita fanout, il messaggio verra inviato 
        // a tutti i worker, non abbiamo quindi bisogno di code specifiche
        channel.assertQueue('', {
            exclusive: true
        }, function(error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, function(msg) {
                if (msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                }
            }, {
                noAck: true
            });
        });
    });
});
