var config = {};

// diretórios para imagens de treinamento e teste
config.trainingPath = __dirname + "/training";
config.testingPath  = __dirname + "/testing";
config.outputPath   = __dirname + "/output";

// tamanho das images (todas as imagens devem ter esse tamanho)
config.imageSize = {"w": 20, "h": 50};

module.exports = config;
