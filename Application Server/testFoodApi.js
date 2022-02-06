var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://tasty.p.rapidapi.com/recipes/list',
//   params: {from: '0', size: '1', tags: 'under_30_minutes'},
//   headers: {
//     'x-rapidapi-host': 'tasty.p.rapidapi.com',
//     'x-rapidapi-key': '1822b88083msh2d5ffd1a1392cedp130bf5jsn8652489b4322'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data.count);
// }).catch(function (error) {
// 	console.error(error);
// });

// var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/detail',
  params: {id: '8085'},
  headers: {
    'x-rapidapi-host': 'tasty.p.rapidapi.com',
    'x-rapidapi-key': '1822b88083msh2d5ffd1a1392cedp130bf5jsn8652489b4322'
  }
};

axios.request(options).then(function (response) {
    // Ingrediente: quantita - unita di misura - nome ingrediente
    // console.log(response.data.sections[0].components[1].measurements[0].quantity)
    // console.log(response.data.sections[0].components[1].measurements[0].unit.name)
    // console.log(response.data.sections[0].components[1].ingredient.name)

    
	// inst = response.data.instructions;
    // console.log(inst.length)

    // Mostra step ricetta
    // for(var i = 0; i < inst.length; i++){
    //     var product = inst[i];
    //     console.log('Step ' + product.position + '\n    ' + product.display_text);
    // }

    console.log(response.data.sections[0].components)

}).catch(function (error) {
	console.error(error);
});