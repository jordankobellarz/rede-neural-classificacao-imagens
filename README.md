# rede-neural-classificacao-imagens
Rede neural (perceptron) para reconhecimento e classificação de imagens.

## Adicionando imagens para treinamento
Crie pastas com a descrição das imagens que você irá colocar dentro delas
no diretório /training. Por exemplo, você poderia criar as pastas /uva, /pera e
/ maçã. Adicione as imagens aos seus respectivos diretórios.

Adicione também imagens dentro do diretório /testing/img. Nesse diretório ficarão
as imagens que você deseja classificar.

## Normalizando os dados de treinamento e de teste
Antes de tudo, é necessário configurar o tamanho padrão das imagens que serão
usadas para treinar a rede neural. Para isso, abra o arquivo config.js e altere
os parâmetros W (width) e H (height) em **config.imageSize**.

Abra o terminal e execute **node normalize.js**. Esse script irá criar um arquivo
JSON para as imagens de treinamento e outro para as imagens de teste.

## Executando a rede neural
Execute  **node index.js** para treinar a rede neural e fazer a classificação
das imagens de teste.
