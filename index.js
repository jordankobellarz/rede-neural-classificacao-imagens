var synaptic = require("synaptic"),
	jsonfile = require("jsonfile"),
	config = require("./config"),
	classifier = require("./helpers/classifier");

var trainingSet = jsonfile.readFileSync(config.trainingPath + "/data.json") || [];
var testingSet = jsonfile.readFileSync(config.testingPath + "/data.json") || [];
var classes = classifier.getClasses(config.trainingPath);

var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

// número de neurônios na camada de input e output
var nInputs = trainingSet[0].input.length;
var nOutputs = classes.length;

var perceptron = new Architect.Perceptron(nInputs, 3, nOutputs);
var trainer = new Trainer(perceptron);

// ativa o perceptron com os dados de teste e mostra o resultado
var testar = function () {
	for (i in testingSet) {

		// ativa o perceptron com os dados
		var result = perceptron.activate(testingSet[i].input);

		// percorre os resultados e exibe em que classe se encaixa
		for (j in result) {
			if(Math.round(result[j]) == 1) {
				console.log("imagem: ", testingSet[i].name, "\t classe: " + classes[j].name + "\t resultado: " + result);
			}
		}
	}
}

console.log("\n======= CLASSES =======");
classes.forEach(function(classe){
	console.log(classe.name + ": " + classe.normalized);
});

// treina a rede com os parâmetros especificados
console.log("\n======= TREINAMENTO =======");
trainer.train(trainingSet, {
  rate: .1, // taxa de aprendizado
  iterations: 20000, // máximo de épocas
  error: .001, // erro mínimo
  shuffle: true, // os dados de trinamento são reordenados a cada iteração
  //log: 100, // mostra o log de treinamento a cada 100 épocas
  cost: Trainer.cost.CROSS_ENTROPY, // função de ativação
	schedule: {
	  every: 100, // a cada 100 iterações, executa
	  do: function (data) {
			console.log("\n---->iteração", data.iterations, "erro", data.error);
			testar();
	  }
	}
});


// ativa o perceptron com os dados de teste
console.log("\n======= RESULTADO FINAL =======");
testar();
