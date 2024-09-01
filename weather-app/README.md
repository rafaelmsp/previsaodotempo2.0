# App de Previsão do Tempo

Este é um aplicativo de previsão do tempo construído usando React, Axios, OpenWeather API, e Leaflet.

![Visualização do App](https://github.com/rafaelmsp/previsaodotempo2.0/blob/main/weather-app/src/imagens/screenshot.jpg)

## Funcionalidades

O aplicativo oferece uma série de funcionalidades, incluindo:

- **Busca de Cidades com Sugestões Automáticas**: Você pode digitar o nome de uma cidade e receber sugestões enquanto digita.
- **Previsão do Tempo Atual**: Após selecionar uma cidade, a aplicação exibe a previsão do tempo atual, incluindo temperatura, condições climáticas (céu claro, nublado, chuvoso, etc.), umidade, velocidade do vento e pressão atmosférica.
- **Previsão Estendida**: Fornece uma visão detalhada do clima para os próximos cinco dias.
- **Localização Automática**: Permite ao usuário obter previsões climáticas baseadas na sua localização geográfica atual.
- **Mapa Interativo**: Exibe a localização da cidade selecionada.
- **Alternância de Unidades de Medida**: Os usuários podem alternar entre Celsius, Fahrenheit e Kelvin.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **React**: Biblioteca JavaScript principal para a construção da interface de usuário.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **OpenWeather API**: Fonte dos dados climáticos.
- **Leaflet**: Biblioteca para o mapa interativo.
- **React Autosuggest**: Componente para sugestões automáticas de cidades.
- **CSS Personalizado**: Utilizado para toda a estilização do aplicativo.

## Como Executar

Para executar o aplicativo em seu ambiente local, siga os passos abaixo:

1. **Clone o repositório**:
   
   git clone https://github.com/rafaelmsp/previsaodotempo2.0.git

2. **Navegue até o diretório do projeto**:

cd previsaodotempo2.0/weather-app

3. **Instale as dependências**:

npm install

4. **Configure a chave da API:**

Crie um arquivo .env na raiz do projeto.

Adicione sua chave da API do OpenWeather:

REACT_APP_OPENWEATHER_API_KEY=your_api_key_here

Abra o aplicativo

 - Acesse http://localhost:3000 no seu navegador para ver o aplicativo em execução.

## Contribuição
Contribuições para o projeto são bem-vindas. Se você deseja contribuir:

Faça um fork deste repositório.
Implemente suas melhorias.
Envie um pull request para revisão.

## Licença
Este projeto está licenciado sob a licença MIT, permitindo que você use, modifique e distribua o código conforme necessário.