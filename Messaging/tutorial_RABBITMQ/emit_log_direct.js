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
        var exchange = 'direct_logs';
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'Hello World!';
        // 
        var severity = (args.length > 0) ? args[0] : 'info';

        // Exchange di tipo Direct, il messaggio verra inviata ad una specifica coda
        // se Binding Key (Key che identifica l'associazione tra Exchange e Queue) e 
        // Routing Key (Key associata al messaggio che decidera su quale coda andra
        // quest'ultimo) coincidono.

        // In questo caso la Binding Key e' Severity, che per semplicita potra
        // assumere solo 3 valori, 'info', 'warning' e 'error' ma in realta puo 
        // assumere diversi valori 
        channel.assertExchange(exchange, 'direct', {
            durable: false
        });
        channel.publish(exchange, severity, Buffer.from(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
