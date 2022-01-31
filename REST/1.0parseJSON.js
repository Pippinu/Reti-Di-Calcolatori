var contents = '{"uno":"val1","due":[{"dueuno":"val2.1"},{"duedue":"val2.2"}]}';

// convert a string to a json
var jsonContent = JSON.parse(contents);

console.log(jsonContent);
console.log(jsonContent.uno);
console.log(jsonContent.due);
console.log(jsonContent.due[0]);
console.log(jsonContent.due[0].dueuno);

jsonContent.due[2]={"duetre":"val2.3"}

// convert a json to a string
console.log(JSON.stringify(jsonContent));
