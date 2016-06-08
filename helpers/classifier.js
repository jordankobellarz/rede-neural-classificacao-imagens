/**
* ------------------------------------------------
* Helpers para extrair as classes a partir do
* nome das pastas com dados de treinamento
* ------------------------------------------------
*/

var fs = require("fs"),
  path = require("path"),
  config = require("../config");

var exports = module.exports = {};

/**
* Cria um vetor com :size posições com valor 0
* e uma posição :markedPos com valor 1
*/
function MarkedVector (size, markedPos) {
  var array = [];
  for (var i = 0; i < size; i++)
    array.push(0);
  array[markedPos] = 1;
  return array;
}

/**
* Exporta as classes de classificação a partir do nome dos diretórios
* dentro de :classesPath
*/
exports.getClasses = function (classesPath) {

  var classes = [];

  // pega o nome dos diretórios em :path
  var directories = fs.readdirSync(classesPath).filter(function(file) {
    return fs.statSync(path.join(classesPath, file)).isDirectory();
  });

  // para cada diretório, cria uma classe com um nome e um
  // vetor normalizado para representá-la
  for(i in directories) {
    var name = directories[i];
    classes.push({
      "name": name,
      "path": path.join(classesPath, name),
      "normalized": MarkedVector(directories.length, i)
    });
  }

  return classes;
}
