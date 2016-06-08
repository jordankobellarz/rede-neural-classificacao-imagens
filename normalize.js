var path = require("path"),
  fs = require("fs"),
  jsonfile = require('jsonfile'),
  config = require("./config"),
  normalizer = require("./helpers/normalizer")
  classifier = require("./helpers/classifier");

var classes = classifier.getClasses(config.trainingPath);
var trainingSetPath = config.trainingPath + "/data.json";
var testingSetPath = config.testingPath + "/data.json";

// cria os arquivos com um array vazio
jsonfile.writeFileSync(trainingSetPath, []);
jsonfile.writeFileSync(testingSetPath, []);

// helper para adicionar :data no JSON em :path
var addToSet = function (path, data) {
  var set = JSON.parse(fs.readFileSync(path, 'utf8'));
  set.push(data);
  jsonfile.writeFileSync(path, set);
}

// limpa o diretório de output
fs.readdirSync(config.outputPath).forEach(function (image) {
  var imagePath = path.join(config.outputPath, image);
  fs.unlinkSync(imagePath);
});

// para cada classe, processa as imagens de treinamento dentro da pasta
classes.forEach(function(classe){

  fs.readdirSync(classe.path).forEach(function (image) {
    var imagePath = path.join(classe.path, image);

    // normaliza e adiciona a imagem no dataset
    normalizer.image(imagePath, function(err, normalizedImage){
      addToSet(trainingSetPath, {
        "input": normalizedImage,
        "output": classe.normalized,
        "classe": classe.name
      });
    });
  });
});

// percorre e processa todas as imagens de teste
fs.readdirSync(config.testingPath + "/img").forEach(function (image) {
  var imagePath = path.join(config.testingPath + "/img", image);

  // normaliza e adiciona a imagem no dataset
  normalizer.image(imagePath, function(err, normalizedImage){
    //addToSet(testingSetPath, normalizedImage);
    addToSet(testingSetPath, {
      "input": normalizedImage,
      "name": image
    });
  });
});
