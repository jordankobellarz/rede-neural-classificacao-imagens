/**
* ------------------------------------------------
* Helpers para transformar "coisas" em vetores
* que podem ser usados em redes neurais
* ------------------------------------------------
*/

var exports = module.exports = {};

var path = require("path"),
  jimp = require("jimp"),
  config = require("../config.js");

/**
* Transforma uma imagem em :imagePath em um vetor:
* se a imagem tiver 50 x 50, cria vetor com 50 * 50 * 3 posições.
* Retorna o vetor representando a imagem.
*/
exports.image = function (imagePath, callback) {

  var normalized = [];

  jimp.read(imagePath, function (err, image) {
    if (err) callback(err, null);

    // redimensiona e corta a imagem nas dimensões esperadas
    image.contain(config.imageSize.w, config.imageSize.h)
      .write(config.outputPath + "/" + Math.round(Math.random()*1000) + ".png");

    // percorre a imagem e adiciona ao vetor de dados de input
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {

      // normaliza o valor de cada canal, dividindo por 255 (com 3 casas após a vírgula)
      var r = Math.round((this.bitmap.data[ idx + 0 ] / 255)*1000)/1000;
      var g = Math.round((this.bitmap.data[ idx + 1 ] / 255)*1000)/1000;
      var b = Math.round((this.bitmap.data[ idx + 2 ] / 255)*1000)/1000;
      //var a = this.bitmap.data[ idx + 3 ] / 255;

      normalized.push(r);
      normalized.push(g);
      normalized.push(b);
    });

    callback(null, normalized);
  });
}
