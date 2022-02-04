#!/usr/bin/env node
var amqp = require('amqplib/callback_api');

// Connessione al message broker (RabbitMQ)
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    // Sul broker crea un canale che parla con una specifica coda
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = 'Hello World!';

        channel.assertQueue(queue, {
            durable: false
        });
        // Invio un messaggio alla coda, tale coda immagazzina tutti i messaggi da inviare alla rispettiva
        // coda lato receiver in attesa che questa venga avviata o che processi tutti i messaggi

        // Buffer.from(msg) bufferizza la string msg in un array di Byte che verra inviato al broker
        // L'opzione 'persisten' dice a RabbitMQ di salvare il messaggio su disco, cosi da non perderlo
        // in caso di restart o crash di RabbitMQ
        channel.sendToQueue(queue, Buffer.from(msg),{persistent: false});

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});

// N.B. A differenza delle implementazioni precedenti, tramite questo approccio riusciamo a inviare messaggi
// o richieste senza che dall'altra parte vi sia un server predisposto per ricevere tali richieste
// In questo caso, utilizzando il messagge broker, creo un canale ad una 'Cassetta della posta' che mi permette
// di ricevere il messaggio quando voglio, in maniera asincrona. (In questo caso eseguendo receive.js)

// Dalla documentazione di RabbitMQ, il messsaggio che inviamo alla msgQueue e' un Array di Byte, quindi sostanzialmente
// possiamo inviare qualsiasi cosa.
