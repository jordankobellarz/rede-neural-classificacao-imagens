# Perceptron para classificação de imagens
Rede neural (perceptron) para reconhecimento e classificação de imagens.

## Antes de tudo
Instale as dependências do projeto com o comando

```javascript
npm install
```

## Adicionando imagens para treinamento
Crie pastas com a descrição das imagens que você irá colocar dentro delas
no diretório /training. Por exemplo, você poderia criar as pastas /uva, /pera e
/ maçã. Adicione as imagens aos seus respectivos diretórios.

* training/
  * maca/
    * maca_grande.png
    * maca-pequena.jpg
    * macazinha.png
  * uva/
    * uvaRubi0.jpg
    * uva.png
  * pera/
    * pera_p.png
    * pera-m.jpg

Adicione também imagens dentro do diretório /testing/img. Nesse diretório ficarão
as imagens que você deseja classificar.

* testing/
  * img/
    * frango.png
    * pera.jpg
    * uva.png
    * uva2.png

## Normalizando as imagens de treinamento e de teste
Antes de tudo, é necessário configurar o tamanho padrão das imagens que serão
usadas para treinar a rede neural. Para isso, abra o arquivo config.js e altere
os parâmetros W (width) e H (height) em **config.imageSize**.

```javascript
config.imageSize = {"w": 20, "h": 50};
```

> Lembre-se: o vetor normalizado de uma imagem terá o tamanho W * H * 3, por isso
não exagere nesses valores, caso contrário terá a performance bastante impactada.

Abra o terminal e execute **node normalize.js**. Esse script irá criar um arquivo
JSON para as imagens de treinamento em /training/data.json e outro para as
imagens de teste em /testing/data.json.

```sh
node normalize.js
```

## Executando a rede neural
Execute  **node index.js** para treinar a rede neural e fazer a classificação
das imagens de teste.

```sh
node index.js
```
