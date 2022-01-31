// Axios viene usato per CREARE e INVIARE le richieste al Server
// Sul lato server il framework Express si occupa di RICEVERE e GESTIRE le richieste inviate dai client
var axios = require('axios');

// axios.get('http://localhost:'+ port + '/search')
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })

// axios.get('http://localhost:'+ port + '/orario', {
//     // .query
//     params: {
//         day: 'oggi'
//     }
// })
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })

//// Equivalente alla versione sopra

// axios.get('http://localhost:'+ port + '/orario?day=oggi', {
// })
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })

//Il secondo parametro, dopo l'URL, e' il body della richiesta POST
// axios.post('http://localhost:'+ port + '/orario', {
//     data: {
//         day: 'oggi',
//     }
// })
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })

// axios.post('http://localhost:'+ port + '/')
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })

var city = 'Milano';
axios.post('http://localhost:8888/get_temp', {
    citta: city,
})
.then((response) => {
    console.log('Valore di ' + city + ': ' + response.data);
})
.catch((error) => {
    console.log(error);
})