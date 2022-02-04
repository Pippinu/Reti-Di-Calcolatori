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
        var exchange = 'topic_logs';
        var args = process.argv.slice(2);
        var key = (args.length > 0) ? args[0] : 'anonymous.info';
        var msg = args.slice(1).join(' ') || 'Hello World!';

        // In questo caso l'Exchange opera in modalita Topic, in questo caso le Routing Key
        // non possono essere parole arbitrarie, ma una serie di parole e punti 
        // (i.e. Ford.Focus.Blu.Elettrico, Fiat.Panda.Rosso.Opaco), in questo caso i messaggi
        // verranno inviati alle code che condividono parole specifiche tra queste come Binding Key
        
        // Ad esempio sulla coda Q1 verranno mappate tutte le auto Blu, quindi *.Blu.*.
        // Sulla coda Q2 verranno mappate tutte le Ford, quindi Ford.#
        // Sulla coda Q3 verranno mappate tutte le auto opache, quindi *.*.opaco

        // * = Sostituisce una parola
        // # = Sostituisce zero o piu parole
        channel.assertExchange(exchange, 'topic', {
            durable: false
        });
        channel.publish(exchange, key, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", key, msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
